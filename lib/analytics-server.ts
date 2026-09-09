import { analyticsEnabled } from './analytics-config';
import Database from 'better-sqlite3';
import { createHash, randomUUID } from 'node:crypto';
import { mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import matter from 'gray-matter';
import type { AnalyticsEvent, EventName } from './types';

import { EVENT_NAMES } from './analytics-events';
export { EVENT_NAMES } from './analytics-events';
export const CATEGORIES = [
  'installation',
  'companies',
  'interior',
  'living-room',
  'bedroom',
  'newlywed-home',
] as const;
export const CTA_PLACEMENTS = [
  'home-header',
  'home-result',
  'home-direct',
  'saved-card',
  'footer',
  'guide-top',
  'guide-bottom',
  'post-top',
  'post-bottom',
  'post-cta',
  'direct',
  'pdf',
] as const;
export const SOURCES = ['direct', 'google', 'naver', 'external', 'internal'] as const;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const PUBLIC_PATHS = new Set([
  '/',
  '/guides',
  '/saved',
  '/about',
  ...CATEGORIES.map((category) => `/guides/${category}`),
]);
let postPaths: Set<string> | undefined;
let registryReadAt = 0;

/** Trusted file metadata supplies known public routes; never infer routes from visitor input. */
export function readPostPathRegistry(
  directory = join(process.cwd(), 'content', 'posts'),
): Set<string> {
  const paths = new Set<string>();
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isFile() || !/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(entry.name)) continue;
    const { data } = matter(readFileSync(join(directory, entry.name), 'utf8'));
    if (
      typeof data.category === 'string' &&
      (CATEGORIES as readonly string[]).includes(data.category)
    )
      paths.add(`/guides/${data.category}/${entry.name.slice(0, -3)}`);
  }
  return paths;
}
function knownPostPaths(): Set<string> {
  if (
    !postPaths ||
    (process.env.NODE_ENV === 'development' && Date.now() - registryReadAt > 2000)
  ) {
    try {
      postPaths = readPostPathRegistry();
    } catch {
      postPaths = new Set();
      console.error('Analytics content registry unavailable');
    }
    registryReadAt = Date.now();
  }
  return postPaths;
}

export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value);
}
export function validPublicPath(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 120 || value.includes('?') || value.includes('#'))
    return false;
  return PUBLIC_PATHS.has(value) || knownPostPaths().has(value);
}
function member(value: unknown, values: readonly string[]) {
  return typeof value === 'string' && values.includes(value);
}
function categoryForPath(path: string): string | undefined {
  if (!validPublicPath(path)) return undefined;
  const parts = path.split('/');
  return parts[1] === 'guides' && member(parts[2], CATEGORIES) ? parts[2] : undefined;
}

/** Reject rather than silently retain unrecognized fields: no measurements or free text enter analytics. */
export function parseEvent(input: unknown, allowOutbound = false): AnalyticsEvent | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>;
  if (
    Object.keys(value).some(
      (key) =>
        ![
          'eventId',
          'sessionId',
          'type',
          'path',
          'category',
          'cta',
          'source',
          'landingPath',
        ].includes(key),
    )
  )
    return null;
  if (!isUuid(value.eventId) || !isUuid(value.sessionId) || !validPublicPath(value.path))
    return null;
  if (!member(value.type, EVENT_NAMES) || (!allowOutbound && value.type === 'affiliate_outbound'))
    return null;
  if (value.category !== undefined && !member(value.category, CATEGORIES)) return null;
  if (value.cta !== undefined && !member(value.cta, CTA_PLACEMENTS)) return null;
  if (value.source !== undefined && !member(value.source, SOURCES)) return null;
  if (value.landingPath !== undefined && !validPublicPath(value.landingPath)) return null;
  const category = categoryForPath(value.path);
  return { ...value, ...(category ? { category } : {}) } as unknown as AnalyticsEvent;
}

