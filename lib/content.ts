import fs from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { RoomType } from './types';

export type CtaIntent = 'helper' | 'apply';
export interface GuideCategory {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  eyebrow: string;
  helperPreset: RoomType;
  ctaIntent: CtaIntent;
  lead: string;
  points: { title: string; text: string }[];
  comparison: {
    heading: string;
    columns: [string, string, string];
    rows: [string, string, string][];
  };
  checklist: string[];
  faq: { question: string; answer: string }[];
}

export const categories: GuideCategory[] = [
  {
    slug: 'installation',
    title: '커튼설치·커튼시공,\n준비는 이 세 가지부터.',
    navTitle: '설치·시공',
    primaryKeyword: '커튼설치',
    keywords: ['커튼설치', '커튼시공'],
    eyebrow: 'INSTALLATION',
    description:
      '창 크기, 레일, 설치면. 커튼설치와 커튼시공 전 확인할 조건을 그림과 체크리스트로 정리하세요.',
    helperPreset: 'other',
    ctaIntent: 'helper',
    lead: '정확한 견적의 시작은 창 크기와 설치 조건입니다.',
    points: [
      { title: '크기', text: '가로·세로와 치수 기준을 함께 기록하세요.' },
      { title: '레일', text: '기존 레일, 커튼박스, 겉커튼·속커튼 구성을 확인하세요.' },
      { title: '설치면', text: '천장·벽면 상태와 주변 장애물을 사진으로 남기세요.' },
    ],
    comparison: {
      heading: '무엇을 재셨나요?',
      columns: ['치수 기준', '기록할 범위', '상담할 내용'],
      rows: [
        ['창문 자체', '창틀의 바깥 가로·세로', '창을 덮는 여유와 레일 위치'],
        ['설치할 범위', '덮고 싶은 영역의 가로·세로', '바닥·가구와 닿는 지점'],
        ['기존 커튼', '현재 제품의 실제 크기', '동일 규격 재제작 가능 여부'],
      ],
    },
    checklist: [
      '레일 또는 봉이 있는지 확인',
      '커튼박스 내부와 창 전체 사진 준비',
      '에어컨·손잡이·가구 간섭 확인',
      '실측·설치·기존 제품 철거 포함 여부 확인',
    ],
    faq: [
      {
        question: '입력한 치수로 바로 제작되나요?',
        answer:
          '도우미의 치수는 상담 준비용입니다. 제작 치수와 여유, 주름 배수는 원단·레일·설치 위치를 확인한 뒤 업체와 확정하세요.',
      },
      {
        question: '기존 레일을 계속 사용할 수 있나요?',
        answer:
          '레일의 규격·상태·하중과 새 커튼 구성이 맞는지 확인이 필요합니다. 기존 레일 사진을 준비하고 재사용 가능 여부를 상담하세요.',
      },
    ],
  },
  {
    slug: 'companies',
    title: '커튼전문점·커튼업체,\n같은 조건으로 비교하세요.',
    navTitle: '업체·견적',
    primaryKeyword: '커튼전문점',
    keywords: ['커튼전문점', '커튼업체'],
    eyebrow: 'QUOTE CHECKLIST',
    description:
      '커튼전문점과 커튼업체 상담 전, 원단·실측·시공·AS 조건을 같은 기준으로 비교하는 견적 체크리스트.',
    helperPreset: 'other',
    ctaIntent: 'apply',
    lead: '총액만 보기 전에, 견적에 포함된 범위를 확인하세요.',
    points: [
      { title: '같은 제품', text: '원단·겹수·주름·부자재를 같은 조건으로 맞추세요.' },
      { title: '같은 범위', text: '실측·레일·설치·철거 포함 여부를 확인하세요.' },
      { title: '확실한 사후 안내', text: '제작 일정과 AS 접수·비용 조건을 확인하세요.' },
    ],
    comparison: {
      heading: '견적서에서 함께 볼 항목',
      columns: ['비교 항목', '확인할 내용', '준비할 정보'],
      rows: [
        ['제품 구성', '원단, 겹수, 주름 방식', '원하는 분위기·기능'],
        ['실측·설치', '방문 범위, 설치비, 부자재', '주소는 제휴 상담에서 전달'],
        ['추가 비용', '철거, 특수 설치 조건', '기존 제품·설치면 사진'],
        ['일정·AS', '제작·설치 일정, 사후 조건', '희망 설치 시점'],
      ],
    },
    checklist: [
      '창별 치수와 제품 구성 구분',
      '부자재·설치비 포함 내역 요청',
      '최종 실측 후 금액 변경 조건 확인',
      '결제 전 일정·변경·취소 조건 확인',
    ],
    faq: [
      {
        question: '이곳에서 여러 커튼업체 견적을 비교해 주나요?',
        answer:
          '이 사이트는 공간과 요구사항을 정리하는 견적 도우미입니다. 문의 버튼은 연결된 제휴 신청 페이지로 이동하며, 여러 업체의 실시간 가격 비교를 제공하지 않습니다.',
      },
      {
        question: '왜 예상 금액이 없나요?',
        answer:
          '원단, 제작 방식, 설치 범위에 따라 조건이 달라집니다. 검증되지 않은 가격을 제시하는 대신 요청서를 만들고 실제 상담에서 금액을 확인하도록 돕습니다.',
      },
    ],
  },
  {
    slug: 'interior',
    title: '인테리어커튼,\n빛과 분위기를 함께 고르세요.',
    navTitle: '스타일·소재',
    primaryKeyword: '인테리어커튼',
    keywords: ['인테리어커튼'],
    eyebrow: 'STYLE & MATERIAL',
    description:
      '인테리어커튼의 쉬폰·암막·이중 구성을 비교하고 벽지, 가구, 채광에 맞는 스타일을 찾아보세요.',
    helperPreset: 'other',
    ctaIntent: 'helper',
    lead: '좋아하는 느낌에, 공간에서 필요한 기능을 더하세요.',
    points: [
      { title: '밝고 부드럽게', text: '자연광과 가벼운 질감을 원하면 쉬폰 계열을 살펴보세요.' },
      { title: '차분하고 아늑하게', text: '빛 조절이 중요하다면 겉커튼·암막 구성을 살펴보세요.' },
      { title: '시간에 맞춰', text: '낮과 밤의 요구가 다르면 속커튼과 겉커튼을 함께 비교하세요.' },
    ],
    comparison: {
      heading: '분위기와 기능, 한눈에',
      columns: ['구성', '어울리는 요구', '확인할 점'],
      rows: [
        ['쉬폰 중심', '부드러운 채광·가벼운 분위기', '야간 시선 차단 여부'],
        ['암막 중심', '수면·화면 반사·빛 조절', '제품별 차단 성능과 빛샘'],
        ['이중 구성', '채광과 프라이버시를 번갈아', '이중 레일 설치 공간'],
      ],
    },
    checklist: [
      '벽지·바닥·가구 사진 함께 보기',
      '낮과 밤의 필요 구분',
      '작은 화면보다 실제 원단 샘플 확인',
      '주름·질감·세탁 방법 상담',
    ],
    faq: [
      {
        question: '흰색 커튼이면 어떤 공간에나 어울리나요?',
        answer:
          '같은 흰색도 원단의 색온도와 비침, 주변 벽지에 따라 다르게 보입니다. 공간 사진으로 후보를 좁히고 실제 샘플로 확인하세요.',
      },
      {
        question: '암막커튼이면 빛이 완전히 사라지나요?',
        answer:
          '원단 자체 성능 외에도 상단·옆면·아래쪽 틈이 영향을 줍니다. 완전한 차단을 보장하지 않으며 제품 성능과 설치 방법을 함께 확인해야 합니다.',
      },
    ],
  },
  {
    slug: 'living-room',
    title: '거실커튼,\n빛은 들이고 시선은 편안하게.',
    navTitle: '거실커튼',
    primaryKeyword: '거실커튼',
    keywords: ['거실커튼'],
    eyebrow: 'LIVING ROOM',
    description:
      '넓은 창, TV 반사, 외부 시선까지. 거실커튼을 채광과 생활 패턴에 맞춰 고르는 간단한 가이드.',
    helperPreset: 'living',
    ctaIntent: 'helper',
    lead: '낮에 머무는 시간과 창밖 환경부터 살펴보세요.',
    points: [
      { title: '낮의 자연광', text: '밝기를 유지하려면 비침과 원단 질감을 비교하세요.' },
      { title: '창밖의 시선', text: '맞은편 건물과 야간 실내 조명 조건을 확인하세요.' },
      { title: '생활 동선', text: '발코니 출입과 TV 위치에 맞춰 열리는 방향을 정하세요.' },
    ],
    comparison: {
      heading: '우리 거실에 가까운 조건은?',
      columns: ['생활 조건', '살펴볼 구성', '실측·상담 포인트'],
      rows: [
        ['자연광을 오래 즐겨요', '쉬폰·속커튼 중심', '원단 비침과 야간 시선'],
        ['TV 반사가 신경 쓰여요', '겉커튼 또는 이중 구성', '햇빛 방향과 화면 위치'],
        ['창이 넓고 출입이 잦아요', '좌우 분할 개폐 구성', '창폭·문 위치·레일 지지'],
      ],
    },
    checklist: [
      '가로 폭이 넓으면 전체 창을 한 장으로 촬영',
      '발코니 문 여닫는 방향 확인',
      '낮·밤 시선 차단 요구 구분',
      'TV·소파·에어컨 위치 기록',
    ],
    faq: [
      {
        question: '넓은 거실 창에는 몇 폭이 필요한가요?',
        answer:
          '창폭만으로 완제품 폭수는 확정되지 않습니다. 원단 폭과 주름 방식, 분할 개폐 위치에 따라 달라지므로 전체 크기를 입력하고 상담에서 구성을 확인하세요.',
      },
      {
        question: '쉬폰만으로 사생활을 보호할 수 있나요?',
        answer:
          '원단 밀도와 실내외 밝기 차이에 따라 비침이 달라집니다. 특히 밤에 실내 조명을 켠 상태의 조건을 확인하고 필요하면 겉커튼을 함께 비교하세요.',
      },
    ],
  },
  {
    slug: 'bedroom',
    title: '침실커튼,\n내가 쉬는 시간에 맞춰.',
    navTitle: '침실커튼',
    primaryKeyword: '침실커튼',
    keywords: ['침실커튼'],
    eyebrow: 'BEDROOM',
    description:
      '침실커튼의 암막과 빛샘, 낮의 채광을 비교하세요. 수면 시간과 창 크기로 필요한 구성을 정리합니다.',
    helperPreset: 'bedroom',
    ctaIntent: 'helper',
    lead: '잠드는 시간과 일어나는 시간의 빛을 먼저 생각하세요.',
    points: [
      { title: '아침 햇빛', text: '이른 빛이 불편하면 차단 성능과 설치 틈을 살펴보세요.' },
      { title: '낮의 휴식', text: '낮잠·교대근무처럼 생활 시간에 맞춰 빛 조절을 정하세요.' },
      { title: '포근한 분위기', text: '침구·벽지에 맞는 색과 질감을 샘플로 확인하세요.' },
    ],
    comparison: {
      heading: '수면과 채광의 균형',
      columns: ['원하는 환경', '살펴볼 구성', '확인할 점'],
      rows: [
        ['아침빛을 줄이고 싶어요', '암막 겉커튼', '상단·양옆·하단의 틈'],
        ['낮에는 밝게 지내요', '쉬폰 + 겉커튼', '각 커튼을 별도로 여닫는지'],
        ['방이 작고 가구가 가까워요', '간결한 커튼 또는 블라인드', '손잡이·침대와의 간섭'],
      ],
    },
    checklist: [
      '잠드는 시간과 눈부신 시간 기록',
      '창 주변 틈과 커튼박스 촬영',
      '침대·협탁·난방기 위치 확인',
      '차단율 표시와 관리 방법 문의',
    ],
    faq: [
      {
        question: '암막률 숫자만 비교하면 되나요?',
        answer:
          '제품에 표시된 시험 조건과 설치 상태를 함께 봐야 합니다. 도우미는 암막률을 계산하지 않으며 실제 원단 성능과 빛샘 대책은 상담에서 확인하세요.',
      },
      {
        question: '침실에도 쉬폰을 넣어야 하나요?',
        answer:
          '필수는 아닙니다. 낮에 채광을 즐기면서 커튼을 닫아두고 싶다면 이중 구성을, 주로 수면용이라면 겉커튼 중심 구성을 비교해 보세요.',
      },
    ],
  },
  {
    slug: 'newlywed-home',
    title: '신혼집커튼,\n한 집의 분위기를 연결하세요.',
    navTitle: '신혼집커튼',
    primaryKeyword: '신혼집커튼',
    keywords: ['신혼집커튼'],
    eyebrow: 'A NEW HOME',
    description:
      '거실부터 침실까지 신혼집커튼을 공간별로 정리하세요. 통일된 분위기, 각 방의 기능, 입주 준비를 함께 확인합니다.',
    helperPreset: 'newlywed',
    ctaIntent: 'helper',
    lead: '색감은 이어주고, 기능은 방마다 다르게.',
    points: [
      { title: '거실은 개방감', text: '자연광·손님·발코니 동선을 함께 생각하세요.' },
      { title: '침실은 편안함', text: '빛 차단과 사생활 보호의 우선순위를 정하세요.' },
      { title: '설치는 일정에 맞춰', text: '입주·가구 반입·실측 가능일을 함께 확인하세요.' },
    ],
    comparison: {
      heading: '공간별로 한 번에 정리',
      columns: ['공간', '먼저 정할 것', '함께 준비할 것'],
      rows: [
        ['거실', '채광과 시선 차단', '창 전체 사진·소파 색'],
        ['침실', '수면 시간과 빛 조절', '침구 색·침대 위치'],
        ['작은방', '서재·드레스룸 등 용도', '책상·가구 배치'],
        ['집 전체', '색감과 설치 일정', '공간별 창 치수 목록'],
      ],
    },
    checklist: [
      '각 방을 구분해 치수 기록',
      '벽지·바닥·가구 색을 함께 확인',
      '시공 완료 후 실측 가능일 문의',
      '희망 설치일과 제작 일정 협의',
    ],
    faq: [
      {
        question: '모든 방의 커튼을 같게 해야 하나요?',
        answer:
          '필수는 아닙니다. 색 계열이나 질감을 이어주면서 거실은 채광, 침실은 수면처럼 방마다 기능을 달리 선택할 수 있습니다.',
      },
      {
        question: '입주 전에 언제 문의해야 하나요?',
        answer:
          '정해진 공통 제작 기간은 없습니다. 입주 예정일과 실측 가능한 시점을 알려주고 원단 재고·제작·설치 일정을 업체에 확인하세요.',
      },
    ],
  },
];

