import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DRAFT_KEY, SAVED_KEY, newQuote, newRoom, newWindow } from '../lib/quote';
import type { QuoteDocument } from '../lib/types';
import {
  SINGLE_QUOTE_KEY,
  hasQuoteInput,
  nextQuoteUpdatedAt,
  readSingleQuote,
  writeSingleQuote,
} from '../lib/single-quote-storage';

function quote(time: string, width = ''): QuoteDocument {
  const document = newQuote();
  document.createdAt = time;
  document.updatedAt = time;
  document.rooms[0].windows[0].width = width;
  return document;
}
const earlier = '2026-09-07T01:00:00.000Z';
const later = '2026-09-07T02:00:00.000Z';
const latest = '2026-09-07T03:00:00.000Z';
const writable = { ready: true, blocked: false };

function memory(entries: [string, string][] = []) {
  const values = new Map(entries);
  const reads: string[] = [];
  const writes: [string, string][] = [];
  return {
    values,
    reads,
    writes,
    storage: {
      getItem(key: string) {
        reads.push(key);
        return values.get(key) ?? null;
      },
      setItem(key: string, value: string) {
        writes.push([key, value]);
        values.set(key, value);
      },
    },
  };
}

test('meaningful input includes partial values, choices, settings, names and added structure', () => {
  const changes: ((document: QuoteDocument) => void)[] = [
    (d) => {
      d.rooms[0].windows[0].width = '0';
    },
    (d) => {
      d.rooms[0].windows[0].height = '-';
    },
    (d) => {
      d.rooms[0].needs = ['blackout'];
    },
    (d) => {
      d.rooms[0].goal = 'daylight';
    },
    (d) => {
      d.rooms[0].mood = 'hotel';
    },
    (d) => {
      d.inquiry = { curtainCount: '0', blindCount: '' };
    },
    (d) => {
      d.inquiry = { curtainCount: '', blindCount: '-' };
    },
    (d) => {
      d.rooms[0].windows[0].basis = 'installation';
    },
    (d) => {
      d.rooms[0].windows[0].accuracy = 'measured';
    },
    (d) => {
      d.rooms[0].name = '안방';
    },
    (d) => {
      d.name = '우리 집 안방 상담';
    },
    (d) => {
      d.rooms.push(newRoom());
    },
    (d) => {
      d.rooms[0].windows.push(newWindow());
    },
  ];
  for (const change of changes) {
    const document = newQuote();
    change(document);
    const before = structuredClone(document);
    assert.equal(hasQuoteInput(document), true);
    assert.deepEqual(document, before);
  }
  const empty = newQuote('bedroom');
  empty.step = 3;
  empty.rooms[0].windows[0].width = '  ';
  empty.rooms[0].name = ' ';
  empty.inquiry = { curtainCount: ' ', blindCount: '' };
  assert.equal(hasQuoteInput(empty), false, 'A blank guide preset is not user input');
  assert.equal(hasQuoteInput(newQuote()), false);
});

test('migration chooses the latest meaningful draft or saved quote, without relying on array order', () => {
  for (const draftIsLatest of [true, false]) {
    const draft = quote(draftIsLatest ? latest : earlier, '375.5');
    draft.step = 2;
    const saved = quote(later, '360');
    saved.step = 1;
    const olderSaved = quote(earlier, '180');
    const store = memory([
      [DRAFT_KEY, JSON.stringify(draft)],
      [SAVED_KEY, JSON.stringify([olderSaved, saved])],
    ]);
    const result = readSingleQuote(() => store.storage);
    assert.equal(result.blocked, false);
    assert.deepEqual(result.document, draftIsLatest ? draft : { ...saved, step: 3 });
    assert.equal(store.writes.length, 0);
  }
});

test('equal timestamps prefer the draft so its current editing step is retained', () => {
  const draft = quote(later, '375.5');
  draft.step = 2;
  const saved = { ...quote(later, '360'), id: draft.id };
  const store = memory([
    [DRAFT_KEY, JSON.stringify(draft)],
    [SAVED_KEY, JSON.stringify([saved])],
  ]);
  assert.deepEqual(readSingleQuote(() => store.storage).document, draft);
});

