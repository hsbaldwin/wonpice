import { DRAFT_KEY, SAVED_KEY, isQuote, parseDraft, parseSaved } from './quote';
import type { QuoteDocument } from './types';

export const SINGLE_QUOTE_KEY = 'masters:quote-current:v1';

type QuoteStorage = Pick<Storage, 'getItem' | 'setItem'>;
type StorageAccess = () => QuoteStorage;
export interface SingleQuoteAccessState {
  ready: boolean;
  blocked: boolean;
  /** Explicitly confirmed reset; still subject to the ready/blocked guards. */
  replace?: boolean;
}
export interface SingleQuoteReadResult {
  document: QuoteDocument | null;
  ready: true;
  blocked: boolean;
}
export type SingleQuoteWriteResult = 'saved' | 'pending' | 'blocked' | 'unavailable' | 'outdated';

/** Edits remain strictly newer even within one millisecond or after clock changes. */
export function nextQuoteUpdatedAt(previous: QuoteDocument, stored?: QuoteDocument | null): string {
  return new Date(
    Math.max(
      Date.now(),
      Date.parse(previous.updatedAt) + 1,
      stored ? Date.parse(stored.updatedAt) + 1 : 0,
    ),
  ).toISOString();
}

/** Include partial/invalid input: migration must not discard work still being edited. */
export function hasQuoteInput(document: QuoteDocument): boolean {
  if (document.name.trim() && document.name.trim() !== '우리 집 커튼') return true;
  if (document.rooms.length > 1) return true;
  if (document.inquiry?.curtainCount.trim() || document.inquiry?.blindCount.trim()) return true;
  return document.rooms.some(
    (room) =>
      !!room.name.trim() ||
      !!room.needs?.length ||
      room.goal !== 'unsure' ||
      room.mood !== 'unsure' ||
      room.windows.length > 1 ||
      room.windows.some(
        (window) =>
          !!window.width.trim() ||
          !!window.height.trim() ||
          window.basis !== 'window' ||
          window.accuracy !== 'approximate',
      ),
  );
}

function parseDocument(raw: string): QuoteDocument {
  const document = parseDraft(raw);
  if (!document) throw Error('저장된 견적을 읽을 수 없습니다.');
  return document;
}

/** The current key is authoritative, including an intentionally empty reset document. */
export function readSingleQuote(access: StorageAccess): SingleQuoteReadResult {
  try {
    const storage = access();
    const current = storage.getItem(SINGLE_QUOTE_KEY);
    if (current !== null) return { document: parseDocument(current), ready: true, blocked: false };

    const draftRaw = storage.getItem(DRAFT_KEY);
    const draft = draftRaw === null ? null : parseDocument(draftRaw);
    const savedRaw = storage.getItem(SAVED_KEY);
    if (savedRaw !== null && !savedRaw.trim()) throw Error('기존 견적을 읽을 수 없습니다.');
    const saved = parseSaved(savedRaw);
    let document = draft && hasQuoteInput(draft) ? draft : null;
    for (const candidate of saved) {
      if (
        hasQuoteInput(candidate) &&
        (!document || Date.parse(candidate.updatedAt) > Date.parse(document.updatedAt))
      )
        document = { ...candidate, step: 3 };
    }
    return { document, ready: true, blocked: false };
  } catch {
    // An unreadable record cannot be treated as an empty, writable store.
    return { document: null, ready: true, blocked: true };
  }
}

/** Write only the current key. Legacy records and the caller's in-memory document stay intact. */
export function writeSingleQuote(
  access: StorageAccess,
  document: QuoteDocument,
  state: SingleQuoteAccessState,
): SingleQuoteWriteResult {
  if (!state.ready) return 'pending';
  if (state.blocked) return 'blocked';
  try {
    if (!isQuote(document)) return 'unavailable';
    const serialized = JSON.stringify(document);
    const storage = access();
    if (!state.replace) {
      const raw = storage.getItem(SINGLE_QUOTE_KEY);
      if (raw !== null) {
        const current = parseDocument(raw);
        // A stale pagehide flush must not replace another tab's newer input or reset.
        // This is a read-before-write check, not an atomic cross-tab transaction.
        const currentTime = Date.parse(current.updatedAt);
        const incomingTime = Date.parse(document.updatedAt);
        if (
          currentTime > incomingTime ||
          (currentTime === incomingTime && JSON.stringify(current) !== serialized)
        )
          return 'outdated';
      }
    }
    storage.setItem(SINGLE_QUOTE_KEY, serialized);
    return 'saved';
  } catch {
    return 'unavailable';
  }
}
