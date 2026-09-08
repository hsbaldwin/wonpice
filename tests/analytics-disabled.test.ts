import assert from 'node:assert/strict';
import test from 'node:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { randomUUID } from 'node:crypto';
import { authConfigured } from '../lib/auth';
import { getAnalyticsStore } from '../lib/analytics-server';
import { initAnalytics, sessionId, track, flushEvents } from '../lib/analytics-client';
import { POST } from '../app/api/events/route';
import { GET, HEAD } from '../app/go/quote/route';
import { site } from '../lib/site';

test('disabled analytics never opens SQLite and keeps the original CPA redirect', async () => {
  const enabled = process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
  const database = process.env.DATABASE_PATH;
  const filename = join(tmpdir(), `curtain-disabled-${randomUUID()}`, 'analytics.sqlite');
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = 'false';
  process.env.DATABASE_PATH = filename;
  try {
    assert.equal(authConfigured(), false);
    assert.throws(() => getAnalyticsStore(), /Analytics is disabled/);
    assert.equal(initAnalytics(), undefined);
    assert.equal(sessionId(), '');
    track('helper_start');
    await flushEvents();
    const response = await POST(new Request('https://example.com/api/events', { method: 'POST' }));
    assert.equal(response.status, 204);
    for (const response of [await GET(new Request('https://example.com/go/quote')), await HEAD()]) {
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), site.affiliateUrl);
      assert.match(response.headers.get('cache-control') || '', /no-store/);
    }
    assert.equal(existsSync(filename), false);
  } finally {
    if (enabled === undefined) delete process.env.NEXT_PUBLIC_ANALYTICS_ENABLED;
    else process.env.NEXT_PUBLIC_ANALYTICS_ENABLED = enabled;
    if (database === undefined) delete process.env.DATABASE_PATH;
    else process.env.DATABASE_PATH = database;
  }
});
