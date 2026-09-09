import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { adminSelection, adminHref, comparisonReason } from '../lib/admin-period';
import { countChange, rateChange, ratioLabel } from '../lib/admin-format';
import { loadAdminData } from '../lib/admin-data';
import { readableCsv } from '../lib/admin-csv';
import { createAnalyticsStore } from '../lib/analytics-server';
import { createRuntimeStore } from '../lib/analytics-store';

const now = new Date('2026-09-10T04:23:45.000Z'); // 13:23:45 KST
const DAY = 86400_000;

test('today defaults to KST and compares yesterday only until the same instant of day', () => {
  const s = adminSelection({}, now);
  assert.equal(s.period, 'today');
  assert.equal(s.view, 'summary');
  assert.equal(s.range.start, '2026-09-09T15:00:00.000Z');
  assert.equal(s.range.end, now.toISOString());
  assert.equal(s.previous.start, '2026-09-08T15:00:00.000Z');
  assert.equal(s.previous.end, '2026-09-09T04:23:45.000Z');
  assert.equal(s.trend.from, '2026-09-04');
  assert.equal(s.trend.end, s.range.end);
  assert.equal(adminSelection({ period: '' }, now).period, 'today');
  const midnight = adminSelection({}, new Date('2026-09-09T15:00:00.000Z'));
  assert.equal(midnight.range.start, midnight.range.end);
  assert.equal(midnight.previous.start, midnight.previous.end);
  assert.match(comparisonReason(midnight, '2026-09-01T00:00:00.000Z')!, /시각/);
  assert.equal(adminSelection({}, new Date('2026-09-09T14:59:59.999Z')).range.to, '2026-09-09');
});

test('7/28/90 day and custom comparisons have equal elapsed lengths; links preserve dates and view', () => {
  for (const period of ['7', '28', '90']) {
    const s = adminSelection({ period, view: 'content' }, now);
    assert.equal(Date.parse(s.range.start) - Date.parse(s.previous.start), Number(period) * DAY);
    assert.equal(Date.parse(s.range.end) - Date.parse(s.previous.end), Number(period) * DAY);
    assert.equal(s.range.to, '2026-09-10');
    assert.equal(adminHref(s, 'journey', 'funnel'), `/admin?view=journey&period=${period}#funnel`);
  }
  const closed = adminSelection({ from: '2026-09-01', to: '2026-09-03' }, now);
  assert.equal(closed.range.end, '2026-09-03T15:00:00.000Z');
  assert.equal(closed.previous.from, '2026-08-29');
  assert.equal(closed.previous.to, '2026-08-31');
  assert.equal(closed.previous.end, '2026-08-31T15:00:00.000Z');
  assert.equal(adminHref(closed, 'results'), '/admin?view=results&from=2026-09-01&to=2026-09-03');
  const current = adminSelection({ from: '2026-09-08', to: '2026-09-10' }, now);
  assert.equal(current.previous.end, '2026-09-07T04:23:45.000Z');
  assert.equal(comparisonReason(current, current.previous.start), null);
  assert.match(comparisonReason(current, '2026-09-07T00:00:00.000Z')!, /충분하지/);
  assert.match(comparisonReason(current, null)!, /충분하지/);
  const old = adminSelection({ from: '2026-01-01', to: '2026-01-03' }, now);
  assert.match(comparisonReason(old, '2025-12-01T00:00:00.000Z')!, /보관 범위/);
  for (const params of [
    { period: 'bogus' },
    { from: '2026-09-11', to: '2026-09-11' },
    { from: '2026-02-30', to: '2026-03-01' },
    { from: '2026-01-01', to: '2026-09-10' },
  ]) {
    const s = adminSelection(params, now);
    assert.equal(s.invalid, true);
    assert.equal(s.period, 'today');
  }
  assert.equal(adminSelection({ view: 'unknown' }, now).view, 'summary');
});

test('count and rate comparisons never inflate zero denominators and distinguish percentage points', () => {
  assert.equal(countChange(15, 10), '+5회 (+50.0%)');
  assert.equal(countChange(5, 10), '-5회 (-50.0%)');
  assert.equal(countChange(4, 0), '+4회 · 이전 기간 0회');
  assert.equal(countChange(0, 0), '0회 · 이전 기간 0회');
  assert.equal(rateChange(2, 10, 1, 10), '+10.0%p');
  assert.equal(rateChange(0, 10, 1, 10), '-10.0%p');
  assert.equal(rateChange(0, 0, 1, 10), '현재 기간 분모 없음');
  assert.equal(rateChange(1, 10, 0, 0), '이전 기간 분모 없음');
  assert.equal(ratioLabel(0, 10), '0.0% (0/10)');
  assert.equal(ratioLabel(0, 0), '측정 기록 없음');
});

