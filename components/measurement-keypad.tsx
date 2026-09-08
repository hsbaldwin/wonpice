'use client';

import { useEffect, useRef, useState } from 'react';
import { Delete, X } from 'lucide-react';

type Field = 'width' | 'height';
export function MeasurementKeypad({
  field,
  values,
  onField,
  onChange,
  onClear,
  onClose,
}: {
  field: Field;
  values: Record<Field, string>;
  onField: (field: Field) => void;
  onChange: (field: Field, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [replace, setReplace] = useState(true);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    return () => element.close();
  }, []);
  function select(next: Field) {
    setReplace(true);
    onField(next);
  }
  function press(key: string) {
    const current = values[field];
    if (key === 'delete') {
      onChange(field, current.slice(0, -1));
    } else {
      const base = replace ? '' : current;
      if (key === '.' && base.includes('.')) return;
      const next = key === '.' && !base ? '0.' : base === '0' && key !== '.' ? key : base + key;
      if (next.length > 20) return;
      onChange(field, next);
    }
    setReplace(false);
  }
  function confirm() {
    if (field === 'width') select('height');
    else onClose();
  }
  return (
    <dialog
      ref={dialog}
      className="measurement-keypad"
      aria-labelledby="keypad-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (/^[0-9.]$/.test(event.key)) {
          event.preventDefault();
          press(event.key);
        } else if (event.key === 'Backspace') {
          event.preventDefault();
          press('delete');
        }
      }}
    >
      <div className="keypad-content">
        <div className="keypad-header">
          <h2 id="keypad-title">{field === 'width' ? '가로' : '세로'} 입력</h2>
          <button type="button" aria-label="키패드 닫기" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="keypad-values">
          {(['width', 'height'] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={field === key ? 'is-active' : ''}
              aria-label={`${key === 'width' ? '가로' : '세로'} 입력 선택`}
              aria-pressed={field === key}
              onClick={() => select(key)}
            >
              <span>{key === 'width' ? '가로' : '세로'}</span>
              <strong>
                {values[key] || '—'} <small>cm</small>
              </strong>
            </button>
          ))}
        </div>
        <div className="keypad-keys" aria-label="숫자 키패드">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'delete'].map((key) => (
            <button
              type="button"
              key={key}
              aria-label={key === 'delete' ? '한 자리 지우기' : key === '.' ? '소수점' : key}
              onClick={() => press(key)}
            >
              {key === 'delete' ? <Delete size={22} /> : key}
            </button>
          ))}
        </div>
        <div className="keypad-actions">
          <button
            type="button"
            onClick={() => {
              onClear();
              setReplace(false);
            }}
          >
            전체 지우기
          </button>
          <button type="button" className="keypad-confirm" onClick={confirm}>
            {field === 'width' ? '다음' : '완료'}
          </button>
        </div>
      </div>
    </dialog>
  );
}
