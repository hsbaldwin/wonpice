import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  duplicateQuote,
  newQuote,
  parseDraft,
  parseSaved,
  upsertQuote,
  validateRooms,
} from '../lib/quote';
import { recommend, selectedNeeds } from '../lib/recommend';
import { readQuoteDraft, writeQuoteDraft } from '../lib/quote-storage';
import { goalLabels, type QuoteDocument } from '../lib/types';

test('new requests start with measurements and independent empty functional choices', () => {
  const first = newQuote();
  const second = newQuote();
  assert.equal(first.inputMode, 'measurements');
  assert.equal(first.inquiry, undefined);
  assert.deepEqual(first.rooms[0].needs, []);
  assert.notEqual(first.rooms[0].needs, second.rooms[0].needs);
  assert.equal(first.rooms[0].windows[0].width, '');
  assert.equal(first.rooms[0].windows[0].height, '');
  assert.equal(Object.keys(validateRooms(first.rooms)).length, 2);
  assert.deepEqual(goalLabels, {
    daylight: '자연광 살리기',
    blackout: '암막·빛 차단',
    privacy: '시선 보호',
    balanced: '빛 조절',
    unsure: '상담에서 결정',
  });
});

test('parsers retain old goal and count documents while validating optional mode and multiple needs', () => {
  const legacy = newQuote('bedroom');
  delete legacy.inputMode;
  delete legacy.rooms[0].needs;
  legacy.rooms[0].goal = 'blackout';
  legacy.rooms[0].mood = 'minimal';
  legacy.rooms[0].windows[0].width = '375.5';
  legacy.rooms[0].windows[0].height = '240';
  const counts = {
    ...legacy,
    id: 'legacy-counts',
    inquiry: { curtainCount: '02', blindCount: '1' },
  };
  const current = newQuote();
  current.rooms[0].needs = ['daylight', 'blackout'];
  const list = [legacy, counts, current];
  assert.deepEqual(parseSaved(JSON.stringify(list)), list);
  for (const inputMode of [null, 'counts', 'measurement', 1, ['measurements']]) {
    assert.throws(() => parseDraft(JSON.stringify({ ...current, inputMode })));
  }
  for (const needs of [
    null,
    'blackout',
    ['unsure', 'daylight'],
    ['other'],
    [1],
    [['blackout']],
    ['daylight', 'daylight'],
    ['daylight', 'blackout', 'privacy', 'balanced', 'daylight'],
  ]) {
    assert.throws(() =>
      parseDraft(JSON.stringify({ ...current, rooms: [{ ...current.rooms[0], needs }] })),
    );
  }
});

test('retired unsure choices are removed on restore without losing measurements', () => {
  const quote = newQuote();
  quote.rooms[0].windows[0].width = '360';
  const raw = JSON.stringify({ ...quote, rooms: [{ ...quote.rooms[0], needs: ['unsure'] }] });
  const restored = parseDraft(raw)!;
  assert.deepEqual(selectedNeeds(restored.rooms[0]), []);
  assert.equal(restored.rooms[0].windows[0].width, '360');
  assert.deepEqual(parseSaved(`[${raw}]`)[0].rooms[0].needs, []);
  assert.equal(recommend(restored.rooms[0]).id, 'consultation');
});

test('normalizing a legacy count request and duplicating its needs preserves all prior dimensions and counts', () => {
  const legacy = newQuote('bedroom');
  delete legacy.inputMode;
  delete legacy.rooms[0].needs;
  legacy.inquiry = { curtainCount: '02', blindCount: '1' };
  legacy.rooms[0].goal = 'blackout';
  legacy.rooms[0].windows[0].width = '375.5';
  legacy.rooms[0].windows[0].height = '240';
  const before = structuredClone(legacy);
  const normalized: QuoteDocument = {
    ...legacy,
    inputMode: 'measurements',
    rooms: legacy.rooms.map((room) => ({ ...room, needs: selectedNeeds(room) })),
  };
  const duplicate = duplicateQuote(normalized);
  assert.deepEqual(duplicate.rooms[0].needs, ['blackout']);
  assert.notEqual(duplicate.rooms[0].needs, normalized.rooms[0].needs);
  duplicate.rooms[0].needs!.push('daylight');
  duplicate.rooms[0].windows[0].width = '180';
  assert.deepEqual(normalized.rooms[0].needs, ['blackout']);
  assert.equal(normalized.rooms[0].windows[0].width, '375.5');
  assert.deepEqual(normalized.inquiry, legacy.inquiry);
  assert.equal(duplicateQuote(legacy).rooms[0].needs, undefined);
  assert.deepEqual(legacy, before);

  let persisted: string | null = null;
  const storage = {
    getItem: () => persisted,
    setItem(_key: string, value: string) {
      persisted = value;
    },
  };
  assert.equal(
    writeQuoteDraft(
      () => storage,
      normalized,
      readQuoteDraft(() => storage),
    ),
    'saved',
  );
  assert.deepEqual(readQuoteDraft(() => storage).document, normalized);
  const saved = upsertQuote([legacy], normalized);
  assert.deepEqual(parseSaved(JSON.stringify(saved)), [normalized]);
  assert.equal(saved[0].rooms[0].windows[0].height, '240');
  assert.deepEqual(saved[0].inquiry, { curtainCount: '02', blindCount: '1' });
});
