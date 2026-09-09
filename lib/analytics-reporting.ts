import type { DateRange } from './analytics-server';
import type { SqlQuery, PerformanceRow } from './analytics-store';
export interface CoreMetrics {
  visits: number;
  views: number;
  clicks: number;
  clickedSessions: number;
  starts: number;
  completed: number;
}
const numeric = (row: Record<string, unknown>, key: string) => Number(row[key] || 0);
function performance(row: Record<string, unknown>): PerformanceRow {
  return {
    label: String(row.label),
    visits: numeric(row, 'visits'),
    views: numeric(row, 'views'),
    clicks: numeric(row, 'clicks'),
    clickedSessions: numeric(row, 'clickedSessions'),
  };
}
function base() {
  return `WITH filtered AS (SELECT * FROM events WHERE received_at >= $1 AND received_at < $2),
    sessions AS (SELECT session_id,SUM(CASE WHEN type='page_view' THEN 1 ELSE 0 END) AS views,
      SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks,
      MIN(CASE WHEN type='helper_start' THEN received_at END) AS started FROM filtered GROUP BY session_id)`;
}
export function createAdminReports(query: SqlQuery, dialect: 'postgres' | 'sqlite') {
  return {
    async metrics(range: DateRange): Promise<CoreMetrics> {
      const [row] = await query(
        `${base()} SELECT
        COALESCE(SUM(CASE WHEN views>0 THEN 1 ELSE 0 END),0) AS visits,
        COALESCE(SUM(views),0) AS views,COALESCE(SUM(clicks),0) AS clicks,
        COALESCE(SUM(CASE WHEN views>0 AND clicks>0 THEN 1 ELSE 0 END),0) AS "clickedSessions",
        COALESCE(SUM(CASE WHEN started IS NOT NULL THEN 1 ELSE 0 END),0) AS starts,
        COALESCE(SUM(CASE WHEN started IS NOT NULL AND EXISTS(SELECT 1 FROM filtered e WHERE e.session_id=s.session_id AND e.type='helper_complete' AND e.received_at>=s.started) THEN 1 ELSE 0 END),0) AS completed
        FROM sessions s`,
        [range.start, range.end],
      );
      return Object.fromEntries(
        ['visits', 'views', 'clicks', 'clickedSessions', 'starts', 'completed'].map((key) => [
          key,
          numeric(row, key),
        ]),
      ) as unknown as CoreMetrics;
    },
    async coverage() {
      const [row] = await query(`SELECT MIN(received_at) AS first,
        MIN(CASE WHEN type='page_engagement_start' THEN received_at END) AS detail FROM events`);
      return {
        firstRecord: row.first ? String(row.first) : null,
        firstDetail: row.detail ? String(row.detail) : null,
      };
    },
    async performance(range: DateRange, column: 'source' | 'landing'): Promise<PerformanceRow[]> {
      const expression =
        column === 'source'
          ? `(SELECT e.source FROM events e WHERE e.session_id=s.session_id AND e.source IS NOT NULL ORDER BY e.received_at,e.event_id LIMIT 1)`
          : `(SELECT COALESCE(e.landing_path,e.path) FROM events e WHERE e.session_id=s.session_id AND e.type='page_view' ORDER BY e.received_at,e.event_id LIMIT 1)`;
      const rows = await query(
        `${base()}, visits AS (SELECT s.*,COALESCE(${expression},'미확인') AS label FROM sessions s WHERE views>0)
        SELECT label,COUNT(*) AS visits,SUM(views) AS views,SUM(clicks) AS clicks,
        SUM(CASE WHEN clicks>0 THEN 1 ELSE 0 END) AS "clickedSessions" FROM visits GROUP BY label ORDER BY visits DESC,label`,
        [range.start, range.end],
      );
      return rows.map(performance);
    },
    async daily(range: DateRange): Promise<PerformanceRow[]> {
      const day =
        dialect === 'postgres'
          ? "(received_at::timestamptz AT TIME ZONE 'Asia/Seoul')::date::text"
          : "strftime('%Y-%m-%d', received_at, '+9 hours')";
      const rows = await query(
        `WITH daily AS (SELECT ${day} AS label,session_id,
        SUM(CASE WHEN type='page_view' THEN 1 ELSE 0 END) AS views,
        SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks
        FROM events WHERE received_at >= $1 AND received_at < $2 GROUP BY ${day},session_id)
        SELECT label,SUM(CASE WHEN views>0 THEN 1 ELSE 0 END) AS visits,SUM(views) AS views,SUM(clicks) AS clicks,
        SUM(CASE WHEN views>0 AND clicks>0 THEN 1 ELSE 0 END) AS "clickedSessions" FROM daily GROUP BY label ORDER BY label`,
        [range.start, range.end],
      );
      const found = new Map(rows.map((row) => [String(row.label), performance(row)]));
      const result: PerformanceRow[] = [];
      for (let at = Date.parse(range.from); at <= Date.parse(range.to); at += 86400_000) {
        const label = new Date(at).toISOString().slice(0, 10);
        result.push(
          found.get(label) || { label, visits: 0, views: 0, clicks: 0, clickedSessions: 0 },
        );
      }
      return result;
    },
  };
}
