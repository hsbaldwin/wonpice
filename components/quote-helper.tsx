'use client';
import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowRight, ArrowLeft, ArrowUpRight, RotateCcw } from 'lucide-react';
import { QuoteDocument, Room, CurtainNeed, goalLabels, roomLabels } from '@/lib/types';
import { newQuote, validateRooms } from '@/lib/quote';
import { selectedNeeds } from '@/lib/recommend';
import { clampWindowIndex, firstInvalidMeasurement } from '@/lib/helper-navigation';
import { track } from '@/lib/analytics-client';
import { AffiliateLink } from './affiliate-link';
import { SelectMenu } from './select-menu';
import { MeasurementKeypad } from './measurement-keypad';
import {
  SINGLE_QUOTE_KEY,
  hasQuoteInput,
  nextQuoteUpdatedAt,
  readSingleQuote,
  writeSingleQuote,
} from '@/lib/single-quote-storage';

const initial: QuoteDocument = {
  version: 1,
  id: 'initial',
  name: '우리 집 커튼',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  step: 1,
  inputMode: 'measurements',
  rooms: [
    {
      id: 'initial-room',
      name: '',
      type: 'living',
      goal: 'unsure',
      mood: 'unsure',
      needs: [],
      windows: [
        { id: 'initial-window', width: '', height: '', basis: 'window', accuracy: 'approximate' },
      ],
    },
  ],
};
const needsOptions: { id: CurtainNeed }[] = [
  { id: 'daylight' },
  { id: 'blackout' },
  { id: 'privacy' },
  { id: 'balanced' },
];
const stepCopy = {
  1: {
    title: '창 크기를 알려주세요.',
    description: '알고 있는 가로·세로를 입력해주세요. 대략적인 치수도 괜찮아요.',
  },
  2: {
    title: '어떤 기능이 필요한가요?',
    description: '필요한 기능을 하나 이상 골라주세요. 여러 개를 선택할 수 있어요.',
  },
  3: {
    title: '문의 준비가 되었어요.',
    description: '입력한 치수와 기능을 확인하세요.',
  },
};
function prepareMeasurementQuote(value: QuoteDocument): QuoteDocument {
  const document: QuoteDocument = {
    ...value,
    inputMode: 'measurements',
    rooms: value.rooms.map((room) => ({ ...room, needs: [...selectedNeeds(room)] })),
  };
  if (document.step !== 1 && Object.keys(validateRooms(document.rooms)).length) document.step = 1;
  if (document.step === 3 && document.rooms.some((room) => !selectedNeeds(room).length))
    document.step = 2;
  if (JSON.stringify(document) !== JSON.stringify(value))
    document.updatedAt = nextQuoteUpdatedAt(value);
  return document;
}

