import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  newQuote,
  validateRooms,
  parseDraft,
  parseSaved,
  upsertQuote,
  duplicateQuote,
} from '../lib/quote';
import { recommend } from '../lib/recommend';
test('dimensions reject empty zero and invalid values; decimal cm supported', () => {
  const q = newQuote();
  assert.equal(Object.keys(validateRooms(q.rooms)).length, 2);
  q.rooms[0].windows[0].width = '360.5';
  q.rooms[0].windows[0].height = '240';
  assert.deepEqual(validateRooms(q.rooms), {});
  q.rooms[0].windows[0].height = '0';
  assert.equal(Object.keys(validateRooms(q.rooms)).length, 1);
});
test('storage preserves valid documents and rejects malformed structures', () => {
  const q = newQuote();
  assert.equal(parseDraft(JSON.stringify(q))?.id, q.id);
  assert.throws(() => parseDraft('{'));
  assert.throws(() => parseSaved(JSON.stringify([{ version: 2 }])));
  assert.throws(() => parseDraft(JSON.stringify({ ...q, rooms: [null] })));
});
test('snapshot upsert and duplication retain independent windows', () => {
  const q = newQuote();
  const copy = duplicateQuote(q);
  assert.notEqual(q.id, copy.id);
  assert.notEqual(q.rooms[0].windows[0].id, copy.rooms[0].windows[0].id);
  assert.equal(upsertQuote([q], { ...q, name: '바뀐 이름' }).length, 1);
});
test('legacy recommendation responds to goals and keeps the previous mood behavior', () => {
  const r = newQuote().rooms[0];
  delete r.needs;
  assert.equal(recommend(r).id, 'sheer');
  r.goal = 'blackout';
  assert.equal(recommend(r).id, 'blackout');
  r.mood = 'minimal';
  assert.equal(recommend(r).id, 'blackout-blind');
  r.goal = 'privacy';
  r.mood = 'natural';
  assert.equal(recommend(r).id, 'layered');
});
