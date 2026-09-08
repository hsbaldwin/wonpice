/** Run with `npm run analytics:setup` before connecting the production application. */
export const POSTGRES_SCHEMA = [
  `CREATE TABLE IF NOT EXISTS events (event_id TEXT PRIMARY KEY,session_id TEXT NOT NULL,type TEXT NOT NULL,path TEXT NOT NULL,category TEXT,cta TEXT,source TEXT,received_at TEXT NOT NULL,landing_path TEXT)`,
  'ALTER TABLE events ADD COLUMN IF NOT EXISTS landing_path TEXT',
  'CREATE INDEX IF NOT EXISTS events_received_at ON events(received_at)',
  'CREATE INDEX IF NOT EXISTS events_session ON events(session_id,type,received_at)',
  `CREATE TABLE IF NOT EXISTS affiliate_results (date TEXT NOT NULL,scope TEXT NOT NULL CHECK(scope IN ('shared','site')),applications INTEGER NOT NULL CHECK(applications>=0),approvals INTEGER NOT NULL CHECK(approvals>=0),updated_at TEXT NOT NULL,PRIMARY KEY(date,scope))`,
];