export function outboundEvent(
  params: URLSearchParams,
  fallbackSessionId = randomUUID(),
): AnalyticsEvent {
  const path = params.get('path') || params.get('from');
  const cta = params.get('cta') || params.get('placement');
  const safePath = validPublicPath(path) ? path : '/';
  const suppliedCategory = params.get('category');
  const category =
    categoryForPath(safePath) ??
    (member(suppliedCategory, CATEGORIES) ? suppliedCategory! : undefined);
  return {
    eventId: isUuid(params.get('clickid')) ? params.get('clickid')! : randomUUID(),
    sessionId: isUuid(params.get('sessionId')) ? params.get('sessionId')! : fallbackSessionId,
    type: 'affiliate_outbound',
    ...(validPublicPath(params.get('landingPath'))
      ? { landingPath: params.get('landingPath')! }
      : {}),
    path: safePath,
    cta: member(cta, CTA_PLACEMENTS) ? cta! : 'direct',
    ...(category ? { category } : {}),
  };
}

export function isAutomatedRequest(headers: Headers): boolean {
  const purpose = `${headers.get('purpose') || ''} ${headers.get('sec-purpose') || ''}`;
  return (
    /prefetch|prerender/i.test(purpose) ||
    headers.get('next-router-prefetch') === '1' ||
    /bot|crawler|spider|slurp|bingpreview|headless/i.test(headers.get('user-agent') || '')
  );
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  // Browser POSTs carry Origin. Reject missing origins too; CLI tests should send one explicitly.
  if (!origin) return false;
  const expected = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  try {
    const actual = new URL(origin);
    const configured = new URL(expected);
    if (actual.origin === configured.origin) return true;
    const loopback = ['localhost', '127.0.0.1', '[::1]'];
    return (
      process.env.NODE_ENV !== 'production' &&
      loopback.includes(actual.hostname) &&
      loopback.includes(configured.hostname) &&
      actual.port === configured.port &&
      actual.protocol === configured.protocol
    );
  } catch {
    return false;
  }
}

export async function readLimitedBody(request: Request, maximum = 2048): Promise<string> {
  if (!request.body) return '';
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const item = await reader.read();
      if (item.done) break;
      length += item.value.byteLength;
      if (length > maximum) {
        await reader.cancel();
        throw new RangeError('Payload too large');
      }
      chunks.push(item.value);
    }
  } finally {
    reader.releaseLock();
  }
  return Buffer.concat(chunks).toString('utf8');
}

const limits = new Map<string, { count: number; expires: number }>();
export function consumeLimit(
  key: string,
  maximum: number,
  durationMs = 60_000,
  now = Date.now(),
): boolean {
  if (limits.size >= 10_000)
    for (const [entry, value] of limits) if (value.expires <= now) limits.delete(entry);
  const existing = limits.get(key);
  if (!existing || existing.expires <= now) {
    if (!existing && limits.size >= 10_000) return false;
    limits.set(key, { count: 1, expires: now + durationMs });
    return true;
  }
  existing.count += 1;
  return existing.count <= maximum;
}
export function requestBucket(request: Request): string {
  const address =
    process.env.TRUST_PROXY === 'true'
      ? (request.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim()
      : 'shared';
  return createHash('sha256').update(address).digest('hex').slice(0, 24);
}

export interface DateRange {
  from: string;
  to: string;
  start: string;
  end: string;
}
export function kstDay(now = new Date()) {
  return new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);
}
export function parseDateRange(params: URLSearchParams, now = new Date()): DateRange | null {
  const today = kstDay(now);
  const period = params.get('period') || '28';
  if (!['today', '7', '28', '90'].includes(period)) return null;
  const days = period === 'today' ? 1 : Number(period);
  const defaultFrom = new Date(Date.parse(today) - (days - 1) * 86400_000)
    .toISOString()
    .slice(0, 10);
  const from = params.get('from') || defaultFrom;
  const to = params.get('to') || today;
  if (
    ![from, to].every(
      (date) =>
        /^\d{4}-\d{2}-\d{2}$/.test(date) &&
        Number.isFinite(Date.parse(date)) &&
        new Date(date).toISOString().slice(0, 10) === date,
    )
  )
    return null;
  const duration = Date.parse(to) - Date.parse(from);
  if (duration < 0 || duration > 89 * 86400_000) return null;
  return {
    from,
    to,
    start: new Date(Date.parse(from) - 9 * 3600_000).toISOString(),
    end: new Date(Date.parse(to) + 15 * 3600_000).toISOString(),
  };
}

