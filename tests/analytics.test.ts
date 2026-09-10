import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import test from 'node:test';
import {
  consumeLimit,
  createAnalyticsStore,
  csvCell,
  isAutomatedRequest,
  outboundEvent,
  parseDateRange,
  parseEvent,
  readLimitedBody,
  readPostPathRegistry,
  sameOrigin,
  toCsv,
  validPublicPath,
} from '../lib/analytics-server';
import type { AnalyticsEvent } from '../lib/types';

function event(overrides: Partial<AnalyticsEvent> = {}): AnalyticsEvent {
  return {
    eventId: randomUUID(),
    sessionId: randomUUID(),
    type: 'helper_start',
    path: '/',
    ...overrides,
  };
}
const range = parseDateRange(new URLSearchParams({ from: '2026-09-01', to: '2026-09-05' }))!;

test('strict event schema excludes personal data, arbitrary paths and invented conversions', () => {
  const good = event({
    path: '/guides/installation/measurement-basics',
    category: 'installation',
    cta: 'guide-top',
    source: 'naver',
  });
  assert.deepEqual(parseEvent(good), good);
  for (const bad of [
    { ...good, width: 380 },
    { ...good, name: 'Kim' },
    { ...good, path: '/?phone=01012345678' },
    { ...good, source: 'person@example.com' },
    { ...good, type: 'affiliate_outbound' },
    { ...good, type: 'application_complete' },
    { ...good, cta: '01012345678' },
    { ...good, sessionId: 'x' },
  ])
    assert.equal(parseEvent(bad), null);
  assert.equal(validPublicPath('/guides/bedroom/quote-comparison'), false);
  assert.equal(validPublicPath('/admin'), false);
});

