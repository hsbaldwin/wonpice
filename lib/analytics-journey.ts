import type { DateRange } from './analytics-server';
import type { SqlQuery } from './analytics-store';

export interface PageJourney {
  path: string;
  visits: number;
  views: number;
  measured: number;
  active30: number;
  active60: number;
  scroll25: number;
  scroll50: number;
  scroll75: number;
  scroll90: number;
  clicks: number;
}
export interface CtaJourney {
  path: string;
  cta: string;
  shown: number;
  clicks: number;
  clicked: number;
  clickedShown: number;
}
export interface JourneyReport {
  firstMeasuredAt: string | null;
  pages: PageJourney[];
  ctas: CtaJourney[];
  funnel: number[];
  actions: { type: string; events: number; sessions: number }[];
  transitions: { from: string; to: string; moves: number; sessions: number }[];
}
const count = (row: Record<string, unknown>, key: string) => Number(row[key] || 0);

export async function journeyReport(query: SqlQuery, range: DateRange): Promise<JourneyReport> {
  const values = [range.start, range.end];
  const filtered =
    'WITH filtered AS (SELECT * FROM events WHERE received_at >= $1 AND received_at < $2)';
  const [first, pages, ctas, funnel, actions, transitions] = await Promise.all([
    query("SELECT MIN(received_at) AS first FROM events WHERE type='page_engagement_start'"),
    query(
      `${filtered}, per_page AS (
      SELECT path,session_id,
      SUM(CASE WHEN type='page_view' THEN 1 ELSE 0 END) AS views,
      MAX(CASE WHEN type='page_engagement_start' THEN 1 ELSE 0 END) AS measured,
      MAX(CASE WHEN type='page_active_30s' THEN 1 ELSE 0 END) AS active30,
      MAX(CASE WHEN type='page_active_60s' THEN 1 ELSE 0 END) AS active60,
      ${[25, 50, 75, 90].map((n) => `MAX(CASE WHEN type='page_scroll_${n}' THEN 1 ELSE 0 END) AS scroll${n},`).join('\n')}
      SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks
      FROM filtered GROUP BY path,session_id)
      SELECT path,SUM(CASE WHEN views>0 THEN 1 ELSE 0 END) AS visits,SUM(views) AS views,
      SUM(measured) AS measured,
      ${['active30', 'active60', 'scroll25', 'scroll50', 'scroll75', 'scroll90'].map((key) => `SUM(CASE WHEN measured>0 THEN ${key} ELSE 0 END) AS ${key},`).join('\n')}
      SUM(clicks) AS clicks FROM per_page GROUP BY path ORDER BY visits DESC,path`,
      values,
    ),
    query(
      `${filtered}, buttons AS (
      SELECT path,COALESCE(cta,'direct') AS cta,session_id,
      MIN(CASE WHEN type='quote_cta_view' THEN received_at END) AS shown_at,
      MAX(CASE WHEN type='affiliate_outbound' THEN received_at END) AS clicked_at,
      SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks
      FROM filtered WHERE type IN ('quote_cta_view','affiliate_outbound') GROUP BY path,cta,session_id)
      SELECT path,cta,SUM(CASE WHEN shown_at IS NOT NULL THEN 1 ELSE 0 END) AS shown,
      SUM(clicks) AS clicks,SUM(CASE WHEN clicks>0 THEN 1 ELSE 0 END) AS clicked,
      SUM(CASE WHEN shown_at IS NOT NULL AND clicked_at>=shown_at THEN 1 ELSE 0 END) AS matched
      FROM buttons GROUP BY path,cta ORDER BY clicks DESC,shown DESC,path,cta`,
      values,
    ),
    query(
      `${filtered}, sizes AS (
      SELECT session_id,MIN(received_at) AS at FROM filtered WHERE type='helper_step_size' GROUP BY session_id),
      needs AS (SELECT s.session_id,MIN(e.received_at) AS at FROM sizes s JOIN filtered e
        ON e.session_id=s.session_id AND e.type='helper_step_needs' AND e.received_at>=s.at GROUP BY s.session_id),
      results AS (SELECT s.session_id,MIN(e.received_at) AS at FROM needs s JOIN filtered e
        ON e.session_id=s.session_id AND e.type='helper_step_result' AND e.received_at>=s.at GROUP BY s.session_id),
      outbound AS (SELECT s.session_id FROM results s JOIN filtered e
        ON e.session_id=s.session_id AND e.type='affiliate_outbound' AND e.received_at>=s.at GROUP BY s.session_id)
      SELECT (SELECT COUNT(*) FROM sizes) AS sizes,(SELECT COUNT(*) FROM needs) AS needs,
        (SELECT COUNT(*) FROM results) AS results,(SELECT COUNT(*) FROM outbound) AS outbound`,
      values,
    ),
    query(
      `${filtered} SELECT type,COUNT(*) AS events,COUNT(DISTINCT session_id) AS sessions
      FROM filtered WHERE type IN ('helper_size_error','helper_needs_error','quote_save','quote_restore',
      'quote_storage_error','helper_reset','pdf_generated') GROUP BY type ORDER BY type`,
      values,
    ),
    query(
      `${filtered}, ordered AS (
      SELECT path,session_id,LAG(path) OVER (PARTITION BY session_id ORDER BY received_at,event_id) AS previous
      FROM filtered WHERE type='page_view')
      SELECT previous,path,COUNT(*) AS moves,COUNT(DISTINCT session_id) AS sessions
      FROM ordered WHERE previous IS NOT NULL AND previous<>path
      GROUP BY previous,path ORDER BY moves DESC,previous,path LIMIT 20`,
      values,
    ),
  ]);
  return {
    firstMeasuredAt: first[0]?.first ? String(first[0].first) : null,
    pages: pages.map(
      (row) =>
        ({
          path: String(row.path),
          ...Object.fromEntries(
            [
              'visits',
              'views',
              'measured',
              'active30',
              'active60',
              'scroll25',
              'scroll50',
              'scroll75',
              'scroll90',
              'clicks',
            ].map((key) => [key, count(row, key)]),
          ),
        }) as PageJourney,
    ),
    ctas: ctas.map((row) => ({
      path: String(row.path),
      cta: String(row.cta),
      shown: count(row, 'shown'),
      clicks: count(row, 'clicks'),
      clicked: count(row, 'clicked'),
      clickedShown: count(row, 'matched'),
    })),
    funnel: ['sizes', 'needs', 'results', 'outbound'].map((key) => count(funnel[0], key)),
    actions: actions.map((row) => ({
      type: String(row.type),
      events: count(row, 'events'),
      sessions: count(row, 'sessions'),
    })),
    transitions: transitions.map((row) => ({
      from: String(row.previous),
      to: String(row.path),
      moves: count(row, 'moves'),
      sessions: count(row, 'sessions'),
    })),
  };
}
