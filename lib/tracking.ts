/** A different, officially issued link is required before any site-only reporting. */
export const sharedTrackingUrl = 'http://tnr.kr/ma/link.php?lncd=S00281518OC06031025V';
const sharedTrackingCode = new URL(sharedTrackingUrl).searchParams.get('lncd');
const trackingOrigins = new Set(['http://tnr.kr', 'https://tnr.kr', 'https://dbdbdeep.com']);
export function siteTrackingConfig() {
  const value = process.env.SITE_TRACKING_URL;
  const from = process.env.SITE_TRACKING_FROM;
  if (!value || !from || process.env.SITE_TRACKING_CONFIRMED !== 'true') return null;
  try {
    const url = new URL(value);
    if (
      !trackingOrigins.has(url.origin) ||
      url.pathname !== '/ma/link.php' ||
      !/^[a-zA-Z0-9]+$/.test(url.searchParams.get('lncd') || '') ||
      url.searchParams.size !== 1 ||
      url.username ||
      url.password ||
      url.hash ||
      // tnr.kr redirects to dbdbdeep.com. A host change does not create a site-only code.
      url.searchParams.get('lncd') === sharedTrackingCode ||
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
