/** Public builds must never publish a development or malformed canonical origin. */
export function resolveSiteUrl(value: string | undefined, indexable: boolean): string {
  if (!indexable) return value || 'http://localhost:3000';
  try {
    const url = new URL(value || '');
    const hostname = url.hostname.replace(/\.$/, '').toLowerCase();
    if (
      !value ||
      value !== value.trim() ||
      url.protocol !== 'https:' ||
      url.username ||
      url.password ||
      url.port ||
      url.pathname !== '/' ||
      url.search ||
      url.hash ||
      /[?#\\]/.test(value) ||
      !hostname.includes('.') ||
      /^[\d.]+$/.test(hostname) ||
      hostname.includes(':') ||
      /(?:^|\.)(?:localhost|local|internal|lan)$/.test(hostname)
    )
      throw new Error('Invalid public origin');
    return url.origin;
  } catch {
    throw new Error(
      'SITE_INDEXABLE=true requires NEXT_PUBLIC_SITE_URL to be a public HTTPS domain origin without a path, query, fragment or credentials.',
    );
  }
}

const indexable = process.env.SITE_INDEXABLE === 'true';
const siteName = '커튼 견적 도우미';
export const site = {
  name: siteName,
  shortName: siteName,
  editorialName: `${siteName} 편집`,
  description:
    '커튼 견적 상담에 필요한 창 치수와 원단·설치 조건을 정리하세요. 맞춤커튼 가격이 달라지는 이유와 견적 비교 방법을 확인하고 무료 견적 신청으로 상담을 이어갈 수 있습니다.',
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, indexable),
  indexable,
  // Commission attribution depends on this tracking link. Do not bypass it
  // with a direct landing-page URL, even when affiliate identifiers match.
  affiliateUrl: 'https://dbdbdeep.com/ma/link.php?lncd=S00281518OC06031025V',
};
export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
