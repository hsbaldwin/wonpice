import { analyticsEnabled } from './analytics-config';
import type { AnalyticsEvent, EventName } from './types';
const SESSION = 'masters:analytics-session';
const QUEUE = 'masters:analytics-queue';
const SOURCE = 'masters:analytics-source';
const LANDING = 'masters:analytics-landing';
let memoryLanding = '';
export function landingPath() {
  if (!analyticsEnabled() || typeof window === 'undefined') return '';
  try {
    const existing = sessionStorage.getItem(LANDING);
    if (existing) return existing;
    const path = location.pathname;
    sessionStorage.setItem(LANDING, path);
    return path;
  } catch {
    return (memoryLanding ||= location.pathname);
  }
}
let memorySession = '';
let flushing = false;
let memorySource = '';
export function sessionId() {
  if (!analyticsEnabled() || typeof window === 'undefined') return '';
  try {
    const old = sessionStorage.getItem(SESSION);
    if (old && /^[a-f0-9-]{36}$/i.test(old)) return old;
    const id = crypto.randomUUID();
    sessionStorage.setItem(SESSION, id);
    return id;
  } catch {
    return (memorySession ||= crypto.randomUUID());
  }
}
export function classifyReferrer(referrer: string, hostname: string) {
  if (!referrer) return 'direct';
  try {
    const h = new URL(referrer).hostname;
    if (h === hostname) return 'internal';
    if (
      h === 'google.com' ||
      h.endsWith('.google.com') ||
      /^www\.google\.(?:co\.[a-z]{2}|com\.[a-z]{2}|[a-z]{2})$/.test(h)
    )
      return 'google';
    if (h === 'naver.com' || h.endsWith('.naver.com')) return 'naver';
    return 'external';
  } catch {
    return 'direct';
  }
}
function source() {
  if (memorySource) return memorySource;
  try {
    const existing = sessionStorage.getItem(SOURCE);
    if (existing && ['direct', 'internal', 'google', 'naver', 'external'].includes(existing))
      return (memorySource = existing);
  } catch {}
  memorySource = classifyReferrer(document.referrer, location.hostname);
  try {
    sessionStorage.setItem(SOURCE, memorySource);
  } catch {}
  return memorySource;
}
let queue: AnalyticsEvent[] = [];
function persist() {
  try {
    sessionStorage.setItem(QUEUE, JSON.stringify(queue.slice(-60)));
  } catch {}
}
export async function flushEvents() {
  if (!analyticsEnabled() || flushing || !queue.length) return;
  flushing = true;
  try {
    while (queue.length) {
      const event = queue[0];
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      });
      if (response.ok || [400, 403, 413].includes(response.status)) {
        queue = queue.filter((e) => e.eventId !== event.eventId);
        persist();
      } else break;
    }
  } catch {
  } finally {
    flushing = false;
  }
}
export function track(
  type: Exclude<EventName, 'affiliate_outbound'>,
  extra: { category?: string; cta?: string } = {},
) {
  if (!analyticsEnabled() || typeof window === 'undefined') return;
  queue.push({
    eventId: crypto.randomUUID(),
    sessionId: sessionId(),
    type,
    path: location.pathname,
    source: source(),
    landingPath: landingPath(),
    ...extra,
  });
  queue = queue.slice(-60);
  persist();
  void flushEvents();
}
export function initAnalytics() {
  if (!analyticsEnabled()) return;
  try {
    const previous = JSON.parse(sessionStorage.getItem(QUEUE) || '[]');
    if (Array.isArray(previous))
      queue = previous
        .filter((e) => e && typeof e.eventId === 'string' && typeof e.type === 'string')
        .slice(-60);
  } catch {}
  const flush = () => void flushEvents();
  const visibility = () => {
    if (document.visibilityState === 'hidden') {
      for (const e of queue.slice(0, 10))
        navigator.sendBeacon?.(
          '/api/events',
          new Blob([JSON.stringify(e)], { type: 'application/json' }),
        );
    } else flush();
  };
  window.addEventListener('online', flush);
  document.addEventListener('visibilitychange', visibility);
  flush();
  return () => {
    window.removeEventListener('online', flush);
    document.removeEventListener('visibilitychange', visibility);
  };
}