test('a newer empty generated draft does not hide saved input; wholly empty legacy data returns no document', () => {
  const empty = quote(latest);
  empty.rooms[0].type = 'bedroom';
  const saved = quote(earlier, '360');
  const store = memory([
    [DRAFT_KEY, JSON.stringify(empty)],
    [SAVED_KEY, JSON.stringify([saved])],
  ]);
  assert.deepEqual(readSingleQuote(() => store.storage).document, { ...saved, step: 3 });
  store.values.set(SAVED_KEY, JSON.stringify([newQuote()]));
  assert.deepEqual(
    readSingleQuote(() => store.storage),
    { document: null, ready: true, blocked: false },
  );
});

test('the current key wins even when older or intentionally empty, without consulting broken legacy records', () => {
  for (const current of [quote(earlier, '200'), quote(earlier)]) {
    const store = memory([
      [SINGLE_QUOTE_KEY, JSON.stringify(current)],
      [DRAFT_KEY, '{broken'],
      [SAVED_KEY, JSON.stringify([quote(latest, '999')])],
    ]);
    assert.deepEqual(
      readSingleQuote(() => store.storage),
      { document: current, ready: true, blocked: false },
    );
    assert.deepEqual(store.reads, [SINGLE_QUOTE_KEY]);
    assert.equal(store.writes.length, 0);
  }
});

test('migration and future writes preserve every legacy document and write only one current object', () => {
  const draft = quote(earlier, '180');
  const saved = [quote(later, '360'), quote(earlier, '240')];
  const original = [
    [DRAFT_KEY, JSON.stringify(draft)],
    [SAVED_KEY, JSON.stringify(saved)],
  ] as [string, string][];
  const store = memory(original);
  const restored = readSingleQuote(() => store.storage);
  assert.equal(store.writes.length, 0);
  assert.ok(restored.document);
  assert.equal(
    writeSingleQuote(() => store.storage, restored.document, restored),
    'saved',
  );
  const updated = structuredClone(restored.document);
  updated.updatedAt = latest;
  updated.rooms[0].windows[0].height = '240.5';
  updated.rooms[0].needs = ['blackout', 'daylight'];
  assert.equal(
    writeSingleQuote(() => store.storage, updated, writable),
    'saved',
  );
  assert.deepEqual(readSingleQuote(() => store.storage).document, updated);
  assert.equal(Array.isArray(JSON.parse(store.values.get(SINGLE_QUOTE_KEY)!)), false);
  for (const [key, raw] of original) assert.equal(store.values.get(key), raw);
  assert.deepEqual(
    store.writes.map(([key]) => key),
    [SINGLE_QUOTE_KEY, SINGLE_QUOTE_KEY],
  );
});

test('partial invalid input is stored and resumed exactly without coerced values or fabricated sizes', () => {
  const document = quote(earlier, '375.');
  document.rooms[0].windows[0].height = '-';
  document.rooms[0].windows[0].accuracy = 'measured';
  document.rooms[0].needs = ['privacy', 'daylight'];
  document.inquiry = { curtainCount: '02', blindCount: '1' };
  const before = structuredClone(document);
  const store = memory();
  assert.equal(
    writeSingleQuote(
      () => store.storage,
      document,
      readSingleQuote(() => store.storage),
    ),
    'saved',
  );
  assert.deepEqual(readSingleQuote(() => store.storage).document, before);
  assert.deepEqual(document, before);
});

test('corrupt current or legacy records block restoration and cannot be overwritten by defaults', () => {
  const cases: [string, string][] = [
    [SINGLE_QUOTE_KEY, '{broken'],
    [SINGLE_QUOTE_KEY, ''],
    [SINGLE_QUOTE_KEY, 'null'],
    [SINGLE_QUOTE_KEY, '[]'],
    [DRAFT_KEY, '{broken'],
    [DRAFT_KEY, ''],
    [SAVED_KEY, '[null]'],
    [SAVED_KEY, ''],
  ];
  for (const entry of cases) {
    const store = memory([entry]);
    const restored = readSingleQuote(() => store.storage);
    assert.deepEqual(restored, { document: null, ready: true, blocked: true });
    assert.equal(
      writeSingleQuote(() => store.storage, newQuote(), restored),
      'blocked',
    );
    assert.deepEqual([...store.values], [entry]);
    assert.equal(store.writes.length, 0);
  }
});