test('new Markdown posts enter the route registry from their trusted category without hardcoded analytics edits', () => {
  const directory = mkdtempSync(join(tmpdir(), 'masters-registry-test-'));
  try {
    writeFileSync(join(directory, 'new-guide.md'), '---\ncategory: bedroom\n---\n# New content');
    writeFileSync(join(directory, 'bad-category.md'), '---\ncategory: admin\n---\n# Ignored');
    writeFileSync(
      join(directory, 'private file.md'),
      '---\ncategory: bedroom\n---\n# Ignored filename',
    );
    assert.deepEqual([...readPostPathRegistry(directory)], ['/guides/bedroom/new-guide']);
    assert.ok(readPostPathRegistry().has('/guides/installation/measurement-basics'));
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('SQLite deduplicates retries and funnel requires chronological events in the same session', () => {
  const store = createAnalyticsStore(':memory:');
  try {
    const first = event({ source: 'naver' });
    assert.equal(store.record(first, '2026-09-02T00:00:00.000Z'), true);
    assert.equal(store.record(first, '2026-09-02T00:00:01.000Z'), false);
    store.record(
      event({ sessionId: first.sessionId, type: 'helper_complete' }),
      '2026-09-02T00:00:02.000Z',
    );
    store.record(
      event({ sessionId: first.sessionId, type: 'affiliate_outbound' }),
      '2026-09-02T00:00:03.000Z',
    );
    store.record(event({ type: 'helper_complete' }), '2026-09-02T00:00:04.000Z');
    const reversed = randomUUID();
    store.record(
      event({ sessionId: reversed, type: 'helper_complete' }),
      '2026-09-02T00:00:00.000Z',
    );
    store.record(event({ sessionId: reversed }), '2026-09-02T00:00:01.000Z');
    const report = store.report(range);
    assert.equal(report.startedSessions, 2);
    assert.equal(report.completedStartedSessions, 1);
    assert.equal(report.outboundCompletedSessions, 1);
    assert.equal(report.bySource.find((row) => row.label === 'naver')?.outbound, 1);
    assert.equal(report.counts.find((row) => row.type === 'helper_start')?.events, 2);
    const rows = store.exportRows(range);
    assert.equal(JSON.stringify(rows).includes(first.sessionId), false);
    assert.equal(store.prune('2026-09-03T00:00:00.000Z'), 6);
    assert.equal(store.report(range).counts.length, 0);
  } finally {
    store.close();
  }
});

test('redirect parameters accept supported aliases, discard text and preserve explicit click id', () => {
  const clickid = randomUUID(),
    sessionId = randomUUID();
  const result = outboundEvent(
    new URLSearchParams({
      clickid,
      sessionId,
      from: '/guides/interior/fabric-layers',
      placement: 'post-cta',
      category: 'interior',
      url: 'https://evil.invalid',
    }),
  );
  assert.equal(result.eventId, clickid);
  assert.equal(result.sessionId, sessionId);
  assert.equal(result.path, '/guides/interior/fabric-layers');
  assert.equal(result.cta, 'post-cta');
  assert.equal('url' in result, false);
  const invalid = outboundEvent(
    new URLSearchParams({ path: '//evil.invalid', category: 'phone', cta: 'private text' }),
  );
  assert.equal(invalid.path, '/');
  assert.equal(invalid.cta, 'direct');
  assert.equal(invalid.category, undefined);
});

test('verified guide paths determine category for shared header/footer and override mismatched labels', () => {
  for (const path of ['/guides/bedroom', '/guides/bedroom/bedroom-blackout']) {
    const header = outboundEvent(new URLSearchParams({ path, cta: 'home-header' }));
    assert.equal(header.category, 'bedroom');
    const footer = outboundEvent(
      new URLSearchParams({ path, cta: 'footer', category: 'interior' }),
    );
    assert.equal(footer.category, 'bedroom');
    assert.equal(parseEvent(event({ path }))?.category, 'bedroom');
    assert.equal(parseEvent(event({ path, category: 'interior' }))?.category, 'bedroom');
  }
  assert.equal(
    outboundEvent(new URLSearchParams({ path: '/guides/bedroom/unpublished' })).category,
    undefined,
  );
  assert.equal(
    outboundEvent(new URLSearchParams({ path: '/', cta: 'home-header' })).category,
    undefined,
  );
  assert.equal(parseEvent(event({ path: '/guides' }))?.category, undefined);
});

test('prefetch, bots and HEAD-style requests can be filtered independently from real visits', () => {
  assert.equal(isAutomatedRequest(new Headers({ 'sec-purpose': 'prefetch;prerender' })), true);
  assert.equal(isAutomatedRequest(new Headers({ 'next-router-prefetch': '1' })), true);
  assert.equal(isAutomatedRequest(new Headers({ 'user-agent': 'Googlebot' })), true);
  assert.equal(
    isAutomatedRequest(new Headers({ 'user-agent': 'Mozilla/5.0 Chrome/128 Safari/537.36' })),
    false,
  );
});

test('date range rejects impossible dates, inversions and more than 90 inclusive days', () => {
  for (const params of [
    { from: '2026-02-30', to: '2026-03-01' },
    { from: '2026-09-06', to: '2026-09-05' },
    { from: '2026-01-01', to: '2026-04-01' },
    { from: 'bad', to: '2026-09-05' },
  ])
    assert.equal(parseDateRange(new URLSearchParams(params)), null);
  assert.ok(parseDateRange(new URLSearchParams({ from: '2026-01-01', to: '2026-03-31' })));
});

test('CSV neutralizes spreadsheet formula injection and escapes quotes and newlines', () => {
  assert.equal(csvCell('=HYPERLINK("x")'), '"\'=HYPERLINK(""x"")"');
  assert.equal(csvCell(' @SUM(A1)'), '"\' @SUM(A1)"');
  assert.equal(csvCell('two\nlines'), '"two\nlines"');
  assert.ok(toCsv([]).startsWith('\ufeff"received_at"'));
});

test('same-origin and bounded streaming body reject foreign origins and oversized content', async () => {
  const original = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = 'https://masters.example';
  try {
    assert.equal(
      sameOrigin(
        new Request('https://masters.example/api/events', {
          headers: { origin: 'https://masters.example' },
        }),
      ),
      true,
    );
    assert.equal(
      sameOrigin(
        new Request('https://masters.example/api/events', {
          headers: { origin: 'https://evil.invalid' },
        }),
      ),
      false,
    );
    assert.equal(sameOrigin(new Request('https://masters.example/api/events')), false);
    await assert.rejects(
      readLimitedBody(
        new Request('https://masters.example', { method: 'POST', body: 'x'.repeat(2049) }),
      ),
      RangeError,
    );
    assert.equal(
      await readLimitedBody(
        new Request('https://masters.example', { method: 'POST', body: '안녕' }),
      ),
      '안녕',
    );
  } finally {
    if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = original;
  }
});

test('fixed-window limits expire without accepting unlimited events', () => {
  const key = randomUUID();
  assert.equal(consumeLimit(key, 2, 100, 1000), true);
  assert.equal(consumeLimit(key, 2, 100, 1000), true);
  assert.equal(consumeLimit(key, 2, 100, 1001), false);
  assert.equal(consumeLimit(key, 2, 100, 1101), true);
});

test('outbound route continues to the exact affiliate URL on database failure without permitting open redirects', async () => {
  const original = process.env.DATABASE_PATH;
  process.env.DATABASE_PATH = '/dev/null/cannot-write/analytics.sqlite';
  try {
    const { GET, HEAD } = await import('../app/go/quote/route');
    const response = await GET(
      new Request('http://localhost:3000/go/quote?url=https://evil.invalid'),
    );
    assert.equal(response.status, 302);
    assert.equal(
      response.headers.get('location'),
      'http://tnr.kr/ma/link.php?lncd=S00281518OC06031025V',
    );
    assert.match(response.headers.get('cache-control') || '', /no-store/);
    const headResponse = await HEAD();
    assert.equal(headResponse.status, 302);
    assert.equal(headResponse.headers.get('location'), response.headers.get('location'));
  } finally {
    if (original === undefined) delete process.env.DATABASE_PATH;
    else process.env.DATABASE_PATH = original;
  }
});

test('event endpoint validates origin, capped payload, duplicate delivery and server-only conversions', async () => {
  const originalPath = process.env.DATABASE_PATH,
    originalUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const directory = mkdtempSync(join(tmpdir(), 'masters-analytics-test-'));
  process.env.DATABASE_PATH = join(directory, 'analytics.sqlite');
  process.env.NEXT_PUBLIC_SITE_URL = 'http://localhost:3000';
  try {
    const { POST } = await import('../app/api/events/route');
    const payload = event();
    const request = (body: unknown, origin = 'http://localhost:3000') =>
      new Request('http://localhost:3000/api/events', {
        method: 'POST',
        headers: { origin, 'content-type': 'application/json' },
        body: JSON.stringify(body),
      });
    assert.equal((await POST(request(payload, 'https://evil.invalid'))).status, 403);
    const first = await POST(request(payload));
    assert.equal(first.status, 200);
    assert.deepEqual(await first.json(), { accepted: true, duplicate: false });
    const retry = await POST(request(payload));
    assert.deepEqual(await retry.json(), { accepted: true, duplicate: true });
    assert.equal((await POST(request({ ...payload, type: 'affiliate_outbound' }))).status, 400);
    assert.equal((await POST(request({ ...payload, size: 'x'.repeat(3000) }))).status, 413);
    const { GET } = await import('../app/go/quote/route');
    const clickid = randomUUID();
    const target = `http://localhost:3000/go/quote?clickid=${clickid}&sessionId=${payload.sessionId}&placement=home-result`;
    assert.equal((await GET(new Request(target))).status, 302);
    assert.equal((await GET(new Request(target))).status, 302);
    await GET(new Request('http://localhost:3000/go/quote', { headers: { purpose: 'prefetch' } }));
    const { getAnalyticsStore } = await import('../lib/analytics-server');
    const today = parseDateRange(new URLSearchParams())!;
    assert.equal(
      getAnalyticsStore()
        .report(today)
        .counts.find((row) => row.type === 'affiliate_outbound')?.events,
      1,
    );
  } finally {
    if (originalPath === undefined) delete process.env.DATABASE_PATH;
    else process.env.DATABASE_PATH = originalPath;
    if (originalUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = originalUrl;
    rmSync(directory, { recursive: true, force: true });
  }
});
