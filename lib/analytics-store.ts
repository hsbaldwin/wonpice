import { neon } from '@neondatabase/serverless';
import { analyticsEnabled } from './analytics-config';
import {
  getAnalyticsStore,
  parseEvent,
  kstDay,
  type DateRange,
  type ExportRow,
} from './analytics-server';
import { siteTrackingConfig } from './tracking';
import type { AnalyticsEvent } from './types';

export type SqlQuery = (
  sql: string,
  values?: (string | number | null)[],
) => Promise<Record<string, unknown>[]>;
export type ResultScope = 'shared' | 'site';
export interface DailyResult {
  date: string;
  scope: ResultScope;
  applications: number;
  approvals: number;
  updatedAt: string;
}
export interface PerformanceRow {
  label: string;
  visits: number;
  views: number;
  clicks: number;
  clickedSessions: number;
}
export interface DashboardReport {
  visits: number;
  views: number;
  clicks: number;
  clickedSessions: number;
  starts: number;
  completed: number;
  daily: PerformanceRow[];
  sources: PerformanceRow[];
  landingPages: PerformanceRow[];
}
export function percent(numerator: number, denominator: number) {
  return denominator > 0 ? `${((100 * numerator) / denominator).toFixed(1)}%` : '—';
}
export function parseResult(
  input: unknown,
  now = new Date(),
): Omit<DailyResult, 'updatedAt'> | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const data = input as Record<string, unknown>;
  if (Object.keys(data).some((k) => !['date', 'scope', 'applications', 'approvals'].includes(k)))
    return null;
  if (
    typeof data.date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(data.date) ||
    !Number.isFinite(Date.parse(data.date)) ||
    new Date(data.date).toISOString().slice(0, 10) !== data.date ||
    data.date > kstDay(now)
  )
    return null;
  if (data.scope !== 'shared' && data.scope !== 'site') return null;
  for (const key of ['applications', 'approvals'])
    if (!Number.isSafeInteger(data[key]) || Number(data[key]) < 0 || Number(data[key]) > 1_000_000)
      return null;
  // Daily approvals can exceed applications: approval can follow an earlier day's application.
  if (data.scope === 'site') {
    const config = siteTrackingConfig();
    if (!config || data.date < config.from) return null;
  }
  return data as unknown as Omit<DailyResult, 'updatedAt'>;
}
export function resultSummary(
  rows: DailyResult[],
  scope: ResultScope,
  range: DateRange,
  visits?: number,
  today = kstDay(),
) {
  const selected = rows.filter(
    (row) => row.scope === scope && row.date >= range.from && row.date <= range.to,
  );
  const applications = selected.reduce((sum, row) => sum + row.applications, 0);
  const approvals = selected.reduce((sum, row) => sum + row.approvals, 0);
  const days = Math.round((Date.parse(range.to) - Date.parse(range.from)) / 86400_000) + 1;
  const complete = new Set(selected.map((row) => row.date)).size === days;
  const config = siteTrackingConfig();
  const eligible =
    scope === 'site' &&
    config &&
    range.from >= config.from &&
    range.to < today &&
    complete &&
    visits !== undefined;
  return {
    applications,
    approvals,
    days,
    enteredDays: selected.length,
    complete,
    lastUpdated: selected
      .map((row) => row.updatedAt)
      .sort()
      .at(-1),
    conversionRate: eligible ? percent(applications, visits!) : null,
  };
}
const number = (row: Record<string, unknown>, key: string) => Number(row[key] || 0);
function performance(row: Record<string, unknown>): PerformanceRow {
  return {
    label: String(row.label),
    visits: number(row, 'visits'),
    views: number(row, 'views'),
    clicks: number(row, 'clicks'),
    clickedSessions: number(row, 'clickedSessions'),
  };
}
export function createRuntimeStore(query: SqlQuery, dialect: 'postgres' | 'sqlite') {
  const day =
    dialect === 'postgres'
      ? "(received_at::timestamptz AT TIME ZONE 'Asia/Seoul')::date::text"
      : "strftime('%Y-%m-%d', received_at, '+9 hours')";
  return {
    async record(event: AnalyticsEvent, receivedAt = new Date().toISOString()) {
      const safe = parseEvent(event, true);
      if (!safe) throw new Error('Invalid analytics event');
      const rows = await query(
        `INSERT INTO events (event_id,session_id,type,path,category,cta,source,landing_path,received_at)
        VALUES ($1,$2,$3,$4,$5,$6,COALESCE($7,(SELECT source FROM events WHERE session_id=$2 AND source IS NOT NULL ORDER BY received_at,event_id LIMIT 1)),
        $8,$9) ON CONFLICT(event_id) DO NOTHING RETURNING event_id`,
        [
          safe.eventId,
          safe.sessionId,
          safe.type,
          safe.path,
          safe.category ?? null,
          safe.cta ?? null,
          safe.source ?? null,
          safe.landingPath ?? null,
          new Date(receivedAt).toISOString(),
        ],
      );
      return rows.length === 1;
    },
    async report(range: DateRange): Promise<DashboardReport> {
      const values = [range.start, range.end];
      const base = `WITH filtered AS (SELECT * FROM events WHERE received_at >= $1 AND received_at < $2),
        sessions AS (SELECT session_id,
          SUM(CASE WHEN type='page_view' THEN 1 ELSE 0 END) AS views,
          SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks,
          MIN(CASE WHEN type='helper_start' THEN received_at END) AS started
          FROM filtered GROUP BY session_id),
        visits AS (SELECT s.*,
          COALESCE((SELECT COALESCE(e.landing_path,e.path) FROM events e WHERE e.session_id=s.session_id AND e.type='page_view' ORDER BY e.received_at,e.event_id LIMIT 1),'미확인') AS landing,
          COALESCE((SELECT e.source FROM events e WHERE e.session_id=s.session_id AND e.source IS NOT NULL ORDER BY e.received_at,e.event_id LIMIT 1),'미확인') AS source
          FROM sessions s WHERE s.views > 0)`;
      const [totals, funnel, sources, landing, daily] = await Promise.all([
        query(
          `${base} SELECT COUNT(*) AS visits, COALESCE(SUM(views),0) AS views,
          (SELECT COUNT(*) FROM filtered WHERE type='affiliate_outbound') AS clicks,
          COALESCE(SUM(CASE WHEN clicks>0 THEN 1 ELSE 0 END),0) AS "clickedSessions" FROM visits`,
          values,
        ),
        query(
          `${base} SELECT COUNT(*) AS starts, COALESCE(SUM(CASE WHEN EXISTS(SELECT 1 FROM filtered e WHERE e.session_id=s.session_id AND e.type='helper_complete' AND e.received_at>=s.started) THEN 1 ELSE 0 END),0) AS completed FROM sessions s WHERE started IS NOT NULL`,
          values,
        ),
        ...['source', 'landing'].map((column) =>
          query(
            `${base} SELECT ${column} AS label, COUNT(*) AS visits, SUM(views) AS views, SUM(clicks) AS clicks, SUM(CASE WHEN clicks>0 THEN 1 ELSE 0 END) AS "clickedSessions" FROM visits GROUP BY ${column} ORDER BY visits DESC, label`,
            values,
          ),
        ),
        query(
          `WITH daily AS (SELECT ${day} AS label,session_id,
          SUM(CASE WHEN type='page_view' THEN 1 ELSE 0 END) AS views,
          SUM(CASE WHEN type='affiliate_outbound' THEN 1 ELSE 0 END) AS clicks
          FROM events WHERE received_at >= $1 AND received_at < $2 GROUP BY ${day},session_id)
          SELECT label, SUM(CASE WHEN views>0 THEN 1 ELSE 0 END) AS visits, SUM(views) AS views, SUM(clicks) AS clicks,
          SUM(CASE WHEN views>0 AND clicks>0 THEN 1 ELSE 0 END) AS "clickedSessions" FROM daily GROUP BY label ORDER BY label`,
          values,
        ),
      ]);
      const filled: PerformanceRow[] = [];
      for (let date = Date.parse(range.from); date <= Date.parse(range.to); date += 86400_000) {
        const label = new Date(date).toISOString().slice(0, 10);
        filled.push(
          daily.find((row) => row.label === label)
            ? performance(daily.find((row) => row.label === label)!)
            : { label, visits: 0, views: 0, clicks: 0, clickedSessions: 0 },
        );
      }
      return {
        ...performance({ ...totals[0], label: '' }),
        starts: number(funnel[0], 'starts'),
        completed: number(funnel[0], 'completed'),
        daily: filled,
        sources: sources.map(performance),
        landingPages: landing.map(performance),
      };
    },
    async exportRows(range: DateRange): Promise<ExportRow[]> {
      const rows = await query(
        `SELECT ${day} AS received_at,type,path,category,cta,source,COUNT(*) AS events,COUNT(DISTINCT session_id) AS sessions
        FROM events WHERE received_at >= $1 AND received_at < $2 GROUP BY ${day},type,path,category,cta,source ORDER BY received_at DESC`,
        [range.start, range.end],
      );
      return rows.map((row) => ({
        ...row,
        events: number(row, 'events'),
        sessions: number(row, 'sessions'),
      })) as unknown as ExportRow[];
    },
    async results(range: DateRange): Promise<DailyResult[]> {
      const rows = await query(
        'SELECT date,scope,applications,approvals,updated_at AS "updatedAt" FROM affiliate_results WHERE date >= $1 AND date <= $2 ORDER BY date DESC,scope',
        [range.from, range.to],
      );
      return rows.map((row) => ({
        ...row,
        applications: number(row, 'applications'),
        approvals: number(row, 'approvals'),
      })) as unknown as DailyResult[];
    },
    async saveResult(input: unknown, now = new Date()) {
      const result = parseResult(input, now);
      if (!result) throw new Error('Invalid daily result');
      const updatedAt = now.toISOString();
      await query(
        `INSERT INTO affiliate_results (date,scope,applications,approvals,updated_at) VALUES ($1,$2,$3,$4,$5)
        ON CONFLICT(date,scope) DO UPDATE SET applications=excluded.applications,approvals=excluded.approvals,updated_at=excluded.updated_at RETURNING date`,
        [result.date, result.scope, result.applications, result.approvals, updatedAt],
      );
      return { ...result, updatedAt };
    },
    async prune() {
      await query('DELETE FROM events WHERE received_at < $1', [
        new Date(Date.now() - 180 * 86400_000).toISOString(),
      ]);
    },
  };
}