export interface CountRow {
  type: EventName;
  events: number;
  sessions: number;
}
export interface BreakdownRow {
  label: string;
  views: number;
  starts: number;
  completed: number;
  outbound: number;
}
export interface AnalyticsReport {
  counts: CountRow[];
  byPath: BreakdownRow[];
  byCategory: BreakdownRow[];
  byCta: BreakdownRow[];
  bySource: BreakdownRow[];
  startedSessions: number;
  completedStartedSessions: number;
  outboundCompletedSessions: number;
}
export interface ExportRow {
  received_at: string;
  type: string;
  path: string;
  category: string | null;
  cta: string | null;
  source: string | null;
  events: number;
  sessions: number;
}

export function createAnalyticsStore(filename: string) {
  if (filename !== ':memory:') mkdirSync(dirname(filename), { recursive: true, mode: 0o700 });
  const db = new Database(filename);
  db.pragma('journal_mode = WAL');
  db.pragma('busy_timeout = 2500');
  db.exec(`CREATE TABLE IF NOT EXISTS events (
    event_id TEXT PRIMARY KEY, session_id TEXT NOT NULL, type TEXT NOT NULL,
    path TEXT NOT NULL, category TEXT, cta TEXT, source TEXT, received_at TEXT NOT NULL
  ); CREATE INDEX IF NOT EXISTS events_received_at ON events(received_at);
  CREATE INDEX IF NOT EXISTS events_session ON events(session_id, type, received_at);`);
  if (
    !(db.prepare('PRAGMA table_info(events)').all() as { name: string }[]).some(
      (column) => column.name === 'landing_path',
    )
  )
    db.exec('ALTER TABLE events ADD COLUMN landing_path TEXT');
  db.exec(`CREATE TABLE IF NOT EXISTS affiliate_results (
    date TEXT NOT NULL, scope TEXT NOT NULL CHECK(scope IN ('shared','site')),
    applications INTEGER NOT NULL CHECK(applications >= 0), approvals INTEGER NOT NULL CHECK(approvals >= 0),
    updated_at TEXT NOT NULL, PRIMARY KEY(date,scope)
  )`);
  const insert = db.prepare(
    'INSERT OR IGNORE INTO events (event_id, session_id, type, path, category, cta, source, received_at, landing_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
  );
  const sessionSource = db.prepare(
    'SELECT source FROM events WHERE session_id = ? AND source IS NOT NULL ORDER BY received_at ASC LIMIT 1',
  );
  return {
    query(statement: string, values: (string | number | null)[] = []) {
      const ordered: (string | number | null)[] = [];
      const sql = statement.replace(/\$(\d+)/g, (_, index) => {
        ordered.push(values[Number(index) - 1]);
        return '?';
      });
      return db.prepare(sql).all(...ordered) as Record<string, unknown>[];
    },
    record(event: AnalyticsEvent, receivedAt = new Date().toISOString()) {
      const safe = parseEvent(event, true);
      if (!safe) throw new Error('Invalid analytics event');
      const inheritedSource =
        safe.type === 'affiliate_outbound' && !safe.source
          ? (sessionSource.get(safe.sessionId) as { source: string } | undefined)?.source
          : undefined;
      return (
        insert.run(
          safe.eventId,
          safe.sessionId,
          safe.type,
          safe.path,
          safe.category ?? null,
          safe.cta ?? null,
          safe.source ?? inheritedSource ?? null,
          receivedAt,
          safe.landingPath ?? null,
        ).changes === 1
      );
    },
    report(range: DateRange): AnalyticsReport {
      const counts = db
        .prepare(
          'SELECT type, COUNT(*) AS events, COUNT(DISTINCT session_id) AS sessions FROM events WHERE received_at >= ? AND received_at < ? GROUP BY type',
        )
        .all(range.start, range.end) as CountRow[];
      function breakdown(column: 'path' | 'category' | 'cta' | 'source') {
        return db
          .prepare(
            `SELECT COALESCE(${column}, '미지정') AS label,
          SUM(type = 'page_view') AS views, SUM(type = 'helper_start') AS starts,
          SUM(type = 'helper_complete') AS completed, SUM(type = 'affiliate_outbound') AS outbound
          FROM events WHERE received_at >= ? AND received_at < ? GROUP BY ${column} ORDER BY outbound DESC, views DESC LIMIT 100`,
          )
          .all(range.start, range.end) as BreakdownRow[];
      }
      const funnel = db
        .prepare(
          `WITH starts AS (
        SELECT session_id, MIN(received_at) AS at FROM events WHERE type = 'helper_start' AND received_at >= ? AND received_at < ? GROUP BY session_id
      ), completions AS (
        SELECT s.session_id, MIN(e.received_at) AS at FROM starts s JOIN events e ON e.session_id = s.session_id AND e.type = 'helper_complete' AND e.received_at >= s.at AND e.received_at < ? GROUP BY s.session_id
      ) SELECT (SELECT COUNT(*) FROM starts) AS startedSessions,
        (SELECT COUNT(*) FROM completions) AS completedStartedSessions,
        (SELECT COUNT(DISTINCT c.session_id) FROM completions c JOIN events e ON e.session_id = c.session_id AND e.type = 'affiliate_outbound' AND e.received_at >= c.at AND e.received_at < ?) AS outboundCompletedSessions`,
        )
        .get(range.start, range.end, range.end, range.end) as Pick<
        AnalyticsReport,
        'startedSessions' | 'completedStartedSessions' | 'outboundCompletedSessions'
      >;
      return {
        counts,
        byPath: breakdown('path'),
        byCategory: breakdown('category'),
        byCta: breakdown('cta'),
        bySource: breakdown('source'),
        ...funnel,
      };
    },
    exportRows(range: DateRange): ExportRow[] {
      return db
        .prepare(
          `SELECT substr(received_at, 1, 10) AS received_at, type, path, category, cta, source, COUNT(*) AS events, COUNT(DISTINCT session_id) AS sessions
        FROM events WHERE received_at >= ? AND received_at < ? GROUP BY substr(received_at, 1, 10), type, path, category, cta, source ORDER BY received_at DESC`,
        )
        .all(range.start, range.end) as ExportRow[];
    },
    prune(before = new Date(Date.now() - 180 * 86400_000).toISOString()) {
      return db.prepare('DELETE FROM events WHERE received_at < ?').run(before).changes;
    },
    close() {
      db.close();
    },
  };
}

