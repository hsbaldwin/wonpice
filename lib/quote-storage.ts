import { DRAFT_KEY, parseDraft } from './quote';
import type { QuoteDocument } from './types';

type QuoteStorage = Pick<Storage, 'getItem' | 'setItem'>;
type StorageAccess = () => QuoteStorage;
export interface DraftAccessState {
  ready: boolean;
  blocked: boolean;
}
export interface DraftReadResult extends DraftAccessState {
  document: QuoteDocument | null;
}
export type DraftWriteResult = 'saved' | 'pending' | 'blocked' | 'unavailable';

/** Access is deferred because even the browser's localStorage getter may throw. */
export function readQuoteDraft(access: StorageAccess): DraftReadResult {
  try {
    return { ready: true, blocked: false, document: parseDraft(access().getItem(DRAFT_KEY)) };
  } catch {
    // A failed read must never be mistaken for an empty, writable store.
    return { ready: true, blocked: true, document: null };
  }
}

/** Never replaces the caller's in-memory document, including on quota failures. */
export function writeQuoteDraft(
  access: StorageAccess,
  document: QuoteDocument,
  state: DraftAccessState,
): DraftWriteResult {
  if (!state.ready) return 'pending';
  if (state.blocked) return 'blocked';
  try {
    access().setItem(DRAFT_KEY, JSON.stringify(document));
    return 'saved';
  } catch {
    return 'unavailable';
  }
}
