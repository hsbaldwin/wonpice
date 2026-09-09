import { kstDay, parseDateRange, type DateRange } from './analytics-server';
import { ADMIN_VIEWS, type AdminView } from './admin-format';
const DAY = 86400_000;
export interface AdminSelection {
  view: AdminView;
  range: DateRange;
  previous: DateRange;
  trend: DateRange;
  now: string;
  period: string;
  custom: boolean;
  invalid: boolean;
}
export function adminSelection(params: Record<string, unknown>, now = new Date()): AdminSelection {
  const clean = new URLSearchParams();
  for (const key of ['period', 'from', 'to'])
    if (typeof params[key] === 'string') clean.set(key, params[key]);
  if (!clean.get('period')) clean.set('period', 'today');
  const requested = parseDateRange(clean, now);
  const valid = requested && requested.to <= kstDay(now);
  const range = valid ? requested : parseDateRange(new URLSearchParams({ period: 'today' }), now)!;
  const days = Math.round((Date.parse(range.to) - Date.parse(range.from)) / DAY) + 1;
  const end = new Date(Math.min(Date.parse(range.end), now.getTime())).toISOString();
  const previous = {
    from: new Date(Date.parse(range.from) - days * DAY).toISOString().slice(0, 10),
    to: new Date(Date.parse(range.to) - days * DAY).toISOString().slice(0, 10),
    start: new Date(Date.parse(range.start) - days * DAY).toISOString(),
    end: new Date(Date.parse(end) - days * DAY).toISOString(),
  };
  const trend =
    range.from === range.to && range.to === kstDay(now)
      ? parseDateRange(new URLSearchParams({ period: '7' }), now)!
      : range;
  return {
    view:
      typeof params.view === 'string' && Object.hasOwn(ADMIN_VIEWS, params.view)
        ? (params.view as AdminView)
        : 'summary',
    range: { ...range, end },
    previous,
    trend: {
      ...trend,
      end: new Date(Math.min(Date.parse(trend.end), now.getTime())).toISOString(),
    },
    now: now.toISOString(),
    period: valid ? clean.get('period')! : 'today',
    custom: !!valid && (clean.has('from') || clean.has('to')),
    invalid: !valid,
  };
}
export function adminHref(selection: AdminSelection, view = selection.view, hash = '') {
  const params = new URLSearchParams({ view });
  if (selection.custom) {
    params.set('from', selection.range.from);
    params.set('to', selection.range.to);
  } else params.set('period', selection.period);
  return `/admin?${params}${hash ? `#${hash}` : ''}`;
}
export function comparisonReason(selection: AdminSelection, firstRecord: string | null) {
  if (Date.parse(selection.previous.start) < Date.parse(selection.now) - 180 * DAY)
    return '비교 기간이 보관 범위를 벗어납니다.';
  if (!firstRecord || firstRecord > selection.previous.start)
    return '비교 기간 전체의 보관 기록이 충분하지 않습니다.';
  if (selection.range.end === selection.range.start) return '오늘 집계가 시작되는 시각입니다.';
  return null;
}