export function QuoteHelper() {
  const [doc, setDoc] = useState<QuoteDocument>(initial);
  const [ready, setReady] = useState(false);
  const [entered, setEntered] = useState(false);
  const [active, setActive] = useState(0);
  const [activeWindow, setActiveWindow] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [storageError, setStorageError] = useState('');
  const [blocked, setBlocked] = useState(false);
  const [useKeypad, setUseKeypad] = useState(false);
  const [keypadField, setKeypadField] = useState<'width' | 'height' | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(any-pointer: coarse), (max-width: 767px)');
    const update = () => {
      setUseKeypad(media.matches);
      if (!media.matches) setKeypadField(null);
    };
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const started = useRef(false);
  const panel = useRef<HTMLDivElement>(null);
  const focusStep = useRef(false);
  const invalidFocus = useRef<string | null>(null);
  const activeTransition = useRef<ViewTransition | null>(null);
  const latestQuote = useRef({ doc, ready, blocked });
  latestQuote.current = { doc, ready, blocked };

  useEffect(
    () => () => {
      activeTransition.current?.skipTransition();
      document.documentElement.removeAttribute('data-helper-transition');
    },
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const requestedRoom = params.get('room');
    const preset = ['living', 'bedroom', 'newlywed', 'other'].includes(requestedRoom || '')
      ? (requestedRoom as Room['type'])
      : undefined;
    const restored = readSingleQuote(() => localStorage);
    const current = prepareMeasurementQuote(restored.document || newQuote(preset));
    setDoc(current);
    if (!restored.blocked && current.step === 3) setEntered(true);
    setBlocked(restored.blocked);
    if (restored.blocked)
      setStorageError('저장된 견적을 읽지 못했어요. 새로 작성으로 다시 시작할 수 있어요.');
    // Existing bookmarks now open the one current quote, never an older snapshot.
    if (params.has('open') || params.get('view') === 'saved') {
      setEntered(true);
      const url = new URL(location.href);
      url.searchParams.delete('open');
      url.searchParams.delete('view');
      window.history.replaceState(
        window.history.state,
        '',
        `${url.pathname}${url.search}${url.hash}`,
      );
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && !blocked) persistLatestQuote();
  }, [doc, ready, blocked]);
  useEffect(() => {
    const flush = () => persistLatestQuote();
    const hidden = () => {
      if (document.visibilityState === 'hidden') flush();
    };
    const changed = (event: StorageEvent) => {
      if (latestQuote.current.ready && (event.key === SINGLE_QUOTE_KEY || event.key === null))
        restoreCurrentQuote();
    };
    window.addEventListener('pagehide', flush);
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('storage', changed);
    return () => {
      const latest = latestQuote.current;
      writeSingleQuote(() => localStorage, latest.doc, latest);
      window.removeEventListener('pagehide', flush);
      document.removeEventListener('visibilitychange', hidden);
      window.removeEventListener('storage', changed);
    };
  }, []);
  useEffect(() => {
    if (invalidFocus.current) {
      document.getElementById(invalidFocus.current)?.focus({ preventScroll: true });
      invalidFocus.current = null;
    } else if (focusStep.current) {
      panel.current
        ?.querySelector<HTMLElement>('[data-step-heading]')
        ?.focus({ preventScroll: true });
      focusStep.current = false;
    }
  }, [doc.step, errors, active, activeWindow, entered]);

  const step = doc.step;
  const room = doc.rooms[active] || doc.rooms[0];
  const windowIndex = clampWindowIndex(activeWindow, room.windows.length);
  const measurement = room.windows[windowIndex];
  const needs = selectedNeeds(room);
  const copy = stepCopy[step];

  function restoreCurrentQuote() {
    const restored = readSingleQuote(() => localStorage);
    if (restored.blocked) {
      setBlocked(true);
      setStorageError('저장된 견적을 읽지 못했어요. 새로 작성으로 다시 시작할 수 있어요.');
      return;
    }
    const current = prepareMeasurementQuote(restored.document || newQuote());
    const latest = latestQuote.current;
    if (
      (!latest.blocked || hasQuoteInput(latest.doc)) &&
      Date.parse(current.updatedAt) < Date.parse(latest.doc.updatedAt)
    )
      return;
    latestQuote.current = { doc: current, ready: true, blocked: false };
    setDoc(current);
    setBlocked(false);
    setStorageError('');
    setActive(0);
    setActiveWindow(0);
    setErrors({});
  }
  function persistLatestQuote() {
    const latest = latestQuote.current;
    const result = writeSingleQuote(() => localStorage, latest.doc, latest);
    if (result === 'outdated') restoreCurrentQuote();
    else if (result === 'unavailable')
      setStorageError('자동 저장을 사용할 수 없어요. 브라우저 저장 공간을 확인해주세요.');
    else if (result === 'saved') setStorageError('');
  }
  function transitionHelper(update: () => void) {
    if (activeTransition.current) return;
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      update();
      return;
    }
    document.documentElement.setAttribute('data-helper-transition', '');
    try {
      const transition = document.startViewTransition(() => flushSync(update));
      activeTransition.current = transition;
      // A hidden tab or an interrupted snapshot can skip the visual effect;
      // the state update still completes and must never be replayed.
      void transition.ready.catch(() => {});
      void transition.finished
        .finally(() => {
          if (activeTransition.current === transition) {
            activeTransition.current = null;
            document.documentElement.removeAttribute('data-helper-transition');
          }
        })
        .catch(() => {});
    } catch {
      document.documentElement.removeAttribute('data-helper-transition');
      update();
    }
  }
  function enterHelper() {
    if (!ready || entered) return;
    transitionHelper(() => {
      setActive(0);
      setActiveWindow(0);
      focusStep.current = true;
      setEntered(true);
      ensureStarted();
    });
  }
  function ensureStarted() {
    if (!started.current) {
      track('helper_start');
      started.current = true;
    }
  }
  function change(updater: (value: QuoteDocument) => QuoteDocument) {
    if (!ready) return;
    ensureStarted();
    setDoc((value) => ({
      ...updater(value),
      updatedAt: nextQuoteUpdatedAt(value),
      recommendations: undefined,
    }));
  }
  function patchRoom(patch: Partial<Room>) {
    change((value) => ({
      ...value,
      rooms: value.rooms.map((item, i) => (i === active ? { ...item, ...patch } : item)),
    }));
  }
  function move(step: QuoteDocument['step']) {
    transitionHelper(() => {
      focusStep.current = true;
      setDoc((value) => ({ ...value, step, updatedAt: nextQuoteUpdatedAt(value) }));
    });
  }
  function validate() {
    const validation = validateRooms(doc.rooms);
    setErrors(validation);
    if (Object.keys(validation).length) {
      const invalid = firstInvalidMeasurement(doc.rooms, validation);
      if (invalid) {
        setActive(invalid.roomIndex);
        setActiveWindow(invalid.windowIndex);
        invalidFocus.current = invalid.inputId;
      }
      focusStep.current = false;
      setDoc((value) => ({ ...value, step: 1, updatedAt: nextQuoteUpdatedAt(value) }));
      return false;
    }
    return true;
  }
  function next() {
    if (ready && validate()) {
      ensureStarted();
      move(2);
    }
  }
  function finishMeasurementInput() {
    const input = document.activeElement;
    if (!(input instanceof HTMLInputElement)) return false;
    if (input.id === `${measurement.id}-width`) {
      document.getElementById(`${measurement.id}-height`)?.focus({ preventScroll: true });
      return true;
    }
    if (input.id === `${measurement.id}-height`) {
      input.blur();
      return true;
    }
    return false;
  }
  function result() {
    if (!ready || !validate()) return;
    const missing = doc.rooms.findIndex((room) => !selectedNeeds(room).length);
    if (missing !== -1) {
      const missingRoom = doc.rooms[missing];
      setActive(missing);
      setErrors({
        [`${missingRoom.id}-needs`]: '필요한 기능을 하나 이상 선택해주세요.',
      });
      invalidFocus.current = `${missingRoom.id}-need-daylight`;
      return;
    }
    ensureStarted();
    move(3);
    track('helper_complete');
  }
  function reset() {
    if (!ready) return;
    transitionHelper(() => {
      const fresh = newQuote();
      fresh.updatedAt = nextQuoteUpdatedAt(doc, readSingleQuote(() => localStorage).document);
      const saved = writeSingleQuote(() => localStorage, fresh, {
        ready: true,
        blocked: false,
        replace: true,
      });
      latestQuote.current = { doc: fresh, ready: true, blocked: false };
      setBlocked(false);
      setStorageError(saved === 'saved' ? '' : '브라우저 저장을 사용할 수 없어요.');
      setDoc(fresh);
      setEntered(true);
      setActive(0);
      setActiveWindow(0);
      setErrors({});
      focusStep.current = true;
      started.current = false;
    });
  }
  const windowPicker =
    doc.rooms.length > 1 || room.windows.length > 1 ? (
      <div className="inquiry-select inquiry-room-picker">
        <span>{step === 3 ? '확인할 창' : '입력할 창'}</span>
        <SelectMenu
          label={step === 3 ? '확인할 창' : '입력할 창'}
          value={`${active}-${windowIndex}`}
          onChange={(value) => {
            const [roomIndex, nextWindow] = value.split('-').map(Number);
            setActive(roomIndex);
            setActiveWindow(nextWindow);
            setErrors({});
          }}
          options={doc.rooms.flatMap((r, roomIndex) =>
            r.windows.map((w, index) => ({
              value: `${roomIndex}-${index}`,
              label: `${r.name || roomLabels[r.type]} · 창 ${index + 1}`,
            })),
          )}
        />
      </div>
    ) : null;
  const measurementErrors = (['width', 'height'] as const).filter(
    (key) => errors[`${measurement.id}-${key}`],
  );
  const needsRoomPicker =
    doc.rooms.length > 1 ? (
      <div className="inquiry-select inquiry-room-picker">
        <span>공간</span>
        <SelectMenu
          label="기능을 정할 공간"
          value={String(active)}
          onChange={(value) => {
            setActive(Number(value));
            setActiveWindow(0);
          }}
          options={doc.rooms.map((r, index) => ({
            value: String(index),
            label: r.name || roomLabels[r.type],
          }))}
        />
      </div>
    ) : null;

  return (
    <section
      id="helper"
      className={`helper-fit inquiry-helper${!entered ? ' is-welcome' : ''}`}
      aria-label="커튼·블라인드 견적 도우미"
    >
      {entered && (
        <div className="inquiry-toolbar">
          <button
            type="button"
            className="button inquiry-home"
            disabled={!ready}
            onClick={() => {
              transitionHelper(() => {
                focusStep.current = true;
                setErrors({});
                setEntered(false);
              });
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" /> 처음으로
          </button>
        </div>
      )}
      {!entered ? (
        <div id="helper-panel-draft" className="inquiry-panel inquiry-welcome" ref={panel}>
          <div className="inquiry-welcome-copy">
            <p className="inquiry-step">맞춤커튼, 문의 전 간단한 준비</p>
            <h1 tabIndex={-1} data-step-heading>
              우리 집 견적을 <br />
              미리 정리해보세요.
            </h1>
            <button
              type="button"
              className="button button-primary inquiry-start"
              disabled={!ready}
              onClick={enterHelper}
            >
              시작하기 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div id="helper-panel-draft" className="inquiry-panel" ref={panel}>
          <header className="inquiry-heading">
            <h1 tabIndex={-1} data-step-heading>
              {copy.title}
            </h1>
            {step === 1 && measurementErrors.length > 0 ? (
              <p id="measurement-error" className="inquiry-error" role="alert">
                {measurementErrors.length > 1
                  ? '가로·세로를 cm 단위의 숫자로 입력해주세요.'
                  : errors[`${measurement.id}-${measurementErrors[0]}`]}
              </p>
            ) : (
              <p>{copy.description}</p>
            )}
          </header>
          <div className={`inquiry-content step-${step}`}>
            {step === 1 ? (
              <form
                key="measurements"
                className="inquiry-screen"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  // Some virtual keyboards submit without sending a keydown.
                  if (!finishMeasurementInput()) next();
                }}
              >
                <div className="inquiry-body">
                  {windowPicker}
                  <div className="inquiry-measure-settings">
                    {(
                      [
                        {
                          key: 'basis',
                          label: '측정 기준',
                          options: [
                            { value: 'window', label: '창문 기준' },
                            { value: 'installation', label: '설치 범위' },
                          ],
                        },
                        {
                          key: 'accuracy',
                          label: '측정 상태',
                          options: [
                            { value: 'approximate', label: '대략값' },
                            { value: 'measured', label: '실측값' },
                          ],
                        },
                      ] as const
                    ).map((setting) => (
                      <fieldset
                        className="inquiry-measure-choice"
                        key={setting.key}
                        disabled={!ready}
                      >
                        <legend>{setting.label}</legend>
                        <div className="inquiry-segments">
                          {setting.options.map((option) => (
                            <label className="inquiry-segment" key={option.value}>
                              <input
                                type="radio"
                                name={`${measurement.id}-${setting.key}`}
                                value={option.value}
                                checked={measurement[setting.key] === option.value}
                                onChange={() =>
                                  patchRoom({
                                    windows: room.windows.map((w) =>
                                      w.id === measurement.id
                                        ? {
                                            ...w,
                                            ...(setting.key === 'basis'
                                              ? { basis: option.value as 'window' | 'installation' }
                                              : {
                                                  accuracy: option.value as
                                                    'approximate' | 'measured',
                                                }),
                                          }
                                        : w,
                                    ),
                                  })
                                }
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    ))}
                  </div>
                  <div className="inquiry-size-fields" key={measurement.id}>
                    {(['width', 'height'] as const).map((key) => (
                      <div key={key} className="inquiry-size-field">
                        <div className="inquiry-size-label">
                          <label htmlFor={`${measurement.id}-${key}`}>
                            {key === 'width' ? '가로' : '세로'}
                          </label>
                        </div>
                        <div
                          className={`inquiry-size-input${errors[`${measurement.id}-${key}`] ? ' invalid' : ''}`}
                        >
                          <input
                            id={`${measurement.id}-${key}`}
                            aria-label={`${key === 'width' ? '가로' : '세로'} cm`}
                            inputMode={useKeypad ? 'none' : 'decimal'}
                            readOnly={useKeypad}
                            aria-haspopup={useKeypad ? 'dialog' : undefined}
                            onClick={() => {
                              if (useKeypad) setKeypadField(key);
                            }}
                            enterKeyHint={key === 'width' ? 'next' : 'done'}
                            autoComplete="off"
                            maxLength={20}
                            placeholder={key === 'width' ? '예: 360' : '예: 240'}
                            onKeyDown={(event) => {
                              if (useKeypad && (event.key === 'Enter' || event.key === ' ')) {
                                event.preventDefault();
                                setKeypadField(key);
                                return;
                              }
                              if (event.key !== 'Enter' || event.nativeEvent.isComposing) return;
                              event.preventDefault();
                              finishMeasurementInput();
                            }}
                            value={measurement[key]}
                            disabled={!ready}
                            aria-invalid={Boolean(errors[`${measurement.id}-${key}`])}
                            aria-describedby={
                              errors[`${measurement.id}-${key}`] ? 'measurement-error' : undefined
                            }
                            onChange={(e) => {
                              patchRoom({
                                windows: room.windows.map((w) =>
                                  w.id === measurement.id ? { ...w, [key]: e.target.value } : w,
                                ),
                              });
                              setErrors({});
                            }}
                          />
                          <span>cm</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="inquiry-actions">
                  <button
                    className="button button-primary"
                    disabled={!ready}
                    type="submit"
                    onClick={(event) => {
                      event.preventDefault();
                      // An implicit submit can also activate the default button.
                      // A real tap/click continues even if the browser keeps input focus.
                      if (event.detail === 0 && finishMeasurementInput()) return;
                      next();
                    }}
                  >
                    다음 <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : step === 2 ? (
              <form
                key="needs"
                className="inquiry-screen"
                onSubmit={(e) => {
                  e.preventDefault();
                  result();
                }}
              >
                <div className="inquiry-body">
                  {needsRoomPicker}
                  <fieldset
                    className="inquiry-needs-field"
                    aria-describedby={errors[`${room.id}-needs`] ? 'needs-error' : undefined}
                    aria-invalid={Boolean(errors[`${room.id}-needs`])}
                  >
                    <legend>
                      필요한 기능 <span>필수 · 1개 이상 선택</span>
                    </legend>
                    <div className="inquiry-options inquiry-needs-options">
                      {needsOptions.map((option) => (
                        <label
                          key={option.id}
                          className={needs.includes(option.id) ? 'selected' : ''}
                        >
                          <input
                            id={`${room.id}-need-${option.id}`}
                            type="checkbox"
                            checked={needs.includes(option.id)}
                            onChange={() => {
                              patchRoom({
                                needs: needs.includes(option.id)
                                  ? needs.filter((need) => need !== option.id)
                                  : [...needs, option.id],
                              });
                              setErrors({});
                            }}
                          />
                          <span>
                            <strong>{goalLabels[option.id]}</strong>
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  {errors[`${room.id}-needs`] && (
                    <p id="needs-error" className="inquiry-error" role="alert">
                      {errors[`${room.id}-needs`]}
                    </p>
                  )}
                </div>
                <div className="inquiry-actions">
                  <button type="button" className="button button-secondary" onClick={() => move(1)}>
                    <ArrowLeft size={16} /> 이전
                  </button>
                  <button className="button button-primary" type="submit">
                    저장 <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="inquiry-screen inquiry-result">
                <div className="inquiry-body">
                  {windowPicker}
                  <dl className="inquiry-overview">
                    <div>
                      <dt>창 크기</dt>
                      <dd>
                        <strong>
                          {measurement.width && measurement.height
                            ? `${measurement.width} × ${measurement.height} cm`
                            : '치수 기록 없음'}
                        </strong>
                        <small>
                          {measurement.width && measurement.height
                            ? `${measurement.basis === 'window' ? '창문 기준' : '설치 범위'} · ${measurement.accuracy === 'measured' ? '직접 실측' : '대략적인 치수'}`
                            : '상담에서 치수를 확인해주세요.'}
                        </small>
                      </dd>
                    </div>
                    <div>
                      <dt>필요한 기능</dt>
                      <dd>
                        {needs.length
                          ? needs.map((need) => goalLabels[need]).join(' · ')
                          : '상담에서 결정'}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="inquiry-actions inquiry-final-actions">
                  <button
                    type="button"
                    className="button inquiry-restart"
                    disabled={!ready}
                    onClick={reset}
                  >
                    <RotateCcw size={16} aria-hidden="true" /> 새로 작성
                  </button>
                  <AffiliateLink cta="home-result" className="button button-primary">
                    견적 문의 <ArrowUpRight size={16} />
                  </AffiliateLink>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {entered && step === 1 && keypadField && (
        <MeasurementKeypad
          field={keypadField}
          values={{ width: measurement.width, height: measurement.height }}
          onField={setKeypadField}
          onChange={(field, value) => {
            patchRoom({
              windows: room.windows.map((w) =>
                w.id === measurement.id ? { ...w, [field]: value } : w,
              ),
            });
            setErrors({});
          }}
          onClose={() => setKeypadField(null)}
        />
      )}
      {entered && storageError && (
        <div className="inquiry-status" role="status">
          <span>
            <span className="status-dot warning" />
            {storageError}
          </span>
        </div>
      )}
      <noscript>
        <p>
          도우미는 JavaScript가 필요합니다.{' '}
          <a href="/go/quote?cta=home-direct" target="_blank" rel="sponsored noopener">
            바로 견적 문의하기
          </a>
        </p>
      </noscript>
    </section>
  );
}
