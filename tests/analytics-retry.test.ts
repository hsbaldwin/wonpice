import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { transformSync } from 'esbuild';

// Run the real module in an isolated browser-like context with a controllable clock.
const clientCode = transformSync(readFileSync('lib/analytics-client.ts', 'utf8'), {
  loader: 'ts',
  format: 'cjs',
}).code;
function fixture(respond: (attempt: number) => Promise<Response> | Response) {
  let clock = 0,
    timerId = 0;
  const timers = new Map<number, { at: number; callback: () => void }>();
  const storage = new Map<string, string>();
  const sent: { eventId: string; type: string }[] = [];
  const beacons: unknown[] = [];
  const window = new EventTarget();
  const document = Object.assign(new EventTarget(), { visibilityState: 'visible', referrer: '' });
  const navigator = {
    onLine: true,
    sendBeacon: (_url: string, body: unknown) => {
      beacons.push(body);
      return true;
    },
  };
  const module = { exports: {} as typeof import('../lib/analytics-client') };
  let blocked = false;
  runInNewContext(clientCode, {
    module,
    exports: module.exports,
    require: () => ({ analyticsEnabled: () => true }),
    window,
    document,
    navigator,
    location: { pathname: '/', hostname: 'curtain.example' },
    crypto: { randomUUID },
    Blob,
    console,
    Date: class extends Date {
      static now() {
        return 1_800_000_000_000 + clock;
      }
    },
    sessionStorage: {
      getItem: (key: string) => {
        if (blocked) throw new Error('storage blocked');
        return storage.get(key) ?? null;
      },
      setItem: (key: string, value: string) => {
        if (blocked) throw new Error('storage blocked');
        storage.set(key, value);
      },
    },
    setTimeout: (callback: () => void, delay: number) => {
      const id = ++timerId;
      timers.set(id, { at: clock + delay, callback });
      return id;
    },
    clearTimeout: (id: number) => timers.delete(id),
    fetch: async (_url: string, options: RequestInit) => {
      sent.push(JSON.parse(String(options.body)));
      return respond(sent.length);
    },
  });
  const drain = async () => {
    for (let i = 0; i < 8; i++) await Promise.resolve();
  };
  return {
    api: module.exports,
    storage,
    sent,
    timers,
    navigator,
    document,
    window,
    beacons,
    drain,
    blockStorage: () => {
      blocked = true;
    },
    delay: () => [...timers.values()][0]?.at - clock,
    async next() {
      assert.equal(timers.size, 1, 'Only one retry is scheduled');
      const [id, timer] = [...timers.entries()][0];
      timers.delete(id);
      clock = timer.at;
      timer.callback();
      await drain();
    },
  };
}

test('network and server failures retry once per schedule, preserve IDs and stop after five retries', async () => {
  const f = fixture(async (attempt) => {
    if (attempt === 1) throw new Error('offline');
    return new Response(null, { status: 503 });
  });
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  await f.drain();
  const firstId = f.sent[0].eventId;
  f.api.track('helper_start');
  await f.drain();
  assert.equal(f.sent.length, 1, 'New events do not bypass the pending retry');
  for (const delay of [2000, 4000, 8000, 16000, 30000]) {
    assert.equal(f.delay(), delay);
    await f.next();
  }
  assert.equal(f.sent.length, 6);
  assert.equal(f.timers.size, 0);
  assert.ok(f.sent.every((event) => event.eventId === firstId));
  assert.equal(JSON.parse(f.storage.get('masters:analytics-queue')!).length, 2);
  f.api.track('helper_complete');
  await f.api.flushEvents();
  await f.drain();
  assert.equal(f.sent.length, 6, 'Exhausted retries remain paused');
  f.window.dispatchEvent(new Event('online'));
  await f.drain();
  assert.equal(f.sent.length, 7);
  assert.equal(f.delay(), 2000, 'Online recovery starts a fresh bounded attempt');
  cleanup();
  assert.equal(f.timers.size, 0);
});

test('Retry-After takes precedence, is capped at 60 seconds, and recovery drains the queue', async () => {
  const f = fixture((attempt) =>
    attempt < 3
      ? new Response(null, { status: 429, headers: { 'Retry-After': attempt === 1 ? '7' : '999' } })
      : new Response(null, { status: 204 }),
  );
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  await f.drain();
  assert.equal(f.delay(), 7000);
  await f.next();
  assert.equal(f.delay(), 60000);
  await f.next();
  assert.equal(f.storage.get('masters:analytics-queue'), '[]');
  assert.equal(f.timers.size, 0);
  cleanup();
});

test('Retry-After dates work and invalid values fall back to the bounded schedule', async () => {
  const future = new Date(1_800_000_010_000).toUTCString();
  const f = fixture(
    (attempt) =>
      new Response(null, {
        status: 503,
        headers: { 'Retry-After': attempt === 1 ? future : 'invalid-date' },
      }),
  );
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  await f.drain();
  assert.equal(f.delay(), 10000);
  await f.next();
  assert.equal(f.delay(), 4000);
  cleanup();
});

test('hidden and offline queues resume safely and permanent invalid events do not block valid ones', async () => {
  const f = fixture((attempt) => new Response(null, { status: attempt === 1 ? 400 : 204 }));
  f.navigator.onLine = false;
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  f.api.track('helper_start');
  await f.drain();
  assert.equal(f.sent.length, 0);
  assert.equal(f.timers.size, 0);
  f.document.visibilityState = 'hidden';
  f.document.dispatchEvent(new Event('visibilitychange'));
  assert.equal(f.beacons.length, 2);
  f.navigator.onLine = true;
  f.document.visibilityState = 'visible';
  f.document.dispatchEvent(new Event('visibilitychange'));
  await f.drain();
  assert.equal(f.sent.length, 2);
  assert.equal(f.storage.get('masters:analytics-queue'), '[]');
  cleanup();
});

test('cleanup also prevents a pending request from creating a late retry timer', async () => {
  let release!: (value: Response) => void;
  const f = fixture(
    () =>
      new Promise<Response>((resolve) => {
        release = resolve;
      }),
  );
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  await f.drain();
  cleanup();
  release(new Response(null, { status: 503 }));
  await f.drain();
  assert.equal(f.timers.size, 0);
  assert.equal(JSON.parse(f.storage.get('masters:analytics-queue')!).length, 1);
  f.window.dispatchEvent(new Event('online'));
  await f.drain();
  assert.equal(f.sent.length, 1);
});

test('blocked browser storage still permits memory retries and queue retention is bounded', async () => {
  const f = fixture((attempt) => new Response(null, { status: attempt === 1 ? 503 : 204 }));
  f.blockStorage();
  const cleanup = f.api.initAnalytics()!;
  f.api.track('page_view');
  await f.drain();
  await f.next();
  assert.equal(f.sent[0].eventId, f.sent[1].eventId);
  cleanup();
  const bounded = fixture(() => new Response(null, { status: 503 }));
  bounded.navigator.onLine = false;
  const stop = bounded.api.initAnalytics()!;
  for (let i = 0; i < 70; i++) bounded.api.track('page_view');
  assert.equal(JSON.parse(bounded.storage.get('masters:analytics-queue')!).length, 60);
  stop();
});
