import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyReferrer, track } from '../lib/analytics-client';

test('classifies search referrers without keeping search terms or trusting lookalike hosts', () => {
  assert.equal(
    classifyReferrer('https://www.google.co.kr/search?q=private', 'curtain.example'),
    'google',
  );
  assert.equal(
    classifyReferrer('https://search.naver.com/search.naver?query=private', 'curtain.example'),
    'naver',
  );
  assert.equal(
    classifyReferrer('https://www.google.example.com/search', 'curtain.example'),
    'external',
  );
  assert.equal(classifyReferrer('https://curtain.example/guides', 'curtain.example'), 'internal');
  assert.equal(classifyReferrer('', 'curtain.example'), 'direct');
  assert.equal(classifyReferrer('not a URL', 'curtain.example'), 'direct');
});

test('events added during a pending send are drained and keep the original session source', async (t) => {
  const values = new Map<string, string>();
  const sent: Record<string, unknown>[] = [];
  let release!: () => void;
  const pending = new Promise<void>((resolve) => {
    release = resolve;
  });
  const testDocument = { referrer: 'https://search.naver.com/search.naver?query=private' };
  const mocks: Record<string, unknown> = {
    window: {},
    document: testDocument,
    location: { pathname: '/', hostname: 'curtain.example' },
    sessionStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
    fetch: async (_url: string, options: RequestInit) => {
      sent.push(JSON.parse(options.body as string));
      if (sent.length === 1) await pending;
      return Response.json({ accepted: true });
    },
  };
  for (const [key, value] of Object.entries(mocks)) {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, key);
    Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
    t.after(() => {
      if (descriptor) Object.defineProperty(globalThis, key, descriptor);
      else Reflect.deleteProperty(globalThis, key);
    });
  }
  track('page_view');
  testDocument.referrer = 'https://curtain.example/guides';
  track('helper_start');
  assert.equal(sent.length, 1);
  release();
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(
    sent.map((event) => event.type),
    ['page_view', 'helper_start'],
  );
  assert.deepEqual(
    sent.map((event) => event.source),
    ['naver', 'naver'],
  );
  assert.equal(sent[0].sessionId, sent[1].sessionId);
  assert.notEqual(sent[0].eventId, sent[1].eventId);
  assert.equal(values.get('masters:analytics-queue'), '[]');
  assert.ok(!JSON.stringify([...values]).includes('private'));
});