test('storage getter denial and readiness guards never trigger accidental access or writes', () => {
  let accesses = 0;
  const denied = () => {
    accesses++;
    throw Error('SecurityError');
  };
  const document = newQuote();
  assert.equal(writeSingleQuote(denied, document, { ready: false, blocked: false }), 'pending');
  assert.equal(writeSingleQuote(denied, document, { ready: true, blocked: true }), 'blocked');
  assert.equal(
    writeSingleQuote(denied, document, { ready: false, blocked: false, replace: true }),
    'pending',
  );
  assert.equal(
    writeSingleQuote(denied, document, { ready: true, blocked: true, replace: true }),
    'blocked',
  );
  assert.equal(accesses, 0);
  assert.equal(readSingleQuote(denied).blocked, true);
  assert.equal(writeSingleQuote(denied, document, writable), 'unavailable');
  assert.equal(accesses, 2);
});

test('read failures and quota failures retain the previous record and editable in-memory document', () => {
  const current = quote(earlier, '360');
  const document = quote(later, '375.5');
  const original = JSON.stringify(current);
  const before = structuredClone(document);
  for (const deniedRead of [true, false]) {
    let persisted = original;
    let writes = 0;
    const storage = {
      getItem() {
        if (deniedRead) throw Error('SecurityError');
        return persisted;
      },
      setItem() {
        writes++;
        throw Error('QuotaExceededError');
      },
    };
    assert.equal(
      writeSingleQuote(() => storage, document, writable),
      'unavailable',
    );
    assert.equal(persisted, original);
    assert.equal(writes, deniedRead ? 0 : 1);
    assert.deepEqual(document, before);
  }
});

test('stale tab flushes cannot replace a newer edit or an intentionally empty reset', () => {
  const stale = quote(earlier, '360');
  for (const current of [{ ...quote(later, '375.5'), id: stale.id }, quote(latest)]) {
    const original = JSON.stringify(current);
    const store = memory([[SINGLE_QUOTE_KEY, original]]);
    assert.equal(
      writeSingleQuote(() => store.storage, stale, writable),
      'outdated',
    );
    assert.equal(store.values.get(SINGLE_QUOTE_KEY), original);
    assert.equal(store.writes.length, 0);
    assert.deepEqual(readSingleQuote(() => store.storage).document, current);
  }
});

test('timestamps are compared as instants and equal-time changes cannot bypass the stale-write guard', () => {
  const current = quote('2026-09-07T14:00:00+09:00', '360');
  const store = memory([[SINGLE_QUOTE_KEY, JSON.stringify(current)]]);
  const earlierDocument = { ...current, updatedAt: '2026-09-07T04:59:59Z' };
  assert.equal(
    writeSingleQuote(() => store.storage, earlierDocument, writable),
    'outdated',
  );
  const equal = { ...current, updatedAt: '2026-09-07T05:00:00Z', step: 2 as const };
  assert.equal(
    writeSingleQuote(() => store.storage, equal, writable),
    'outdated',
  );
  assert.equal(store.writes.length, 0);
  assert.deepEqual(readSingleQuote(() => store.storage).document, current);
});

test('same-millisecond conflicting contents are rejected while an identical flush remains safe', () => {
  const current = quote(later, '375.5');
  const store = memory([[SINGLE_QUOTE_KEY, JSON.stringify(current)]]);
  const stale = structuredClone(current);
  stale.rooms[0].windows[0].width = '360';
  assert.equal(
    writeSingleQuote(() => store.storage, stale, writable),
    'outdated',
  );
  assert.equal(store.writes.length, 0);
  assert.equal(store.values.get(SINGLE_QUOTE_KEY), JSON.stringify(current));
  assert.equal(
    writeSingleQuote(() => store.storage, structuredClone(current), writable),
    'saved',
  );
  assert.equal(store.writes.length, 1);
  assert.deepEqual(readSingleQuote(() => store.storage).document, current);
});

