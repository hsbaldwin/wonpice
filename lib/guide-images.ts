export interface GuideImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const images: Record<string, GuideImage> = {
  installation: {
    src: '/images/editorial-installation-2026.webp',
    alt: '밝은 창가의 커튼 레일과 쉬폰·겉커튼 상단을 가까이 본 설치 구성 예시',
    caption: 'AI로 만든 설치 구성 예시 · 실제 시공 사진이 아닙니다.',
    width: 1536,
    height: 1024,
  },
  companies: {
    src: '/images/editorial-companies-2026.webp',
    alt: '원단 샘플과 줄자, 빈 메모지를 놓은 커튼 견적 상담 준비 예시',
    caption: 'AI로 만든 상담 준비 예시 · 실제 견적서나 상품 사진이 아닙니다.',
    width: 1536,
    height: 1024,
  },
  interior: {
    src: '/images/editorial-interior-2026.webp',
    alt: '햇빛 아래 아이보리 쉬폰과 베이지·푸른 회색 커튼 원단의 질감을 비교한 예시',
    caption: 'AI로 만든 원단 스타일 예시 · 비침과 차광 성능은 제품별로 확인하세요.',
    width: 1536,
    height: 1024,
  },
  'living-room': {
    src: '/images/editorial-living-room-2026.webp',
    alt: '흰 쉬폰과 푸른 회색 겉커튼, 낮은 소파가 있는 밝은 거실 스타일 예시',
    caption: 'AI로 만든 거실 스타일 예시 · 실제 시공 사례가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  bedroom: {
    src: '/images/editorial-bedroom-2026.webp',
    alt: '차분한 청회색 겉커튼과 아이보리 침구를 배치한 침실 스타일 예시',
    caption: 'AI로 만든 침실 스타일 예시 · 실제 암막 성능을 나타내지 않습니다.',
    width: 1536,
    height: 1024,
  },
  'newlywed-home': {
    src: '/images/editorial-newlywed-home-2026.webp',
    alt: '세이지색 커튼과 아이보리 쉬폰, 작은 원목 식탁을 배치한 신혼집 스타일 예시',
    caption: 'AI로 만든 신혼집 스타일 예시 · 실제 시공 사례가 아닙니다.',
    width: 1536,
    height: 1024,
  },
};

export function getGuideImage(category: string): GuideImage {
  return images[category] || images.interior;
}

const articleImages: Record<string, GuideImage> = {
  '/images/article-measurement-basics-2026.webp': {
    src: '/images/article-measurement-basics-2026.webp',
    alt: '창틀과 바닥, 줄자와 메모를 함께 살펴보는 커튼 실측 준비 장면',
    caption: 'AI로 만든 실측 준비 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-rail-check-2026.webp': {
    src: '/images/article-rail-check-2026.webp',
    alt: '커튼 상단의 레일·후크와 창가 부자재를 살펴보는 구성 예시',
    caption: 'AI로 만든 레일 구성 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-curtain-cost-factors-2026.webp': {
    src: '/images/article-curtain-cost-factors-2026.webp',
    alt: '원단과 레일, 후크, 줄자를 나누어 놓은 커튼 구성품',
    caption: 'AI로 만든 견적 구성 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-quote-comparison-2026.webp': {
    src: '/images/article-quote-comparison-2026.webp',
    alt: '같은 원단 샘플과 빈 메모 두 개를 놓은 견적 비교 준비 장면',
    caption: 'AI로 만든 견적 비교 준비 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-fabric-layers-2026.webp': {
    src: '/images/article-fabric-layers-2026.webp',
    alt: '하나의 창에 아이보리 쉬폰과 청회색 겉커튼을 겹친 구성',
    caption: 'AI로 만든 원단 레이어 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-curtain-vs-blind-2026.webp': {
    src: '/images/article-curtain-vs-blind-2026.webp',
    alt: '커튼과 롤스크린을 설치한 두 창과 원목 책상이 있는 공간',
    caption: 'AI로 만든 커튼·블라인드 스타일 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-living-room-light-2026.webp': {
    src: '/images/article-living-room-light-2026.webp',
    alt: '창과 TV, 소파, 발코니 출입 동선을 함께 살펴보는 거실',
    caption: 'AI로 만든 거실 배치 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-bedroom-blackout-2026.webp': {
    src: '/images/article-bedroom-blackout-2026.webp',
    alt: '창틀과 커튼 가장자리, 바닥 간격이 보이는 침실',
    caption: 'AI로 만든 침실 구성 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-newlywed-room-plan-2026.webp': {
    src: '/images/article-newlywed-room-plan-2026.webp',
    alt: '거실의 세이지색 커튼과 침실의 청회색 커튼을 연결한 공간',
    caption: 'AI로 만든 신혼집 공간 구성 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
  '/images/article-move-in-preparation-2026.webp': {
    src: '/images/article-move-in-preparation-2026.webp',
    alt: '입주 전 빈 창가에 이사 상자와 커튼 샘플을 둔 준비 장면',
    caption: 'AI로 만든 입주 준비 예시 · 실제 시공이나 제품 성능 자료가 아닙니다.',
    width: 1536,
    height: 1024,
  },
};

/** One registered asset supplies visible media and search metadata. */
export function getImageBySrc(src: string): GuideImage {
  const image = articleImages[src] || Object.values(images).find((image) => image.src === src);
  if (!image) throw new Error(`Unregistered guide image: ${src}`);
  return image;
}
