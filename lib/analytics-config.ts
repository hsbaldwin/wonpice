/** Public build flag; contains no credentials. Vercel requires the PostgreSQL store. */
export function analyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';
}
