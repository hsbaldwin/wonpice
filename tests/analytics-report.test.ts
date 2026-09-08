import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { PGlite } from '@electric-sql/pglite';
import {
  createAnalyticsStore,
  kstDay,
  parseDateRange,
  parseEvent,
  outboundEvent,
} from '../lib/analytics-server';
import {
  createRuntimeStore,
  parseResult,
  percent,
  resultSummary,
  type SqlQuery,
} from '../lib/analytics-store';
import { POSTGRES_SCHEMA } from '../lib/analytics-schema';
import { sharedTrackingUrl, siteTrackingConfig, trackingUrl } from '../lib/tracking';
import type { AnalyticsEvent } from '../lib/types';
const range = parseDateRange(new URLSearchParams({ from: '2026-09-02', to: '2026-09-02' }))!;
function event(
  type: AnalyticsEvent['type'],
  sessionId: string,
  extra: Partial<AnalyticsEvent> = {},
): AnalyticsEvent {
  return { eventId: randomUUID(), sessionId, type, path: '/', ...extra };
}
for (const dialect of ['sqlite', 'postgres'] as const)
  test(`${dialect}: durable aggregation, KST boundaries, duplicates, landing attribution and manual upsert`, async () => {
    const local = dialect === 'sqlite' ? createAnalyticsStore(':memory:') : undefined;
    const pg = dialect === 'postgres' ? new PGlite() : undefined;
    if (pg) for (const statement of POSTGRES_SCHEMA) await pg.query(statement);
    const query: SqlQuery = pg
      ? async (sql, values) => (await pg.query<Record<string, unknown>>(sql, values)).rows
      : async (sql, values) => local!.query(sql, values);
    const store = createRuntimeStore(query, dialect);
    try {
      const empty = await store.report(range);
      assert.equal(empty.visits, 0);
      assert.equal(percent(empty.clickedSessions, empty.visits), '—');
      assert.equal(empty.daily.length, 1);
      const a = randomUUID(),
        b = randomUUID(),
        orphan = randomUUID(),
        reversed = randomUUID();
      // A started on the previous Korean day, then returns during this period.
      await store.record(
        event('page_view', a, { path: '/guides/bedroom', source: 'naver' }),
        '2026-09-01T14:59:59.999Z',
      );
      const view = event('page_view', a, {
        path: '/',
        landingPath: '/guides/bedroom',
        source: 'naver',
      });
      assert.equal(await store.record(view, range.start), true);
      assert.equal(await store.record(view, range.start), false);
      await store.record(
        event('page_view', a, { path: '/guides/companies' }),
        '2026-09-01T16:00:00.000Z',
      );
      await store.record(event('helper_start', a), '2026-09-01T16:01:00.000Z');
      await store.record(event('helper_complete', a), '2026-09-01T16:02:00.000Z');
      const click = event('affiliate_outbound', a, { path: '/guides/companies' });
      await store.record(click, '2026-09-01T16:03:00.000Z');
      await store.record(click, '2026-09-01T16:03:01.000Z');
      await store.record(event('affiliate_outbound', a), '2026-09-01T16:04:00.000Z');
      // Legacy events lack landingPath, but their first page is still inferred.
      await store.record(
        event('page_view', b, { path: '/guides/installation', source: 'google' }),
        '2026-09-02T14:59:59.999Z',
      );
      await store.record(event('affiliate_outbound', orphan), '2026-09-02T10:00:00.000Z');
      await store.record(event('helper_complete', reversed), '2026-09-02T10:00:00.000Z');
      await store.record(event('helper_start', reversed), '2026-09-02T10:01:00.000Z');
      // End is exclusive; the next day's view and click do not enter this report.
      await store.record(event('page_view', randomUUID()), range.end);
      await store.record(event('affiliate_outbound', b), range.end);
      const report = await store.report(range);
      assert.equal(report.visits, 2);
      assert.equal(report.views, 3);
      assert.equal(report.clicks, 3);
      assert.equal(report.clickedSessions, 1);
      assert.equal(percent(report.clickedSessions, report.visits), '50.0%');
      assert.equal(report.starts, 2);
      assert.equal(report.completed, 1);
      assert.deepEqual(report.landingPages.map((row) => row.label).sort(), [
        '/guides/bedroom',
        '/guides/installation',
      ]);
      assert.equal(report.sources.find((row) => row.label === 'naver')?.clicks, 2);
      assert.equal(report.daily[0].label, '2026-09-02');
      assert.equal(report.daily[0].clicks, 3);
      const exported = await store.exportRows(range);
      assert.ok(exported.every((row) => row.received_at === '2026-09-02'));
      assert.ok(!JSON.stringify(exported).includes(a));
      const now = new Date('2026-09-03T02:00:00Z');
      await store.saveResult(
        { date: '2026-09-02', scope: 'shared', applications: 4, approvals: 6 },
        now,
      );
      await store.saveResult(
        { date: '2026-09-02', scope: 'shared', applications: 0, approvals: 1 },
        now,
      );
      const rows = await store.results(range);
      assert.equal(rows.length, 1);
      assert.equal(rows[0].applications, 0);
      assert.equal(rows[0].approvals, 1);
      const summary = resultSummary(rows, 'shared', range, 2, '2026-09-03');
      assert.equal(summary.complete, true);
      assert.equal(summary.conversionRate, null);
      const reopened = createRuntimeStore(query, dialect);
      assert.equal((await reopened.report(range)).views, 3);
      assert.equal((await reopened.results(range))[0].approvals, 1);
    } finally {
      local?.close();
      await pg?.close();
    }
  });

