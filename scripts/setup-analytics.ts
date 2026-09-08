import { loadEnvConfig } from '@next/env';
import { neon } from '@neondatabase/serverless';
import { POSTGRES_SCHEMA } from '../lib/analytics-schema';
loadEnvConfig(process.cwd());
async function main() {
  if (!process.env.DATABASE_URL)
    throw new Error('Set the server-only DATABASE_URL before running analytics:setup.');
  const sql = neon(process.env.DATABASE_URL);
  await sql.transaction(
    [
      sql.query('SELECT pg_advisory_xact_lock(748215903)'),
      ...POSTGRES_SCHEMA.map((statement) => sql.query(statement)),
    ],
    { fetchOptions: { signal: AbortSignal.timeout(15000) } },
  );
  console.log('Analytics schema is ready. No applicant data was imported.');
}
main().catch(() => {
  console.error(
    'Schema setup failed. Check DATABASE_URL and database permissions. Connection details are not logged.',
  );
  process.exitCode = 1;
});