export interface ContentPost {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  category: string;
  ctaIntent: CtaIntent;
  helperPreset: RoomType;
  relatedPosts: string[];
  date: string;
  html: string;
  href: string;
}

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}
export function helperHref(preset: RoomType = 'other') {
  return `/?room=${preset}#helper`;
}
export function applyHref(category: string, placement: string, from: string) {
  return `/go/quote?${new URLSearchParams({ category, placement, from }).toString()}`;
}

const postsDirectory = path.join(process.cwd(), 'content', 'posts');
let postsPromise: Promise<ContentPost[]> | undefined;

async function loadPosts(): Promise<ContentPost[]> {
  const files = (await fs.readdir(postsDirectory)).filter((file) => file.endsWith('.md')).sort();
  const posts = await Promise.all(
    files.map(async (file) => {
      const { data, content } = matter(await fs.readFile(path.join(postsDirectory, file), 'utf8'));
      const slug = file.slice(0, -3);
      const category = getCategory(data.category);
      if (!category || !['helper', 'apply'].includes(data.ctaIntent))
        throw new Error(`Invalid content category or CTA: ${file}`);
      for (const field of ['title', 'description', 'primaryKeyword', 'date']) {
        if (typeof data[field] !== 'string' || !data[field])
          throw new Error(`Missing ${field}: ${file}`);
      }
      if (!Array.isArray(data.relatedKeywords) || !Array.isArray(data.relatedPosts))
        throw new Error(`Missing related content: ${file}`);
      if (!['living', 'bedroom', 'newlywed', 'other'].includes(data.helperPreset))
        throw new Error(`Invalid room preset: ${file}`);
      const rendered = await remark().use(html, { sanitize: true }).process(content);
      return {
        slug,
        title: data.title,
        description: data.description,
        primaryKeyword: data.primaryKeyword,
        relatedKeywords: data.relatedKeywords,
        category: category.slug,
        ctaIntent: data.ctaIntent,
        helperPreset: data.helperPreset,
        relatedPosts: data.relatedPosts,
        date: data.date,
        html: String(rendered),
        href: `/guides/${category.slug}/${slug}`,
      } as ContentPost;
    }),
  );
  const slugs = new Set(posts.map((post) => post.slug));
  for (const post of posts) {
    if (post.relatedPosts.some((slug) => !slugs.has(slug)))
      throw new Error(`Broken related post on ${post.slug}`);
  }
  return posts;
}

export async function getPosts(category?: string): Promise<ContentPost[]> {
  // Read afresh in development so editors see Markdown changes immediately.
  const all =
    process.env.NODE_ENV === 'development'
      ? await loadPosts()
      : await (postsPromise ??= loadPosts());
  return category ? all.filter((post) => post.category === category) : all;
}
export async function getPost(category: string, slug: string) {
  return (await getPosts(category)).find((post) => post.slug === slug);
}
export async function getRelatedPosts(post: ContentPost) {
  const all = await getPosts();
  return post.relatedPosts
    .map((slug) => all.find((item) => item.slug === slug))
    .filter((item): item is ContentPost => Boolean(item));
}
