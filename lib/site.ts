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
export const site = {
  name: '커튼 견적 도우미',
  shortName: '커튼 견적 도우미',
  description:
    '맞춤커튼 견적 전에 창 치수와 필요한 기능을 정리하세요. 커튼 실측 방법, 원단 선택, 설치 조건과 견적서 확인사항을 살펴보고 상담을 준비할 수 있습니다.',
  url: resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL, indexable),
  indexable,
  // Commission attribution depends on this tracking link. Do not bypass it
  // with a direct landing-page URL, even when affiliate identifiers match.
  affiliateUrl: 'https://dbdbdeep.com/ma/link.php?lncd=S00281518OC06031025V',
};
export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
