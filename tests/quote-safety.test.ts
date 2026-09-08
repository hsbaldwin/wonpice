import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  duplicateQuote,
  newQuote,
  parseDraft,
  parseSaved,
  SAVED_LIMIT_MESSAGE,
  upsertQuote,
  validateRooms,
} from '../lib/quote';

test('measurement fields accept decimal centimetres and reject programming number syntax', () => {
  const quote = newQuote();
  const window = quote.rooms[0].windows[0];
  window.height = '240';
  for (const width of ['360', '360.5', '.5', '360.', ' 360.5 ', '2000']) {
    window.width = width;
    assert.deepEqual(
      validateRooms(quote.rooms),
      {},
      `expected ${width} to be a valid decimal measurement`,
    );
  }
  for (const width of [
    '0x10',
    '0b10',
    '0o10',
    '1e3',
    '+360',
    '-10',
    'NaN',
    'Infinity',
    '1,200',
    '0',
    '2000.01',
    '',
  ]) {
    window.width = width;
    assert.ok(validateRooms(quote.rooms)[`${window.id}-width`], `expected ${width} to be rejected`);
  }
});

test('restoration rejects coerced step and option types while retaining partial drafts', () => {
  const quote = newQuote();
  assert.equal(parseDraft(JSON.stringify(quote))?.step, 1);
  for (const step of ['1', '2', '3', true, null, [1]]) {
    assert.throws(() => parseDraft(JSON.stringify({ ...quote, step })));
  }
  for (const [key, value] of [
    ['type', ['living']],
    ['goal', ['daylight']],
    ['mood', ['natural']],
  ]) {
    const malformed = { ...quote, rooms: [{ ...quote.rooms[0], [key as string]: value }] };
    assert.throws(() => parseDraft(JSON.stringify(malformed)));
  }
  const room = quote.rooms[0];
  const malformedBasis = {
    ...quote,
    rooms: [{ ...room, windows: [{ ...room.windows[0], basis: ['window'] }] }],
  };
  assert.throws(() => parseSaved(JSON.stringify([malformedBasis])));
  assert.throws(() => parseDraft(JSON.stringify({ ...quote, id: '' })));
});

test('the saved-document limit never evicts an existing request', () => {
  const saved = Array.from({ length: 50 }, () => newQuote());
  const originalIds = saved.map((quote) => quote.id);
  assert.throws(() => upsertQuote(saved, newQuote()), { message: SAVED_LIMIT_MESSAGE });
  assert.throws(() => upsertQuote(saved, duplicateQuote(saved[0])), {
    message: SAVED_LIMIT_MESSAGE,
  });
  assert.deepEqual(
    saved.map((quote) => quote.id),
    originalIds,
  );

  const edited = { ...saved[20], name: '수정한 요청서' };
  const updated = upsertQuote(saved, edited);
  assert.equal(updated.length, 50);
  assert.equal(updated[0].name, '수정한 요청서');
  assert.deepEqual(new Set(updated.map((quote) => quote.id)), new Set(originalIds));
});
