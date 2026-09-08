import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recommend, recommendForInquiry, selectedNeeds } from '../lib/recommend';
import type { CurtainNeed, Goal, Mood, Room } from '../lib/types';

const goals: Goal[] = ['daylight', 'blackout', 'privacy', 'balanced', 'unsure'];
const moods: Mood[] = ['natural', 'hotel', 'minimal', 'unsure'];

function room(goal: Goal, mood: Mood): Room {
  return { id: 'room', name: '거실', type: 'living', windows: [], goal, mood };
}

test('legacy recommendations keep every existing goal and mood combination', () => {
  for (const goal of goals) {
    for (const mood of moods) {
      const selectedRoom = room(goal, mood);
      assert.deepEqual(recommendForInquiry(selectedRoom), recommend(selectedRoom));
      const expected =
        mood === 'minimal'
          ? goal === 'blackout'
            ? 'blackout-blind'
            : 'combi-blind'
          : goal === 'blackout'
            ? 'blackout'
            : goal === 'privacy' || goal === 'balanced' || mood === 'hotel'
              ? 'layered'
              : 'sheer';
      assert.equal(recommend(selectedRoom).id, expected);
    }
  }
});

test('multiple needs take precedence over every legacy goal and mood without inferring a blind style', () => {
  const available: CurtainNeed[] = ['daylight', 'blackout', 'privacy', 'balanced'];
  for (let mask = 0; mask < 16; mask++) {
    const needs = available.filter((_, index) => mask & (1 << index));
    const expected =
      needs.length === 0
        ? 'consultation'
        : needs.includes('privacy') ||
            needs.includes('balanced') ||
            (needs.includes('blackout') && needs.includes('daylight'))
          ? 'layered'
          : needs.includes('blackout')
            ? 'blackout'
            : 'sheer';
    for (const goal of goals) {
      for (const mood of moods) {
        const input = { ...room(goal, mood), needs };
        const before = structuredClone(input);
        assert.equal(recommend(input).id, expected, `${needs.join('+')} / ${goal} / ${mood}`);
        assert.doesNotMatch(recommend(input).title, /블라인드/);
        assert.deepEqual(input, before);
      }
    }
  }
});

test('selected needs distinguish an intentional empty selection from a legacy goal', () => {
  assert.deepEqual(selectedNeeds(room('unsure', 'hotel')), []);
  assert.deepEqual(selectedNeeds(room('blackout', 'minimal')), ['blackout']);
  const selected = { ...room('blackout', 'hotel'), needs: [] as CurtainNeed[] };
  assert.equal(selectedNeeds(selected), selected.needs);
  assert.deepEqual(selectedNeeds(selected), []);
  assert.equal(recommend(selected).id, 'consultation');
  assert.equal(recommend(selected).title, '상담으로 구성을 정해보세요');
  assert.equal(
    recommend(selected).reason,
    '아직 필요한 기능을 정하지 않았어요. 밝기와 시선 보호 정도를 상담하며 비교해보세요.',
  );
  assert.equal(recommend(room('unsure', 'unsure')).id, 'sheer');
  selected.needs = ['blackout', 'daylight'];
  assert.equal(selectedNeeds(selected), selected.needs);
  assert.equal(recommend(selected).id, 'layered');
});

test('curtain-only inquiries never recommend blinds, including a minimal mood', () => {
  for (const goal of goals) {
    for (const mood of moods) {
      const selectedRoom = room(goal, mood);
      const original = structuredClone(selectedRoom);
      const result = recommendForInquiry(selectedRoom, { curtainCount: '2', blindCount: '0' });
      assert.match(result.title, /커튼/);
      assert.doesNotMatch(result.title, /블라인드/);
      if (goal === 'blackout') assert.match(result.title, /암막/);
      assert.deepEqual(selectedRoom, original);
    }
  }
});

test('blind-only inquiries respect the chosen type and blackout need without changing the mood', () => {
  for (const goal of goals) {
    for (const mood of moods) {
      const selectedRoom = room(goal, mood);
      const original = structuredClone(selectedRoom);
      const result = recommendForInquiry(selectedRoom, { curtainCount: '0', blindCount: '3' });
      assert.match(result.title, /블라인드/);
      assert.doesNotMatch(result.title, /커튼/);
      if (goal === 'blackout') assert.match(result.title, /암막/);
      assert.deepEqual(selectedRoom, original);
    }
  }
});

test('mixed inquiries include both products and preserve the curtain purpose', () => {
  for (const goal of goals) {
    for (const mood of moods) {
      const selectedRoom = room(goal, mood);
      const original = structuredClone(selectedRoom);
      const result = recommendForInquiry(selectedRoom, { curtainCount: '1', blindCount: '1' });
      assert.match(result.title, /커튼/);
      assert.match(result.title, /빛 조절 블라인드/);
      assert.match(result.reason, /커튼과 블라인드/);
      assert.ok(result.checklist.some((item) => item.includes('각각 구분')));
      if (goal === 'blackout') assert.match(result.title, /암막/);
      assert.deepEqual(selectedRoom, original);
    }
  }
});
