import { analyticsEnabled } from './analytics-config';
import { track } from './analytics-client';
import type { EventName } from './types';

type Milestone = Exclude<EventName, 'affiliate_outbound'>;

/** Each threshold is emitted once per page observation, independent of timer frequency. */
export function engagementMeter(emit: (type: Milestone) => void) {
  let elapsed = 0;
  const sent = new Set<Milestone>();
  const once = (type: Milestone) => {
    if (!sent.has(type)) {
      sent.add(type);
      emit(type);
    }
  };
  return {
    active(milliseconds: number) {
      if (!Number.isFinite(milliseconds) || milliseconds <= 0) return;
      elapsed += milliseconds;
      if (elapsed >= 30_000) once('page_active_30s');
      if (elapsed >= 60_000) once('page_active_60s');
    },
    scroll(top: number, scrollable: number) {
      if (!Number.isFinite(top) || !Number.isFinite(scrollable) || scrollable <= 0) return;
      for (const threshold of [25, 50, 75, 90] as const)
        if (top > 0 && (top / scrollable) * 100 >= threshold) once(`page_scroll_${threshold}`);
    },
  };
}

export function observePageEngagement(path: string) {
  if (!analyticsEnabled() || path.startsWith('/admin')) return;
  const meter = engagementMeter((type) => track(type, {}, path));
  let last = performance.now();
  let onPage = true;
  let active = document.visibilityState === 'visible' && document.hasFocus();
  // This marker keeps historical page views out of the new engagement denominator.
  track('page_engagement_start', {}, path);
  const tick = () => {
    const now = performance.now();
    // Sleep / long task gaps are unobserved, so never assume they were reading time.
    if (active && onPage) meter.active(Math.min(now - last, 1500));
    last = now;
  };
  const visibility = () => {
    tick();
    active = document.visibilityState === 'visible' && document.hasFocus();
  };
  const hide = () => {
    tick();
    onPage = false;
  };
  const show = () => {
    last = performance.now();
    onPage = true;
    visibility();
  };
  const scroll = () => {
    if (!onPage || document.visibilityState !== 'visible') return;
    meter.scroll(window.scrollY, document.documentElement.scrollHeight - window.innerHeight);
  };
  const timer = window.setInterval(tick, 1000);
  document.addEventListener('visibilitychange', visibility);
  window.addEventListener('focus', visibility);
  window.addEventListener('blur', visibility);
  window.addEventListener('pagehide', hide);
  window.addEventListener('pageshow', show);
  window.addEventListener('scroll', scroll, { passive: true });
  return () => {
    tick();
    window.clearInterval(timer);
    document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('focus', visibility);
    window.removeEventListener('blur', visibility);
    window.removeEventListener('pagehide', hide);
    window.removeEventListener('pageshow', show);
    window.removeEventListener('scroll', scroll);
  };
}
