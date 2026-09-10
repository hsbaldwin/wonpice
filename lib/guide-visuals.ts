export const guideVisualIds = [
  'measurement-basics',
  'measurement-fullness',
  'rail-check',
  'curtain-cost-factors',
  'quote-comparison',
  'fabric-layers',
  'fabric-structure',
  'curtain-vs-blind',
  'living-room-light',
  'bedroom-blackout',
  'newlywed-room-plan',
  'move-in-preparation',
] as const;

export type GuideVisualId = (typeof guideVisualIds)[number];

export function isGuideVisualId(value: string): value is GuideVisualId {
  return (guideVisualIds as readonly string[]).includes(value);
}