let postgres: { url: string; ready: Promise<ReturnType<typeof createRuntimeStore>> } | undefined;
let lastPrune = 0;
export async function getRuntimeStore() {
  if (!analyticsEnabled()) throw new Error('Analytics is disabled');
  const url = process.env.DATABASE_URL;
  if (!url) {
    if (process.env.VERCEL === '1') throw new Error('DATABASE_URL is required on Vercel');
    const sqlite = getAnalyticsStore();
    return createRuntimeStore(async (sql, values) => sqlite.query(sql, values), 'sqlite');
  }
  if (!postgres || postgres.url !== url) {
    const ready = (async () => {
      const sql = neon(url);
      // Schema is provisioned once with analytics:setup, never during visitor requests.
      return createRuntimeStore(
        async (statement, values = []) =>
          await sql.query(statement, values, {
            fetchOptions: { signal: AbortSignal.timeout(3500) },
          }),
        'postgres',
      );
    })();
    postgres = { url, ready };
    ready.catch(() => {
      if (postgres?.ready === ready) postgres = undefined;
    });
  }
  const store = await postgres.ready;
  if (Date.now() - lastPrune > 86400_000) {
    lastPrune = Date.now();
    try {
      await store.prune();
    } catch {
      lastPrune = 0;
    }
  }
  return store;
}
