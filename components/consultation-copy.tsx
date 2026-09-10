'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { track } from '@/lib/analytics-client';

export function ConsultationCopy({
  text,
  title = '상담할 내용을 복사해 준비하세요',
  cta,
  category,
  compact = false,
}: {
  text: string;
  title?: string;
  cta: string;
  category?: string;
  compact?: boolean;
}) {
  const id = useId();
  const textarea = useRef<HTMLTextAreaElement>(null);
  const active = useRef(false);
  const request = useRef(0);
  const busy = useRef(false);
  const currentText = useRef(text);
  currentText.current = text;
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'manual'>('idle');

  useEffect(() => {
    active.current = true;
    setReady(true);
    return () => {
      active.current = false;
      request.current += 1;
      busy.current = false;
    };
  }, []);

  useEffect(() => {
    request.current += 1;
    busy.current = false;
    setStatus('idle');
  }, [text]);

  async function copy() {
    if (busy.current) return;
    busy.current = true;
    const attempt = ++request.current;
    const value = text;
    setStatus('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      if (!active.current || request.current !== attempt || currentText.current !== value) return;
      busy.current = false;
      setStatus('copied');
      try {
        track('consultation_copy', { cta, category });
      } catch {
        // Copying succeeds independently of optional analytics.
      }
    } catch {
      if (!active.current || request.current !== attempt || currentText.current !== value) return;
      busy.current = false;
      setStatus('manual');
      textarea.current?.focus();
      textarea.current?.select();
    }
  }

  return (
    <section
      className={`consultation-copy${compact ? ' consultation-copy-compact' : ''}`}
      aria-labelledby={`${id}-title`}
    >
      {compact ? (
        <p id={`${id}-title`} className="consultation-copy-title">
          {title}
        </p>
      ) : (
        <h2 id={`${id}-title`}>{title}</h2>
      )}
      <p className="consultation-copy-description">
        복사한 문구를 메모장에 붙여 넣고 우리 집 조건에 맞게 수정하세요.
      </p>
      <label className="consultation-copy-label" htmlFor={`${id}-text`}>
        상담에 전달할 문구
      </label>
      <textarea
        ref={textarea}
        id={`${id}-text`}
        value={text}
        readOnly
        rows={compact ? 4 : Math.min(9, Math.max(5, text.split('\n').length))}
        spellCheck={false}
      />
      <div className="consultation-copy-actions">
        <button type="button" onClick={copy} disabled={!ready || status === 'copying'}>
          {status === 'copied' ? (
            <Check size={17} aria-hidden="true" />
          ) : (
            <Copy size={17} aria-hidden="true" />
          )}
          {status === 'copying' ? '복사 중…' : status === 'copied' ? '다시 복사' : '상담 문구 복사'}
        </button>
        <span role="status" aria-live="polite">
          {status === 'copied'
            ? '복사했습니다. 상담할 때 붙여 넣어 공유하세요.'
            : status === 'manual'
              ? '자동 복사를 사용할 수 없어 문구를 선택했습니다. 직접 복사해 주세요.'
              : ''}
        </span>
      </div>
      <p className="consultation-copy-note">
        복사한 내용은 견적 신청 양식에 자동 전달되지 않습니다.
      </p>
      <noscript>
        <p className="consultation-copy-note">문구를 직접 선택해 복사할 수 있습니다.</p>
      </noscript>
    </section>
  );
}
