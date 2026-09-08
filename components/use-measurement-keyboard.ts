'use client';

import { useEffect } from 'react';

/** Restore the document on the keyboard's closing frame, without a debounce.
 * Works for Done, Enter, tapping outside, and keyboard dismissal with focus kept.
 */
export function useMeasurementKeyboard() {
  useEffect(() => {
    const viewport = window.visualViewport;
    let origin: { x: number; y: number; height: number; keyboardOpened: boolean } | null = null;
    let frame: number | undefined;
    let pending = false;
    const height = () => viewport?.height ?? window.innerHeight;
    const isMeasurement = (target: EventTarget | null) =>
      target instanceof HTMLInputElement && !!target.closest('#helper .inquiry-size-input');
    const cancel = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      origin = null;
      pending = false;
    };
    const capture = (event: Event) => {
      if (!isMeasurement(event.target)) return;
      if (!window.matchMedia('(any-pointer: coarse), (max-width: 767px)').matches) return;
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      pending = false;
      origin ??= { x: window.scrollX, y: window.scrollY, height: height(), keyboardOpened: false };
    };
    const restore = () => {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        if (!origin || !pending) return;
        // Never scroll the active input out of view while its keyboard is open.
        // The next viewport resize resumes this; there is no timer or polling.
        if (height() < origin.height - 80) return;
        const position = origin;
        cancel();
        window.scrollTo({ left: position.x, top: position.y, behavior: 'instant' });
      });
    };
    const finish = () => {
      if (!origin) return;
      pending = true;
      restore();
    };
    const blur = () => {
      // Focus can move directly from width to height without closing the keyboard.
      queueMicrotask(() => {
        if (!isMeasurement(document.activeElement)) finish();
      });
    };
    const resized = () => {
      if (!origin) return;
      if (height() < origin.height - 80) origin.keyboardOpened = true;
      if (origin.keyboardOpened && height() >= origin.height - 80) finish();
      else if (pending) restore();
    };
    const userScroll = () => {
      // A deliberate swipe always wins over restoring an earlier position.
      if (pending) cancel();
    };
    document.addEventListener('pointerdown', capture, true);
    document.addEventListener('focusin', capture);
    document.addEventListener('focusout', blur);
    document.addEventListener('touchmove', userScroll, { passive: true });
    document.addEventListener('wheel', userScroll, { passive: true });
    window.addEventListener('resize', resized);
    window.addEventListener('orientationchange', cancel);
    viewport?.addEventListener('resize', resized);
    return () => {
      cancel();
      document.removeEventListener('pointerdown', capture, true);
      document.removeEventListener('focusin', capture);
      document.removeEventListener('focusout', blur);
      document.removeEventListener('touchmove', userScroll);
      document.removeEventListener('wheel', userScroll);
      window.removeEventListener('resize', resized);
      window.removeEventListener('orientationchange', cancel);
      viewport?.removeEventListener('resize', resized);
    };
  }, []);
}