test('edit timestamps strictly increase during the same wall-clock millisecond', (t) => {
  const now = Date.parse(later);
  t.mock.method(Date, 'now', () => now);
  const previous = quote(later, '360');
  const before = structuredClone(previous);
  const first = nextQuoteUpdatedAt(previous);
  const second = nextQuoteUpdatedAt({ ...previous, updatedAt: first });
  assert.equal(Date.parse(first), now + 1);
  assert.equal(Date.parse(second), now + 2);
  assert.deepEqual(previous, before);

  const store = memory([[SINGLE_QUOTE_KEY, JSON.stringify(previous)]]);
  const changed = structuredClone(previous);
  changed.rooms[0].windows[0].width = '375.5';
  changed.updatedAt = first;
  assert.equal(
    writeSingleQuote(() => store.storage, changed, writable),
    'saved',
  );
  assert.equal(
    writeSingleQuote(() => store.storage, previous, writable),
    'outdated',
  );
});

test('future timestamps and newer stored records remain ahead of the local clock', (t) => {
  t.mock.method(Date, 'now', () => Date.parse(earlier));
  const previous = quote(later, '360');
  const stored = quote(latest, '375.5');
  assert.equal(Date.parse(nextQuoteUpdatedAt(previous)), Date.parse(later) + 1);
  assert.equal(Date.parse(nextQuoteUpdatedAt(previous, null)), Date.parse(later) + 1);
  assert.equal(Date.parse(nextQuoteUpdatedAt(previous, stored)), Date.parse(latest) + 1);
  assert.equal(Date.parse(nextQuoteUpdatedAt(stored, previous)), Date.parse(latest) + 1);
});

test('a newer wall clock is used when it already exceeds both document timestamps', (t) => {
  t.mock.method(Date, 'now', () => Date.parse(latest));
  assert.equal(nextQuoteUpdatedAt(quote(earlier), quote(later)), latest);
});

test('a record corrupted after restoration is protected until an explicit confirmed reset', () => {
  const store = memory([
    [SINGLE_QUOTE_KEY, '{broken'],
    [SAVED_KEY, JSON.stringify([quote(latest, '999')])],
  ]);
  const fresh = quote(earlier);
  assert.equal(
    writeSingleQuote(() => store.storage, fresh, writable),
    'unavailable',
  );
  assert.equal(store.values.get(SINGLE_QUOTE_KEY), '{broken');
  const legacy = store.values.get(SAVED_KEY);
  assert.equal(
    writeSingleQuote(() => store.storage, fresh, { ...writable, replace: true }),
    'saved',
  );
  assert.deepEqual(
    readSingleQuote(() => store.storage),
    { document: fresh, ready: true, blocked: false },
  );
  assert.equal(store.values.get(SAVED_KEY), legacy);
  store.values.set(SINGLE_QUOTE_KEY, JSON.stringify(quote(latest, '360')));
  assert.equal(
    writeSingleQuote(() => store.storage, fresh, { ...writable, replace: true }),
    'saved',
  );
  assert.deepEqual(readSingleQuote(() => store.storage).document, fresh);
});

test('explicit reset skips current-value reads but still preserves the record on a failed write', () => {
  const fresh = quote(later);
  let persisted = '{broken';
  let reads = 0;
  let deniedWrite = true;
  const storage = {
    getItem() {
      reads++;
      throw Error('SecurityError');
    },
    setItem(_key: string, value: string) {
      if (deniedWrite) throw Error('QuotaExceededError');
      persisted = value;
    },
  };
  assert.equal(
    writeSingleQuote(() => storage, fresh, { ...writable, replace: true }),
    'unavailable',
  );
  assert.equal(persisted, '{broken');
  deniedWrite = false;
  assert.equal(
    writeSingleQuote(() => storage, fresh, { ...writable, replace: true }),
    'saved',
  );
  assert.deepEqual(JSON.parse(persisted), fresh);
  assert.equal(reads, 0);
});
