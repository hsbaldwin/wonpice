'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown } from 'lucide-react';
import './select-menu.css';

export type SelectMenuProps = {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

type MenuPosition = { top: number; left: number; width: number; maxHeight: number };

export function SelectMenu({ label, value, options, onChange, disabled, id }: SelectMenuProps) {
  const generatedId = useId();
  const triggerId = id || `select-menu-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;
  const trigger = useRef<HTMLButtonElement>(null);
  const listbox = useRef<HTMLUListElement>(null);
  const optionElements = useRef<(HTMLLIElement | null)[]>([]);
  const search = useRef('');
  const searchTimer = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedIndex];
  const inactive = disabled || options.length === 0;

  function show(index = selectedIndex >= 0 ? selectedIndex : 0) {
    if (inactive) return;
    setActiveIndex(Math.max(0, Math.min(index, options.length - 1)));
    setPosition(null);
    setOpen(true);
  }

  function select(index: number) {
    const option = options[index];
    if (option && option.value !== value) onChange(option.value);
    setOpen(false);
  }

  useEffect(() => {
    if (inactive) setOpen(false);
  }, [inactive]);

  useEffect(() => {
    if (!open) {
      search.current = '';
      window.clearTimeout(searchTimer.current);
      return () => window.clearTimeout(searchTimer.current);
    }
    const outside = (event: PointerEvent | FocusEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !trigger.current?.contains(target) &&
        !listbox.current?.contains(target)
      )
        setOpen(false);
    };
    document.addEventListener('pointerdown', outside, true);
    document.addEventListener('focusin', outside);
    return () => {
      document.removeEventListener('pointerdown', outside, true);
      document.removeEventListener('focusin', outside);
      window.clearTimeout(searchTimer.current);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!trigger.current || !listbox.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      if (anchor.width === 0 || anchor.height === 0) {
        setOpen(false);
        return;
      }
      const viewport = window.visualViewport;
      const viewportLeft = viewport?.offsetLeft || 0;
      const viewportTop = viewport?.offsetTop || 0;
      const viewportWidth = viewport?.width || document.documentElement.clientWidth;
      const viewportHeight = viewport?.height || window.innerHeight;
      const edge = 8;
      const gap = 6;
      const width = Math.min(Math.max(anchor.width, 160), Math.max(0, viewportWidth - edge * 2));
      const left = Math.max(
        viewportLeft + edge,
        Math.min(anchor.left, viewportLeft + viewportWidth - width - edge),
      );
      const below = Math.max(0, viewportTop + viewportHeight - edge - anchor.bottom - gap);
      const above = Math.max(0, anchor.top - gap - viewportTop - edge);
      const naturalHeight = listbox.current.scrollHeight + 2;
      const opensBelow = below >= Math.min(naturalHeight, 176) || below >= above;
      const maxHeight = Math.min(280, opensBelow ? below : above);
      const height = Math.min(naturalHeight, maxHeight);
      const top = Math.max(
        viewportTop + edge,
        Math.min(
          opensBelow ? anchor.bottom + gap : anchor.top - gap - height,
          viewportTop + viewportHeight - edge - height,
        ),
      );
      setPosition((previous) =>
        previous &&
        previous.top === top &&
        previous.left === left &&
        previous.width === width &&
        previous.maxHeight === maxHeight
          ? previous
          : { top, left, width, maxHeight },
      );
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('resize', schedule);
    document.addEventListener('scroll', schedule, true);
    window.visualViewport?.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('scroll', schedule);
    const observer = new ResizeObserver(schedule);
    if (trigger.current) observer.observe(trigger.current);
    if (listbox.current) observer.observe(listbox.current);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('scroll', schedule, true);
      window.visualViewport?.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('scroll', schedule);
      observer.disconnect();
    };
  }, [open, options.length, position?.width]);

  useLayoutEffect(() => {
    if (!open) return;
    if (activeIndex >= options.length) {
      setActiveIndex(Math.max(0, options.length - 1));
      return;
    }
    const menu = listbox.current;
    const option = optionElements.current[activeIndex];
    if (!menu || !option) return;
    if (option.offsetTop < menu.scrollTop) menu.scrollTop = option.offsetTop;
    else if (option.offsetTop + option.offsetHeight > menu.scrollTop + menu.clientHeight)
      menu.scrollTop = option.offsetTop + option.offsetHeight - menu.clientHeight;
  }, [open, activeIndex, options.length, position?.maxHeight, position?.width]);

  function keyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (inactive || event.nativeEvent.isComposing) return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        if (!open)
          show(
            selectedIndex >= 0 ? selectedIndex : event.key === 'ArrowUp' ? options.length - 1 : 0,
          );
        else
          setActiveIndex((current) =>
            Math.max(
              0,
              Math.min(options.length - 1, current + (event.key === 'ArrowDown' ? 1 : -1)),
            ),
          );
        return;
      }
      case 'Home':
      case 'End':
        event.preventDefault();
        if (!open) show(event.key === 'Home' ? 0 : options.length - 1);
        else setActiveIndex(event.key === 'Home' ? 0 : options.length - 1);
        return;
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (open) select(activeIndex);
        else show();
        return;
      case 'Escape':
        if (open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
        }
        return;
      case 'Tab':
        if (open) select(activeIndex);
        return;
    }
    if (event.key.length !== 1 || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const character = event.key.normalize('NFKC').toLocaleLowerCase();
    const typed = search.current + character;
    search.current = typed;
    window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      search.current = '';
    }, 700);
    const query = [...typed].every((letter) => letter === character) ? character : typed;
    const current = open ? activeIndex : selectedIndex;
    const start = Math.max(0, current + (query.length === 1 ? 1 : 0));
    for (let offset = 0; offset < options.length; offset++) {
      const index = (start + offset) % options.length;
      if (options[index].label.normalize('NFKC').trim().toLocaleLowerCase().startsWith(query)) {
        if (!open) show(index);
        else setActiveIndex(index);
        break;
      }
    }
  }

  return (
    <div className="select-menu">
      <button
        ref={trigger}
        id={triggerId}
        type="button"
        className="select-menu-trigger"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        disabled={inactive}
        onKeyDown={keyDown}
        onClick={() => (open ? setOpen(false) : show())}
      >
        <span className="select-menu-value" title={selectedOption?.label}>
          {selectedOption?.label || '선택해주세요'}
        </span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>
      {open &&
        createPortal(
          <ul
            ref={listbox}
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="select-menu-listbox"
            style={{
              top: position?.top || 0,
              left: position?.left || 0,
              width: position?.width || 160,
              maxHeight: position?.maxHeight ?? 280,
              visibility: position ? 'visible' : 'hidden',
            }}
            onMouseDown={(event) => event.preventDefault()}
          >
            {options.map((option, index) => (
              <li
                key={option.value}
                ref={(element) => {
                  optionElements.current[index] = element;
                }}
                id={`${listboxId}-option-${index}`}
                role="option"
                aria-selected={option.value === value}
                data-active={index === activeIndex || undefined}
                onPointerMove={() => setActiveIndex(index)}
                onClick={() => select(index)}
              >
                <span>{option.label}</span>
                {option.value === value && <Check size={16} aria-hidden="true" />}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
