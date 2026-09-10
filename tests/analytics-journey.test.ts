import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import { createAnalyticsStore, parseDateRange, parseEvent } from '../lib/analytics-server';
import { createRuntimeStore, type SqlQuery } from '../lib/analytics-store';
import { POSTGRES_SCHEMA } from '../lib/analytics-schema';
import { engagementMeter, observePageEngagement } from '../lib/analytics-engagement';
import { flushEvents } from '../lib/analytics-client';
import type { AnalyticsEvent, EventName } from '../lib/types';

test('reading thresholds are bounded, repeat safe, and do not count short pages as scrolled', () => {
  const sent: EventName[] = [];
  const meter = engagementMeter((type) => sent.push(type));
  meter.active(29_999);
  assert.deepEqual(sent, []);
  meter.active(1);
  meter.active(30_000);
  meter.active(90_000);
  meter.active(NaN);
  meter.active(-100_000);
  assert.deepEqual(sent, ['page_active_30s', 'page_active_60s']);
  meter.scroll(0, 0);
  meter.scroll(20, -10);
  assert.equal(sent.length, 2);
  meter.scroll(24, 100);
  assert.equal(sent.length, 2);
  meter.scroll(50, 100);
  meter.scroll(100, 100);
  meter.scroll(0, 100);
  meter.scroll(100, 100);
  assert.deepEqual(sent.slice(2), [
    'page_scroll_25',
    'page_scroll_50',
    'page_scroll_75',
    'page_scroll_90',
  ]);
});

test('page observation pauses hidden and unfocused tabs, cleans listeners and keeps the original route', async (t) => {
  let now = 0;
  let focused = true;
  let timer: (() => void) | undefined;
  const doc = Object.assign(new EventTarget(), {
    visibilityState: 'visible',
    referrer: '',
    hasFocus: () => focused,
    documentElement: { scrollHeight: 2000 },
  });
  const win = Object.assign(new EventTarget(), {
    scrollY: 0,
    innerHeight: 1000,
    setInterval: (fn: () => void) => {
      timer = fn;
      return 1;
    },
    clearInterval: () => {
      timer = undefined;
    },
  });
  const storage = new Map<string, string>();
  const sent: AnalyticsEvent[] = [];
  const mocks = {
    window: win,
    document: doc,
    performance: { now: () => now },
    location: { pathname: '/guides', hostname: 'curtain.example' },
    sessionStorage: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
    },
    fetch: async (_url: string, options: RequestInit) => {
      sent.push(JSON.parse(options.body as string));
      return Response.json({ accepted: true });
    },
  };
  for (const [key, value] of Object.entries(mocks)) {
    const original = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, value });
    t.after(() =>
      original
        ? Object.defineProperty(globalThis, key, original)
        : Reflect.deleteProperty(globalThis, key),
    );
  }
  const advance = (seconds: number) => {
    for (let i = 0; i < seconds; i++) {
      now += 1000;
      timer?.();
    }
  };
  const drain = async () => {
    await flushEvents();
    await new Promise((resolve) => setImmediate(resolve));
  };
  assert.equal(observePageEngagement('/admin'), undefined);
  assert.equal(timer, undefined);
  const stop = observePageEngagement('/guides')!;
  advance(20);
  doc.visibilityState = 'hidden';
  doc.dispatchEvent(new Event('visibilitychange'));
  advance(120);
  doc.visibilityState = 'visible';
  focused = false;
  doc.dispatchEvent(new Event('visibilitychange'));
  advance(120);
  await drain();
  assert.deepEqual(
    sent.map((e) => e.type),
    ['page_engagement_start'],
  );
  focused = true;
  win.dispatchEvent(new Event('focus'));
  advance(10);
  win.scrollY = 500;
  win.dispatchEvent(new Event('scroll'));
  await drain();
  assert.ok(sent.some((e) => e.type === 'page_active_30s'));
  win.dispatchEvent(new Event('pagehide'));
  advance(120);
  win.dispatchEvent(new Event('pageshow'));
  advance(30);
  // The framework can change location before the previous route's cleanup runs.
  mocks.location.pathname = '/about';
  stop();
  await drain();
  assert.equal(sent.filter((e) => e.type === 'page_active_60s').length, 1);
  assert.ok(sent.every((e) => e.path === '/guides'));
  assert.equal(timer, undefined);
  const count = sent.length;
  win.scrollY = 1000;
  win.dispatchEvent(new Event('scroll'));
  advance(120);
  await drain();
  assert.equal(sent.length, count);
});

