import { QuoteDocument, QuoteInquiry, Room, RoomType, WindowMeasurement } from './types';
export const DRAFT_KEY = 'masters:quote-draft:v1';
export const SAVED_KEY = 'masters:quotes:v1';
export const SAVED_LIMIT_MESSAGE =
  '보관함에는 요청서를 50개까지 저장할 수 있어요. 기존 요청서를 정리한 뒤 다시 저장해주세요.';
export const newWindow = (): WindowMeasurement => ({
  id: crypto.randomUUID(),
  width: '',
  height: '',
  basis: 'window',
  accuracy: 'approximate',
});
export const newRoom = (type: RoomType = 'living'): Room => ({
  id: crypto.randomUUID(),
  name: '',
  type,
  windows: [newWindow()],
  goal: 'unsure',
  mood: 'unsure',
  needs: [],
});
export function newQuote(type: RoomType = 'living'): QuoteDocument {
  const now = new Date().toISOString();
  return {
    version: 1,
    id: crypto.randomUUID(),
    name: '우리 집 커튼',
    createdAt: now,
    updatedAt: now,
    rooms: [newRoom(type)],
    step: 1,
    inputMode: 'measurements',
  };
}
export function validateInquiry(inquiry?: QuoteInquiry): Record<string, string> {
  const errors: Record<string, string> = {};
  let total = 0;
  for (const key of ['curtainCount', 'blindCount'] as const) {
    const raw = inquiry?.[key].trim() ?? '';
    if (!raw) continue;
    if (!/^\d+$/.test(raw) || Number(raw) > 99) errors[key] = '0~99 사이의 정수로 입력해주세요.';
    else total += Number(raw);
  }
  if (!Object.keys(errors).length && total === 0)
    errors.curtainCount = '커튼이나 블라인드가 필요한 창문 수를 하나 이상 입력해주세요.';
  return errors;
}
export function validateRooms(rooms: Room[]): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!rooms.length) errors.rooms = '공간을 하나 이상 추가해주세요.';
  for (const room of rooms)
    for (const w of room.windows) {
      for (const key of ['width', 'height'] as const) {
        const raw = w[key].trim();
        const value = Number(raw);
        if (!raw)
          errors[`${w.id}-${key}`] = `${key === 'width' ? '가로' : '세로'} 크기를 입력해주세요.`;
        else if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw))
          errors[`${w.id}-${key}`] = '숫자와 소수점만 사용해주세요. 예: 360.5';
        else if (!Number.isFinite(value) || value <= 0)
          errors[`${w.id}-${key}`] = '0보다 큰 숫자로 입력해주세요.';
        else if (value > 2000)
          errors[`${w.id}-${key}`] = 'cm 단위인지 확인해주세요. 2,000cm 이내로 입력할 수 있어요.';
      }
    }
  return errors;
}
const record = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);
export function isQuote(value: unknown): value is QuoteDocument {
  if (
    !record(value) ||
    value.version !== 1 ||
    typeof value.id !== 'string' ||
    !value.id ||
    value.id.length > 100 ||
    typeof value.name !== 'string' ||
    value.name.length > 80 ||
    typeof value.createdAt !== 'string' ||
    typeof value.updatedAt !== 'string' ||
    typeof value.step !== 'number' ||
    ![1, 2, 3].includes(value.step) ||
    !Array.isArray(value.rooms) ||
    value.rooms.length < 1 ||
    value.rooms.length > 20
  )
    return false;
  if (value.inputMode !== undefined && value.inputMode !== 'measurements') return false;
  if (
    !Number.isFinite(Date.parse(value.createdAt)) ||
    !Number.isFinite(Date.parse(value.updatedAt))
  )
    return false;
  // Keep incomplete input editable without changing the existing v1 storage format.
  if (
    value.inquiry !== undefined &&
    (!record(value.inquiry) ||
      typeof value.inquiry.curtainCount !== 'string' ||
      value.inquiry.curtainCount.length > 20 ||
      typeof value.inquiry.blindCount !== 'string' ||
      value.inquiry.blindCount.length > 20)
  )
    return false;
  const ids = new Set<string>();
  return value.rooms.every((r) => {
    if (
      !record(r) ||
      typeof r.id !== 'string' ||
      !r.id ||
      r.id.length > 100 ||
      ids.has(r.id) ||
      typeof r.name !== 'string' ||
      r.name.length > 60 ||
      typeof r.type !== 'string' ||
      !['living', 'bedroom', 'newlywed', 'other'].includes(r.type) ||
      typeof r.goal !== 'string' ||
      !['daylight', 'blackout', 'privacy', 'balanced', 'unsure'].includes(r.goal) ||
      typeof r.mood !== 'string' ||
      !['natural', 'hotel', 'minimal', 'unsure'].includes(r.mood) ||
      !Array.isArray(r.windows) ||
      r.windows.length < 1 ||
      r.windows.length > 20
    )
      return false;
    if (
      r.needs !== undefined &&
      (!Array.isArray(r.needs) ||
        r.needs.length > 4 ||
        !r.needs.every((need) => ['daylight', 'blackout', 'privacy', 'balanced'].includes(need)) ||
        new Set(r.needs).size !== r.needs.length)
    )
      return false;
    ids.add(r.id);
    return r.windows.every((w) => {
      if (
        !record(w) ||
        typeof w.id !== 'string' ||
        !w.id ||
        w.id.length > 100 ||
        ids.has(w.id) ||
        typeof w.width !== 'string' ||
        w.width.length > 20 ||
        typeof w.height !== 'string' ||
        w.height.length > 20 ||
        typeof w.basis !== 'string' ||
        !['window', 'installation'].includes(w.basis) ||
        typeof w.accuracy !== 'string' ||
        !['approximate', 'measured'].includes(w.accuracy)
      )
        return false;
      ids.add(w.id);
      return true;
    });
  });
}
// Preserve measurements from drafts created while the retired choice was available.
function removeRetiredNeed(value: unknown): void {
  if (!record(value) || !Array.isArray(value.rooms)) return;
  for (const room of value.rooms) {
    if (
      record(room) &&
      Array.isArray(room.needs) &&
      room.needs.length === 1 &&
      room.needs[0] === 'unsure'
    )
      room.needs = [];
  }
}
export function parseDraft(raw: string | null): QuoteDocument | null {
  if (!raw) return null;
  const v: unknown = JSON.parse(raw);
  removeRetiredNeed(v);
  if (!isQuote(v)) throw Error('저장된 요청서 형식을 확인할 수 없습니다.');
  return v;
}
export function parseSaved(raw: string | null): QuoteDocument[] {
  if (!raw) return [];
  const v: unknown = JSON.parse(raw);
  if (Array.isArray(v)) v.forEach(removeRetiredNeed);
  if (!Array.isArray(v) || !v.every(isQuote)) throw Error('보관함을 읽을 수 없습니다.');
  return v;
}
export function upsertQuote(list: QuoteDocument[], doc: QuoteDocument) {
  if (list.length >= 50 && !list.some((q) => q.id === doc.id)) throw Error(SAVED_LIMIT_MESSAGE);
  return [doc, ...list.filter((q) => q.id !== doc.id)];
}
export function duplicateQuote(doc: QuoteDocument): QuoteDocument {
  const now = new Date().toISOString();
  return {
    ...doc,
    id: crypto.randomUUID(),
    name: `${doc.name.slice(0, 73)} 사본`,
    createdAt: now,
    updatedAt: now,
    ...(doc.inquiry ? { inquiry: { ...doc.inquiry } } : {}),
    rooms: doc.rooms.map((r) => ({
      ...r,
      id: crypto.randomUUID(),
      ...(r.needs ? { needs: [...r.needs] } : {}),
      windows: r.windows.map((w) => ({ ...w, id: crypto.randomUUID() })),
    })),
  };
}
