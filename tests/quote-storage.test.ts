import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DRAFT_KEY, newQuote } from '../lib/quote';
import { readQuoteDraft, writeQuoteDraft } from '../lib/quote-storage';

test('a denied read blocks future autosave without touching the previous record', () => {
  const existing = JSON.stringify(newQuote());
  let persisted = existing;
  let writes = 0;
  const storage = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem(_key: string, value: string) {
      writes++;
      persisted = value;
    },
  };
  const restored = readQuoteDraft(() => storage);
  assert.equal(restored.blocked, true);
  const memoryDraft = newQuote('bedroom');
  memoryDraft.rooms[0].windows[0].width = '375.5';
  assert.equal(
    writeQuoteDraft(() => storage, memoryDraft, restored),
    'blocked',
  );
  assert.equal(writes, 0);
  assert.equal(persisted, existing);
  assert.equal(memoryDraft.rooms[0].windows[0].width, '375.5');
});

test('corrupt stored JSON stays intact and cannot be overwritten by defaults', () => {
  let persisted = '{broken';
  const storage = {
    getItem: () => persisted,
    setItem(_key: string, value: string) {
      persisted = value;
    },
  };
  const restored = readQuoteDraft(() => storage);
  assert.equal(
    writeQuoteDraft(() => storage, newQuote(), restored),
    'blocked',
  );
  assert.equal(persisted, '{broken');
});

test('quota failure retains the editable draft and the previously stored document', () => {
  const previous = newQuote();
  const persisted = JSON.stringify(previous);
  const storage = {
    getItem: () => persisted,
    setItem() {
      throw new Error('QuotaExceededError');
    },
  };
  const restored = readQuoteDraft(() => storage);
  assert.equal(restored.blocked, false);
  assert.ok(restored.document);
  restored.document.rooms[0].windows[0].width = '375.5';
  const memoryBefore = structuredClone(restored.document);
  assert.equal(
    writeQuoteDraft(() => storage, restored.document, restored),
    'unavailable',
  );
  assert.deepEqual(restored.document, memoryBefore);
  assert.equal(storage.getItem(), persisted);
});

test('storage access and writes are deferred until restoration completes', () => {
  let accesses = 0;
  const denied = () => {
    accesses++;
    throw new Error('localStorage getter blocked');
  };
  assert.equal(writeQuoteDraft(denied, newQuote(), { ready: false, blocked: false }), 'pending');
  assert.equal(accesses, 0);
  assert.equal(readQuoteDraft(denied).blocked, true);
  assert.equal(writeQuoteDraft(denied, newQuote(), { ready: true, blocked: false }), 'unavailable');
});

test('an available empty store saves the latest measurement and restores it unchanged', () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
  const restored = readQuoteDraft(() => storage);
  assert.equal(restored.document, null);
  const draft = newQuote();
  draft.rooms[0].windows[0].width = '375.5';
  draft.rooms[0].windows[0].height = '240';
  assert.equal(
    writeQuoteDraft(() => storage, draft, restored),
    'saved',
  );
  assert.equal(JSON.parse(values.get(DRAFT_KEY)!).id, draft.id);
  assert.deepEqual(readQuoteDraft(() => storage).document, draft);
});
