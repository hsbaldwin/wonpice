/** Public build flag; contains no credentials. Vercel builds disable local SQLite analytics. */
export function analyticsEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== 'false';
}
