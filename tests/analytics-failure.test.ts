import test from 'node:test';
import assert from 'node:assert/strict';
import { randomBytes, scryptSync } from 'node:crypto';
import { neonConfig } from '@neondatabase/serverless';
import { getRuntimeStore } from '../lib/analytics-store';
import { createSession, SESSION_COOKIE } from '../lib/auth';
import { GET as redirect } from '../app/go/quote/route';
import { GET as results, POST as save } from '../app/api/admin/affiliate-results/route';
import { sharedTrackingUrl } from '../lib/tracking';

function environment(values: Record<string, string | undefined>) {
  const old = Object.fromEntries(Object.keys(values).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return () => {
    for (const [key, value] of Object.entries(old)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}
test('Vercel never silently falls back to an ephemeral SQLite database', async () => {
  const restore = environment({
    VERCEL: '1',
    DATABASE_URL: undefined,
    NEXT_PUBLIC_ANALYTICS_ENABLED: 'true',
  });
  try {
    await assert.rejects(getRuntimeStore(), /DATABASE_URL is required/);
  } finally {
    restore();
  }
});
test(
  'a stalled Neon request cannot hold the quote redirect indefinitely',
  { timeout: 5000 },
  async () => {
    const restore = environment({
      VERCEL: '1',
      DATABASE_URL: 'postgresql://test:unused@example.neon.tech/test',
      NEXT_PUBLIC_ANALYTICS_ENABLED: 'true',
      SITE_TRACKING_CONFIRMED: 'false',
    });
    const originalFetch = neonConfig.fetchFunction;
    // Driver-level fake: no outbound network request or real DB credentials.
    neonConfig.fetchFunction = () => new Promise(() => {});
    try {
      const start = Date.now();
      const response = await redirect(new Request('https://curtain.example/go/quote'));
      assert.equal(response.status, 302);
      assert.equal(response.headers.get('location'), sharedTrackingUrl);
      assert.ok(Date.now() - start < 3000, 'Redirect must not wait for the hung database');
    } finally {
      neonConfig.fetchFunction = originalFetch;
      restore();
    }
  },
);
test('authenticated result API distinguishes storage failures from missing input', async () => {
  const salt = randomBytes(32),
    secret = randomBytes(40).toString('hex');
  const restore = environment({
    VERCEL: undefined,
    DATABASE_URL: undefined,
    DATABASE_PATH: '/dev/null/invalid.sqlite',
    NEXT_PUBLIC_ANALYTICS_ENABLED: 'true',
    NEXT_PUBLIC_SITE_URL: 'https://curtain.example',
    ADMIN_PASSWORD_HASH: `scrypt$${salt.toString('hex')}$${scryptSync('temporary-test-password', salt, 64).toString('hex')}`,
    ADMIN_SESSION_SECRET: secret,
  });
  try {
    const headers = {
      Cookie: `${SESSION_COOKIE}=${createSession(secret)}`,
      Origin: 'https://curtain.example',
      'Content-Type': 'application/json',
    };
    const response = await results(
      new Request('https://curtain.example/api/admin/affiliate-results', { headers }),
    );
    assert.equal(response.status, 503);
    assert.ok(!('results' in (await response.json())));
    const write = await save(
      new Request('https://curtain.example/api/admin/affiliate-results', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          date: '2026-01-01',
          scope: 'shared',
          applications: 0,
          approvals: 0,
        }),
      }),
    );
    assert.equal(write.status, 503);
    assert.match(write.headers.get('cache-control') || '', /no-store/);
  } finally {
    restore();
  }
});
