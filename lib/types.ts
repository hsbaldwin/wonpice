export type RoomType = 'living' | 'bedroom' | 'newlywed' | 'other';
export type Goal = 'daylight' | 'blackout' | 'privacy' | 'balanced' | 'unsure';
export type CurtainNeed = Exclude<Goal, 'unsure'>;
export type Mood = 'natural' | 'hotel' | 'minimal' | 'unsure';
export type MeasurementBasis = 'window' | 'installation';
export type Accuracy = 'approximate' | 'measured';
export interface WindowMeasurement {
  id: string;
  width: string;
  height: string;
  basis: MeasurementBasis;
  accuracy: Accuracy;
}
export interface Room {
  id: string;
  name: string;
  type: RoomType;
  windows: WindowMeasurement[];
  goal: Goal;
  mood: Mood;
  needs?: CurtainNeed[];
}
export interface Recommendation {
  id: string;
  title: string;
  subtitle: string;
  reason: string;
  alternative: string;
  checklist: string[];
  image: string;
}
export interface QuoteInquiry {
  curtainCount: string;
  blindCount: string;
}
export interface QuoteDocument {
  version: 1;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  rooms: Room[];
  step: 1 | 2 | 3;
  inputMode?: 'measurements';
  inquiry?: QuoteInquiry;
  recommendations?: Recommendation[];
}
export type EventName =
  | 'page_view'
  | 'helper_start'
  | 'helper_complete'
  | 'quote_save'
  | 'pdf_generated'
  | 'affiliate_outbound';
export interface AnalyticsEvent {
  landingPath?: string;
  eventId: string;
  sessionId: string;
  type: EventName;
  path: string;
  category?: string;
  cta?: string;
  source?: string;
}
export const roomLabels: Record<RoomType, string> = {
  living: '거실',
  bedroom: '침실',
  newlywed: '신혼집',
  other: '다른 공간',
};
export const goalLabels: Record<Goal, string> = {
  daylight: '자연광 살리기',
  blackout: '암막·빛 차단',
  privacy: '시선 보호',
  balanced: '빛 조절',
  unsure: '상담에서 결정',
};
export const moodLabels: Record<Mood, string> = {
  natural: '내추럴',
  hotel: '호텔처럼 아늑하게',
  minimal: '모던 & 심플',
  unsure: '아직 잘 모르겠어요',
};