for (const dialect of ['sqlite', 'postgres'] as const) {
  test(`${dialect}: journey excludes historical denominators, enforces step order and deduplicates impressions`, async () => {
    const sqlite = dialect === 'sqlite' ? createAnalyticsStore(':memory:') : undefined;
    const pg = dialect === 'postgres' ? new PGlite() : undefined;
    if (pg) for (const sql of POSTGRES_SCHEMA) await pg.query(sql);
    const query: SqlQuery = pg
      ? async (sql, values) => (await pg.query<Record<string, unknown>>(sql, values)).rows
      : async (sql, values) => sqlite!.query(sql, values);
    const store = createRuntimeStore(query, dialect);
    const range = parseDateRange(new URLSearchParams({ from: '2026-09-09', to: '2026-09-09' }))!;
    let clock = Date.parse(range.start);
    const record = async (
      sessionId: string,
      type: EventName,
      extra: Partial<AnalyticsEvent> = {},
    ) => {
      const payload = { eventId: randomUUID(), sessionId, type, path: '/', ...extra };
      await store.record(payload, new Date((clock += 1000)).toISOString());
      return payload;
    };
    try {
      const empty = (await store.report(range)).journey;
      assert.equal(empty.firstMeasuredAt, null);
      assert.deepEqual(empty.funnel, [0, 0, 0, 0]);
      const a = randomUUID(),
        old = randomUUID(),
        reversed = randomUUID(),
        resume = randomUUID(),
        noView = randomUUID();
      await record(old, 'page_view'); // Old format cannot inflate engagement denominator.
      await record(a, 'page_view');
      await record(a, 'page_engagement_start');
      await record(a, 'page_active_30s');
      await record(a, 'page_scroll_90');
      await record(a, 'page_view'); // Reload and repeated milestones are one measured session.
      await record(a, 'page_engagement_start');
      await record(a, 'page_active_30s');
      await record(a, 'helper_step_size');
      await record(a, 'helper_step_needs');
      await record(a, 'helper_step_result');
      const shown = await record(a, 'quote_cta_view', { cta: 'home-result' });
      assert.equal(await store.record(shown, new Date(clock).toISOString()), false);
      await record(a, 'quote_cta_view', { cta: 'home-result' });
      await record(a, 'affiliate_outbound', { cta: 'home-result' });
      await record(a, 'affiliate_outbound', { cta: 'home-result' });
      await record(a, 'quote_save');
      await record(a, 'consultation_copy', { cta: 'home-result-copy' });
      await record(a, 'page_view', { path: '/guides' });
      await record(a, 'page_view', { path: '/guides/companies' });
      await record(reversed, 'helper_step_needs');
      await record(reversed, 'helper_step_size');
      await record(reversed, 'helper_step_result'); // Never reached needs AFTER size.
      await record(resume, 'quote_restore');
      await record(resume, 'helper_step_result'); // Restored result is not a new completed funnel.
      await record(resume, 'affiliate_outbound', { cta: 'home-result' });
      await record(noView, 'affiliate_outbound', { cta: 'home-result' });
      await record(noView, 'quote_cta_view', { cta: 'home-result' }); // Later exposure cannot explain the earlier click.
      await store.record(
        {
          eventId: randomUUID(),
          sessionId: randomUUID(),
          path: '/',
          type: 'page_engagement_start',
        },
        range.end,
      );
      const report = (await store.report(range)).journey;
      assert.ok(report.firstMeasuredAt);
      const home = report.pages.find((row) => row.path === '/')!;
      assert.equal(home.visits, 2);
      assert.equal(home.views, 3);
      assert.equal(home.measured, 1);
      assert.equal(home.active30, 1);
      assert.equal(home.active60, 0);
      assert.equal(home.scroll90, 1);
      assert.deepEqual(report.funnel, [2, 1, 1, 1]);
      const button = report.ctas.find((row) => row.cta === 'home-result')!;
      assert.deepEqual(button, {
        path: '/',
        cta: 'home-result',
        shown: 2,
        clicks: 4,
        clicked: 3,
        clickedShown: 1,
      });
      assert.equal(report.actions.find((row) => row.type === 'quote_save')?.sessions, 1);
      assert.equal(report.actions.find((row) => row.type === 'consultation_copy')?.sessions, 1);
      assert.equal(report.transitions.length, 2);
      assert.ok(report.transitions.some((row) => row.from === '/' && row.to === '/guides'));
      assert.ok(!JSON.stringify(report).includes(a), 'No session identifier exposed in reports');
      const csv = await store.exportRows(range);
      assert.ok(csv.some((row) => row.type === 'page_scroll_90'));
      assert.ok(!JSON.stringify(csv).includes(a));
    } finally {
      sqlite?.close();
      await pg?.close();
    }
  });
}

test('new events retain strict input privacy and outbound validation', () => {
  const value = {
    eventId: randomUUID(),
    sessionId: randomUUID(),
    type: 'helper_size_error',
    path: '/',
  };
  assert.ok(parseEvent(value));
  for (const data of [
    { width: 230 },
    { error: 'personal text' },
    { email: 'private' },
    { utm_source: 'private' },
  ])
    assert.equal(parseEvent({ ...value, ...data }), null);
  assert.equal(parseEvent({ ...value, type: 'arbitrary_input_value' }), null);
  assert.equal(parseEvent({ ...value, path: '/admin' }), null);
  assert.equal(parseEvent({ ...value, type: 'affiliate_outbound' }), null);
  for (const cta of ['home-result-copy', 'post-copy']) {
    const copy = { ...value, type: 'consultation_copy', cta };
    assert.ok(parseEvent(copy));
    for (const field of ['text', 'copiedText', 'width', 'phone', 'error'])
      assert.equal(parseEvent({ ...copy, [field]: 'private content' }), null);
  }
});
