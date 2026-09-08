export const site = {
  name: '커튼 견적 도우미',
  shortName: '커튼 견적 도우미',
  description:
    '우리 집 창 크기로 시작하는 맞춤커튼 견적 도우미. 공간에 맞는 스타일을 찾고 견적 요청서를 준비하세요.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  indexable: process.env.SITE_INDEXABLE === 'true',
  // Commission attribution depends on this tracking link. Do not bypass it
  // with a direct landing-page URL, even when affiliate identifiers match.
  affiliateUrl: 'https://dbdbdeep.com/ma/link.php?lncd=S00281518OC06031025V',
};
export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
