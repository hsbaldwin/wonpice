/** A different, officially issued link is required before any site-only reporting. */
export const sharedTrackingUrl = 'https://dbdbdeep.com/ma/link.php?lncd=S00281518OC06031025V';
export function siteTrackingConfig() {
  const value = process.env.SITE_TRACKING_URL;
  const from = process.env.SITE_TRACKING_FROM;
  if (!value || !from || process.env.SITE_TRACKING_CONFIRMED !== 'true') return null;
  try {
    const url = new URL(value);
    if (
      url.origin !== 'https://dbdbdeep.com' ||
      url.pathname !== '/ma/link.php' ||
      !/^[a-zA-Z0-9]+$/.test(url.searchParams.get('lncd') || '') ||
      url.searchParams.size !== 1 ||
      url.username ||
      url.password ||
      url.hash ||
      value === sharedTrackingUrl ||
      !/^\d{4}-\d{2}-\d{2}$/.test(from) ||
      new Date(from).toISOString().slice(0, 10) !== from
    )
      return null;
    return { url: url.toString(), from };
  } catch {
    return null;
  }
}
export function trackingUrl(now = new Date()) {
  const config = siteTrackingConfig();
  const day = new Date(now.getTime() + 9 * 3600_000).toISOString().slice(0, 10);
  return config && day >= config.from ? config.url : sharedTrackingUrl;
}