test('KST periods use inclusive calendar days and exclusive UTC instants', () => {
  const now = new Date('2026-09-01T15:00:00Z');
  assert.equal(kstDay(now), '2026-09-02');
  const today = parseDateRange(new URLSearchParams({ period: 'today' }), now)!;
  assert.equal(today.from, '2026-09-02');
  assert.equal(today.start, '2026-09-01T15:00:00.000Z');
  assert.equal(today.end, '2026-09-02T15:00:00.000Z');
  for (const days of [7, 28, 90]) {
    const value = parseDateRange(new URLSearchParams({ period: String(days) }), now)!;
    assert.equal(Date.parse(value.end) - Date.parse(value.start), days * 86400_000);
  }
  assert.equal(parseDateRange(new URLSearchParams({ period: '100' })), null);
});

test('landing paths accept previous events but never personal text or unknown routes', () => {
  const base = event('page_view', randomUUID());
  assert.ok(parseEvent(base));
  assert.ok(parseEvent({ ...base, landingPath: '/guides/companies/curtain-cost-factors' }));
  for (const value of ['/admin', '/?name=Kim', 'https://evil.invalid', '/unknown'])
    assert.equal(parseEvent({ ...base, landingPath: value }), null);
  assert.equal(
    outboundEvent(new URLSearchParams({ landingPath: '/guides' })).landingPath,
    '/guides',
  );
  assert.equal(
    outboundEvent(new URLSearchParams({ landingPath: '/admin' })).landingPath,
    undefined,
  );
});

test('site-specific conversion is gated by official tracking, date, full input coverage and known visits', () => {
  const keys = ['SITE_TRACKING_URL', 'SITE_TRACKING_FROM', 'SITE_TRACKING_CONFIRMED'] as const;
  const old = keys.map((key) => process.env[key]);
  try {
    keys.forEach((key) => delete process.env[key]);
    const result = { date: '2026-09-02', scope: 'site', applications: 2, approvals: 1 };
    const now = new Date('2026-09-03T00:00:00Z');
    assert.equal(parseResult(result, now), null);
    assert.equal(trackingUrl(now), sharedTrackingUrl);
    process.env.SITE_TRACKING_URL = 'https://dbdbdeep.com/ma/link.php?lncd=TESTSITEONLY';
    process.env.SITE_TRACKING_FROM = '2026-09-02';
    process.env.SITE_TRACKING_CONFIRMED = 'true';
    assert.ok(siteTrackingConfig());
    assert.ok(parseResult(result, now));
    assert.equal(trackingUrl(new Date('2026-09-01T14:59:59Z')), sharedTrackingUrl);
    assert.equal(trackingUrl(new Date('2026-09-01T15:00:00Z')), process.env.SITE_TRACKING_URL);
    assert.equal(parseResult({ ...result, date: '2026-09-01' }, now), null);
    const rows = [{ ...result, scope: 'site' as const, updatedAt: now.toISOString() }];
    assert.equal(resultSummary(rows, 'site', range, 10, '2026-09-03').conversionRate, '20.0%');
    assert.equal(resultSummary(rows, 'shared', range, 10, '2026-09-03').conversionRate, null);
    assert.equal(resultSummary(rows, 'site', range, undefined, '2026-09-03').conversionRate, null);
    assert.equal(resultSummary(rows, 'site', range, 10, '2026-09-02').conversionRate, null);
    assert.equal(resultSummary([], 'site', range, 10, '2026-09-03').conversionRate, null);
    process.env.SITE_TRACKING_URL = sharedTrackingUrl;
    assert.equal(siteTrackingConfig(), null);
    for (const input of [
      { ...result, scope: 'shared', phone: '010' },
      { ...result, scope: 'shared', applications: -1 },
      { ...result, scope: 'shared', approvals: 1.5 },
      { ...result, scope: 'shared', date: '2026-02-30' },
      { ...result, scope: 'shared', date: '2099-01-01' },
    ])
      assert.equal(parseResult(input, now), null);
  } finally {
    keys.forEach((key, i) => {
      if (old[i] === undefined) delete process.env[key];
      else process.env[key] = old[i];
    });
  }
});

test('storage failures propagate instead of producing empty or zero reports', async () => {
  const store = createRuntimeStore(async () => {
    throw new Error('offline');
  }, 'postgres');
  await assert.rejects(store.report(range), /offline/);
  await assert.rejects(store.results(range), /offline/);
  await assert.rejects(store.record(event('page_view', randomUUID())), /offline/);
});