let store: ReturnType<typeof createAnalyticsStore> | undefined;
let filename: string | undefined;
let lastPrune = 0;
export function getAnalyticsStore() {
  if (!analyticsEnabled()) throw new Error('Analytics is disabled');
  const target = process.env.DATABASE_PATH || 'data/analytics.sqlite';
  if (store && filename !== target) {
    store.close();
    store = undefined;
  }
  if (!store) {
    store = createAnalyticsStore(target);
    filename = target;
    lastPrune = 0;
  }
  if (Date.now() - lastPrune > 86400_000) {
    store.prune();
    lastPrune = Date.now();
  }
  return store;
}

export function csvCell(value: unknown): string {
  const raw = value == null ? '' : String(value);
  const safe = /^[\s]*[=+@-]/.test(raw) || /^[\t\r\n]/.test(raw) ? `'${raw}` : raw;
  return `"${safe.replaceAll('"', '""')}"`;
}
export function toCsv(rows: ExportRow[]): string {
  const keys: (keyof ExportRow)[] = [
    'received_at',
    'type',
    'path',
    'category',
    'cta',
    'source',
    'events',
    'sessions',
  ];
  return (
    '\ufeff' +
    [
      keys.map(csvCell).join(','),
      ...rows.map((row) => keys.map((key) => csvCell(row[key])).join(',')),
    ].join('\r\n')
  );
}
