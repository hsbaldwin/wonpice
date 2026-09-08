'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Check,
  Copy,
  Download,
  LoaderCircle,
  Pencil,
  Trash2,
} from 'lucide-react';
import { goalLabels, type QuoteDocument } from '@/lib/types';
import {
  SAVED_KEY,
  SAVED_LIMIT_MESSAGE,
  parseSaved,
  duplicateQuote,
  upsertQuote,
} from '@/lib/quote';
import { recommend, recommendForInquiry, selectedNeeds } from '@/lib/recommend';
import { track } from '@/lib/analytics-client';
import { AffiliateLink } from './affiliate-link';

type SavedView = 'quotes' | 'rename' | 'delete' | 'message';
export function SavedQuotes({
  onOpen,
  onClose,
  onCreate,
}: {
  onOpen: (document: QuoteDocument) => string | void;
  onClose?: () => void;
  onCreate?: () => void;
}) {
  const [quotes, setQuotes] = useState<QuoteDocument[]>([]);
  const [selected, setSelected] = useState('');
  const [ready, setReady] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [view, setView] = useState<SavedView>('quotes');
  const [name, setName] = useState('');
  const [actionQuoteId, setActionQuoteId] = useState('');
  const content = useRef<HTMLDivElement>(null);
  const focusView = useRef(false);
  const quote = quotes.find((item) => item.id === selected) || quotes[0];
  const inquiry = quote?.inputMode === 'measurements' ? undefined : quote?.inquiry;
  const firstRoom = quote?.rooms[0];
  const firstWindow = firstRoom?.windows[0];
  const needs = firstRoom ? selectedNeeds(firstRoom) : [];
  const windowCount = quote?.rooms.reduce((count, room) => count + room.windows.length, 0) || 0;

  useEffect(() => {
    const read = () => {
      try {
        setQuotes(parseSaved(localStorage.getItem(SAVED_KEY)));
        setBlocked(false);
      } catch {
        setBlocked(true);
        setMessage('저장한 견적을 읽지 못했어요. 기존 저장 데이터는 변경하지 않았습니다.');
        setView('message');
      }
      setReady(true);
    };
    read();
    const onStorage = (event: StorageEvent) => {
      if (event.key === SAVED_KEY || event.key === null) read();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);
  useEffect(() => {
    if (!focusView.current) return;
    content.current
      ?.querySelector<HTMLElement>('[data-saved-focus]')
      ?.focus({ preventScroll: true });
    focusView.current = false;
  }, [view]);

  function show(next: SavedView) {
    focusView.current = true;
    setView(next);
  }
  function report(text: string) {
    setMessage(text);
    show('message');
  }
  function mutate(transform: (current: QuoteDocument[]) => QuoteDocument[]) {
    if (!ready || blocked) return false;
    try {
      // Read immediately before every mutation, preserving updates from other tabs.
      const current = parseSaved(localStorage.getItem(SAVED_KEY));
      const next = transform(current);
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      setQuotes(next);
      return true;
    } catch (error) {
      report(
        error instanceof Error && error.message === SAVED_LIMIT_MESSAGE
          ? SAVED_LIMIT_MESSAGE
          : '변경 내용을 저장하지 못했어요. 브라우저 저장 공간을 확인해주세요.',
      );
      return false;
    }
  }
  async function pdf(document: QuoteDocument) {
    setBusy(true);
    try {
      const { downloadQuotePdf } = await import('@/lib/pdf');
      await downloadQuotePdf({
        ...document,
        recommendations: document.rooms.map((room) =>
          document.inputMode === 'measurements'
            ? recommend(room)
            : recommendForInquiry(room, document.inquiry),
        ),
      });
      track('pdf_generated', { cta: 'saved-card' });
      report('PDF를 만들었어요. 브라우저의 다운로드를 확인해주세요.');
    } catch {
      report('PDF 생성에 실패했어요. 네트워크를 확인하고 다시 시도해주세요.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`helper-saved saved-view-${view}`} ref={content}>
      {!ready ? (
        <p className="helper-saved-message" role="status">
          저장한 견적을 불러오고 있어요.
        </p>
      ) : view === 'message' ? (
        <div className="helper-saved-message" role="status" tabIndex={-1} data-saved-focus>
          <InfoMark />
          <p>{message}</p>
          {!blocked && (
            <button className="text-button" onClick={() => show('quotes')}>
              저장한 견적 보기 <ArrowRight size={14} />
            </button>
          )}
        </div>
      ) : !quote ? (
        <div className="helper-saved-message" tabIndex={-1} data-saved-focus>
          <Bookmark size={28} strokeWidth={1.4} />
          <p>아직 저장한 견적이 없어요.</p>
          <p className="muted">견적을 저장하면 여기에서 다시 열 수 있어요.</p>
          {onCreate && (
            <button className="button button-primary" onClick={onCreate}>
              새 견적 작성 <ArrowRight size={15} />
            </button>
          )}
        </div>
      ) : view === 'rename' ? (
        <form
          className="helper-saved-edit"
          onSubmit={(event) => {
            event.preventDefault();
            if (
              mutate((current) =>
                current.map((item) =>
                  item.id === actionQuoteId
                    ? {
                        ...item,
                        name: name.trim() || '우리 집 커튼',
                        updatedAt: new Date().toISOString(),
                      }
                    : item,
                ),
              )
            )
              show('quotes');
          }}
        >
          <label className="document-title-label">
            요청서 이름
            <input
              data-saved-focus
              value={name}
              maxLength={80}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <div className="helper-saved-actions">
            <button
              className="button button-secondary"
              type="button"
              onClick={() => show('quotes')}
            >
              취소
            </button>
            <button className="button button-primary" type="submit">
              <Check size={15} /> 이름 저장
            </button>
          </div>
        </form>
      ) : view === 'delete' ? (
        <div className="helper-saved-message" role="group" aria-label="저장한 견적 삭제 확인">
          <p tabIndex={-1} data-saved-focus>
            선택한 요청서를 삭제할까요?
          </p>
          <p className="muted">작성 중인 요청서는 그대로 유지돼요.</p>
          <div className="helper-saved-actions">
            <button className="button button-secondary" onClick={() => show('quotes')}>
              취소
            </button>
            <button
              className="button button-secondary danger"
              onClick={() => {
                if (mutate((current) => current.filter((item) => item.id !== actionQuoteId))) {
                  setSelected('');
                  show('quotes');
                }
              }}
            >
              <Trash2 size={15} /> 삭제 확인
            </button>
          </div>
        </div>
      ) : (
        <>
          <label className="helper-saved-select">
            <span>요청서 {quotes.length}개</span>
            <select
              aria-label="저장한 견적 선택"
              value={quote.id}
              data-saved-focus
              onChange={(event) => setSelected(event.target.value)}
            >
              {quotes.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="helper-saved-summary">
            <p>
              {inquiry ? (
                <>
                  <strong>커튼 {inquiry.curtainCount || '0'}개</strong> · 블라인드{' '}
                  {inquiry.blindCount || '0'}개
                </>
              ) : (
                <>
                  <strong>
                    {firstWindow?.width || '미입력'} × {firstWindow?.height || '미입력'} cm
                  </strong>
                  {(quote.rooms.length > 1 || windowCount > 1) && (
                    <>
                      {' '}
                      · {quote.rooms.length}개 공간 · 창 {windowCount}개
                    </>
                  )}
                </>
              )}
            </p>
            {!inquiry && (
              <p>
                핵심 요구 · {needs.map((need) => goalLabels[need]).join(' · ') || '상담에서 결정'}
              </p>
            )}
            <time dateTime={quote.updatedAt}>
              {new Date(quote.updatedAt).toLocaleDateString('ko-KR')} 저장
            </time>
          </div>
          <div className="helper-saved-tools">
            <button
              className="text-button"
              onClick={() => {
                setName(quote.name);
                setActionQuoteId(quote.id);
                show('rename');
              }}
            >
              <Pencil size={14} /> 이름 변경
            </button>
            <button
              className="text-button"
              onClick={() => {
                const duplicate = duplicateQuote(quote);
                if (mutate((current) => upsertQuote(current, duplicate))) {
                  setSelected(duplicate.id);
                }
              }}
            >
              <Copy size={14} /> 복제
            </button>
            <button
              className="text-button danger"
              onClick={() => {
                setActionQuoteId(quote.id);
                show('delete');
              }}
            >
              <Trash2 size={14} /> 삭제
            </button>
          </div>
          <div className="helper-saved-actions">
            <button
              className="button button-primary"
              onClick={() => {
                const error = onOpen(quote);
                if (error) report(error);
              }}
            >
              열기·수정 <ArrowRight size={15} />
            </button>
            <button className="button button-secondary" disabled={busy} onClick={() => pdf(quote)}>
              {busy ? <LoaderCircle className="spin" size={15} /> : <Download size={15} />}
              PDF 받기
            </button>
          </div>
          <AffiliateLink cta="saved-card" className="text-button helper-saved-inquiry">
            견적 문의 <ArrowUpRight size={14} />
          </AffiliateLink>
        </>
      )}
      {onClose && (
        <button className="button button-secondary helper-saved-close" onClick={onClose}>
          <ArrowLeft size={16} /> 도우미로 돌아가기
        </button>
      )}
    </div>
  );
}
function InfoMark() {
  return <Bookmark size={28} strokeWidth={1.4} aria-hidden="true" />;
}
