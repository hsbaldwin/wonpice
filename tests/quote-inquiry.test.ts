import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  duplicateQuote,
  newQuote,
  parseDraft,
  parseSaved,
  upsertQuote,
  validateInquiry,
  validateRooms,
} from '../lib/quote';
import { readQuoteDraft, writeQuoteDraft } from '../lib/quote-storage';

test('inquiry counts allow either product and reject empty or invalid totals without changing input', () => {
  for (const inquiry of [
    { curtainCount: '1', blindCount: '' },
    { curtainCount: '', blindCount: '99' },
    { curtainCount: '99', blindCount: '99' },
    { curtainCount: ' 2 ', blindCount: '0' },
    { curtainCount: '00', blindCount: '02' },
  ]) {
    const before = structuredClone(inquiry);
    assert.deepEqual(validateInquiry(inquiry), {});
    assert.deepEqual(inquiry, before);
  }
  for (const inquiry of [
    undefined,
    { curtainCount: '', blindCount: '' },
    { curtainCount: '0', blindCount: '  ' },
    { curtainCount: '00', blindCount: '0' },
  ]) {
    assert.deepEqual(Object.keys(validateInquiry(inquiry)), ['curtainCount']);
  }
  for (const value of [
    '-1',
    '+1',
    '0.5',
    '1.0',
    '1e1',
    '0x10',
    'NaN',
    'Infinity',
    '100',
    '1,000',
    '2개',
  ]) {
    assert.deepEqual(
      Object.keys(validateInquiry({ curtainCount: value, blindCount: '1' })),
      ['curtainCount'],
      `rejected curtain count ${value}`,
    );
    assert.deepEqual(
      Object.keys(validateInquiry({ curtainCount: '1', blindCount: value })),
      ['blindCount'],
      `rejected blind count ${value}`,
    );
  }
});

test('the v1 parser preserves legacy requests and unfinished count drafts without inventing dimensions', () => {
  const legacy = newQuote('bedroom');
  delete legacy.inputMode;
  delete legacy.rooms[0].needs;
  legacy.rooms[0].windows[0].width = '375.5';
  legacy.rooms[0].windows[0].height = '240';
  const draft = newQuote();
  assert.equal(draft.inputMode, 'measurements');
  assert.equal(draft.inquiry, undefined);
  delete draft.inputMode;
  delete draft.rooms[0].needs;
  draft.inquiry = { curtainCount: '-', blindCount: '100' };
  const parsed = parseSaved(JSON.stringify([legacy, draft]));
  assert.deepEqual(parsed, [legacy, draft]);
  assert.equal(parsed[0].inquiry, undefined);
  assert.equal(parsed[1].rooms[0].windows[0].width, '');
  assert.equal(parsed[1].rooms[0].windows[0].height, '');
  assert.equal(Object.keys(validateRooms(parsed[1].rooms)).length, 2);
  for (const inquiry of [
    null,
    [],
    {},
    { curtainCount: 1, blindCount: '0' },
    { curtainCount: '1', blindCount: ['0'] },
    { curtainCount: '1'.repeat(21), blindCount: '0' },
    { curtainCount: '1', blindCount: '0'.repeat(21) },
  ]) {
    assert.throws(() => parseDraft(JSON.stringify({ ...draft, inquiry })));
  }
});

test('count drafts survive autosave, saved updates and independent duplication alongside legacy requests', () => {
  let persisted: string | null = null;
  const storage = {
    getItem: () => persisted,
    setItem(_key: string, value: string) {
      persisted = value;
    },
  };
  const draft = newQuote();
  delete draft.inputMode;
  delete draft.rooms[0].needs;
  draft.inquiry = { curtainCount: '02', blindCount: '1' };
  const before = structuredClone(draft);
  assert.equal(
    writeQuoteDraft(
      () => storage,
      draft,
      readQuoteDraft(() => storage),
    ),
    'saved',
  );
  assert.deepEqual(readQuoteDraft(() => storage).document, before);

  const legacy = newQuote();
  delete legacy.inputMode;
  delete legacy.rooms[0].needs;
  const saved = upsertQuote([legacy], draft);
  const copy = duplicateQuote(draft);
  assert.deepEqual(copy.inquiry, draft.inquiry);
  assert.notEqual(copy.inquiry, draft.inquiry);
  copy.inquiry!.curtainCount = '4';
  assert.equal(draft.inquiry.curtainCount, '02');
  assert.deepEqual(parseSaved(JSON.stringify(upsertQuote(saved, copy))), [copy, draft, legacy]);
  assert.equal(duplicateQuote(legacy).inquiry, undefined);
  assert.deepEqual(draft, before);
});
