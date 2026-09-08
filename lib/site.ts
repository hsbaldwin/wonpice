export const site = {
  name: '커튼 견적 도우미',
  shortName: '커튼 견적 도우미',
  description:
    '창 크기와 필요한 기능을 정리하고, 맞춤커튼 상담에 필요한 내용을 준비하세요. 실측·원단·설치·견적 가이드를 함께 확인할 수 있습니다.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  indexable: process.env.SITE_INDEXABLE === 'true',
  // Commission attribution depends on this tracking link. Do not bypass it
  // with a direct landing-page URL, even when affiliate identifiers match.
  affiliateUrl: 'https://dbdbdeep.com/ma/link.php?lncd=S00281518OC06031025V',
};
export function absoluteUrl(path = '/') {
  return new URL(path, site.url).toString();
}