test('independent sections isolate failure, fetch only their view, and apply same-time SQL cutoffs', async () => {
  const local = createAnalyticsStore(':memory:');
  const runtime = createRuntimeStore(async (sql, values) => local.query(sql, values), 'sqlite');
  const s = adminSelection({}, now);
  const page = () => ({
    eventId: randomUUID(),
    sessionId: randomUUID(),
    type: 'page_view' as const,
    path: '/',
  });
  try {
    await runtime.record(page(), '2026-09-08T14:00:00.000Z'); // coverage before comparison
    await runtime.record(page(), s.previous.start);
    await runtime.record(page(), '2026-09-09T04:23:44.999Z');
    await runtime.record(page(), s.previous.end); // excluded previous
    await runtime.record(page(), s.range.start);
    await runtime.record(page(), s.range.end); // excluded current
    await runtime.record({ ...page(), type: 'page_engagement_start' }, s.range.start);
    assert.equal((await runtime.metrics(s.previous)).visits, 2);
    assert.equal((await runtime.metrics(s.range)).visits, 1);
    assert.deepEqual(await runtime.coverage(), {
      firstRecord: '2026-09-08T14:00:00.000Z',
      firstDetail: s.range.start,
    });
    const calls: string[] = [];
    const connect = async () => ({
      ...runtime,
      metrics: async (range: typeof s.range) => {
        calls.push('metrics');
        return runtime.metrics(range);
      },
      performance: async (...args: Parameters<typeof runtime.performance>) => {
        calls.push(args[1]);
        return runtime.performance(...args);
      },
      daily: async (...args: Parameters<typeof runtime.daily>) => {
        calls.push('daily');
        return runtime.daily(...args);
      },
      journey: async <
        S extends 'pages' | 'ctas' | 'funnel' | 'actions' | 'transitions' | 'firstMeasuredAt',
      >(
        range: typeof s.range,
        section: S,
      ) => {
        calls.push(section);
        if (section === 'actions') throw new Error('query unavailable');
        return runtime.journey(range, section);
      },
      results: async (...args: Parameters<typeof runtime.results>) => {
        calls.push('results');
        return runtime.results(...args);
      },
    });
    const summary = await loadAdminData(s, false, connect);
    assert.equal(summary.metrics?.data?.visits, 1);
    assert.equal(summary.previous?.data?.visits, 2);
    assert.deepEqual(summary.comparison, { range: s.previous, available: true, reason: null });
    assert.deepEqual(summary.actions, { error: true });
    assert.equal(summary.daily?.data?.length, 7);
    assert.equal(summary.funnel?.data?.length, 4);
    assert.deepEqual(calls.sort(), ['actions', 'daily', 'funnel', 'landing', 'metrics', 'metrics']);
    calls.length = 0;
    await loadAdminData({ ...s, view: 'content' }, false, connect);
    assert.deepEqual(calls.sort(), ['landing', 'pages', 'source']);
    calls.length = 0;
    await loadAdminData({ ...s, view: 'journey' }, false, connect);
    assert.deepEqual(calls.sort(), ['actions', 'ctas', 'funnel', 'transitions']);
    calls.length = 0;
    const results = await loadAdminData({ ...s, view: 'results' }, false, connect);
    assert.deepEqual(calls, ['results']);
    assert.deepEqual(results.results?.data, []);
    assert.equal(results.metrics, undefined); // shared results have no site denominator
    const offline = await loadAdminData(s, false, async () => {
      throw new Error('offline');
    });
    assert.deepEqual(offline.metrics, { error: true });
    assert.deepEqual(offline.daily, { error: true });
    assert.equal(offline.comparison?.available, false);
    assert.match(offline.comparison?.reason || '', /조회하지 못/);
  } finally {
    local.close();
  }
});

test('readable CSV uses Korean headings and page titles and keeps spreadsheet escaping', () => {
  const csv = readableCsv(
    [
      {
        received_at: '2026-09-10',
        type: 'page_view',
        path: '/guides',
        category: null,
        cta: null,
        source: 'naver',
        events: 3,
        sessions: 2,
      },
    ],
    { '/guides': '=커튼 가이드, "안내"' },
    {},
  );
  assert.ok(csv.startsWith('\ufeff'));
  assert.match(csv, /날짜\(한국 시간\)/);
  assert.match(csv, /페이지 조회/);
  assert.match(csv, /네이버/);
  assert.match(csv, /"'=커튼 가이드, ""안내"""/);
  assert.doesNotMatch(csv, /session_id|event_id/);
});
