import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Check, Ruler, Layers3, ClipboardCheck } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { QuoteHelper } from '@/components/quote-helper';
import { LoopVideo } from '@/components/loop-video';
import { AffiliateLink } from '@/components/affiliate-link';
import { absoluteUrl, site } from '@/lib/site';
import { getGuideImage } from '@/lib/guide-images';
import './helper-fit.css';
import './home.css';

export const metadata = pageMetadata({
  title: '커튼 견적 상담 준비: 치수·원단·설치 조건 정리',
  description: site.description,
  path: '/',
  image: getGuideImage('living-room'),
});
const spaces = [
  {
    title: '거실 커튼',
    description: '채광과 TV 반사, 낮과 밤의 시선을 함께 살펴요.',
    slug: 'living-room',
    tag: '햇살과 생활 동선',
  },
  {
    title: '침실 커튼',
    description: '수면 시간과 빛이 들어오는 위치부터 확인해요.',
    slug: 'bedroom',
    tag: '편안한 잠을 위한 조건',
  },
  {
    title: '신혼집 커튼',
    description: '방마다 필요한 기능을 나누고 입주 순서를 정해요.',
    slug: 'newlywed-home',
    tag: '두 사람의 공간 계획',
  },
];
const essentials = [
  {
    icon: Ruler,
    label: '01 · 실측',
    title: '커튼 사이즈 재는 법',
    description: '창문 크기와 커튼이 덮을 범위, 제작 치수를 구분하세요.',
    href: '/guides/installation/measurement-basics',
  },
  {
    icon: Layers3,
    label: '02 · 원단',
    title: '쉬폰·암막·이중커튼 비교',
    description: '낮의 채광과 밤의 비침을 비교하고 필요한 구성을 살펴보세요.',
    href: '/guides/interior/fabric-layers',
  },
  {
    icon: ClipboardCheck,
    label: '03 · 가격 조건',
    title: '맞춤커튼 가격이 달라지는 이유',
    description:
      '창 크기와 원단, 주름·겹수, 부자재와 설치 범위가 금액에 어떻게 반영되는지 확인하세요.',
    href: '/guides/companies/curtain-cost-factors',
  },
  {
    icon: ClipboardCheck,
    label: '04 · 견적 비교',
    title: '커튼 견적 비교 방법',
    description: '원단·레일·설치비의 포함 여부를 같은 조건으로 확인하세요.',
    href: '/guides/companies/quote-comparison',
  },
];
const faq = [
  {
    question: '창 치수를 몰라도 견적 상담을 신청할 수 있나요?',
    answer:
      '치수 정리는 상담 준비를 돕는 선택 과정입니다. 치수를 아직 모르면 바로 견적 신청 페이지로 이동해 상담할 수 있습니다. 최종 제작 규격과 설치 조건은 실측 및 상담에서 확인하세요.',
  },
  {
    question: '도우미에서 커튼 가격을 계산해 주나요?',
    answer:
      '도우미는 창의 가로·세로와 필요한 기능을 정리합니다. 금액을 계산하거나 여러 업체의 가격을 실시간으로 비교하지 않습니다. 원단, 제작 규격, 레일과 설치 범위에 따른 실제 견적은 상담에서 확인합니다.',
  },
  {
    question: '입력한 내용은 어디에 저장되나요?',
    answer:
      '현재 견적 하나를 이 브라우저에 저장합니다. 같은 브라우저로 다시 방문하면 이어서 확인할 수 있습니다. 다른 기기와 자동으로 동기화되지 않으며 브라우저 데이터를 삭제하면 기록이 사라질 수 있습니다.',
  },
  {
    question: '견적 신청은 어떻게 하나요?',
    answer:
      '무료 견적 신청 버튼을 누르면 외부 신청 페이지로 이동합니다. 해당 페이지에서 신청 정보와 동의 내용을 확인하면 됩니다. 치수 도우미를 사용하지 않아도 바로 신청할 수 있습니다.',
  },
  {
    question: '무료 견적 신청 후 어떤 내용을 확인하나요?',
    answer:
      '외부 신청 페이지에서 이름·연락처·제품 종류·창문 개수·설치 주소와 동의 내용을 확인합니다. 이후 상담에서 원단, 최종 규격, 금액과 일정을 확인합니다. 무료 신청 안내가 제품·시공·방문 실측 비용 면제를 뜻하지는 않습니다.',
  },
  {
    question: '사진은 실제 시공 사례인가요?',
    answer:
      '가이드의 사진은 공간과 구성의 이해를 돕기 위해 AI로 만든 예시입니다. 실제 시공 후기나 제품 성능 자료가 아닙니다. 측정 기준과 설치 조건은 본문의 설명·도해와 제품 사양을 함께 확인하세요.',
  },
];
export default function Home() {
  return (
    <main id="main" data-home-content>
      <section id="home-intro" className="home-hero" aria-labelledby="home-title">
        <LoopVideo
          className="home-hero-background"
          src="/videos/curtain-helper-daylight.mp4"
          mobileSrc="/videos/curtain-helper-daylight-mobile.mp4"
          poster="/images/curtain-helper-daylight-poster.webp"
          mobilePoster="/images/curtain-helper-daylight-mobile-poster.webp"
          priority
        />
        <div className="container home-hero-content">
          <span className="home-eyebrow">우리 집 창에서 시작하는 선택</span>
          <h1 id="home-title">
            커튼 견적,
            <br />
            필요한 조건부터
            <br className="home-mobile-break" /> 정리해보세요.
          </h1>
          <p className="home-hero-description">
            맞춤커튼 견적은 창 크기와 원단, 겹수, 레일·설치 범위에 따라 달라집니다. 필요한 조건을
            정리하고 우리 집에 맞는 상담을 준비하세요.
          </p>
          <div className="home-actions">
            <AffiliateLink cta="home-hero" className="button button-primary">
              무료 견적 신청 <ArrowUpRight size={18} aria-hidden="true" />
            </AffiliateLink>
            <a className="button button-secondary" href="#helper">
              치수 먼저 정리하기 <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
          <p className="home-action-note">
            치수를 몰라도 상담할 수 있어요 · 견적 신청은 외부 페이지에서 진행합니다.
          </p>
          <a className="home-explore" href="#home-spaces">
            공간별 선택 기준 살펴보기 <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>
      <div className="container home-body">
        <section className="home-helper-section" aria-label="치수와 기능 정리 도구">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">상담 준비 도우미</span>
              <p className="home-section-intro">
                알고 있는 만큼 적어두면,
                <br />
                상담할 내용이 분명해져요.
              </p>
            </div>
            <p>
              창 치수와 필요한 기능을 정리해 보세요.
              <br />
              작성 내용은 이 브라우저에 저장됩니다.
            </p>
          </div>
          <QuoteHelper />
        </section>
        <section id="home-spaces" className="home-section" aria-labelledby="spaces-title">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">공간별 커튼 가이드</span>
              <h2 id="spaces-title">어떤 공간을 준비하시나요?</h2>
            </div>
            <Link className="home-text-link" href="/guides">
              모든 가이드 <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
          <div className="home-space-grid">
            {spaces.map((s) => {
              const image = getGuideImage(s.slug);
              return (
                <Link href={`/guides/${s.slug}`} className="home-space-card" key={s.slug}>
                  <div className="home-space-image">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 700px) calc(100vw - 48px), (max-width: 1280px) 30vw, 389px"
                    />
                  </div>
                  <div className="home-space-copy">
                    <span className="home-card-tag">{s.tag}</span>
                    <h3>
                      {s.title} <ArrowUpRight size={20} aria-hidden="true" />
                    </h3>
                    <p>{s.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="home-image-caption">
            AI로 만든 공간별 스타일 예시입니다. 실제 시공 사례나 제품 성능 자료가 아닙니다.
          </p>
        </section>
        <section id="home-essentials" className="home-section" aria-labelledby="essentials-title">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">실측·원단·가격·견적 비교</span>
              <h2 id="essentials-title">커튼 견적 전에 확인할 네 가지</h2>
            </div>
          </div>
          <div className="home-essential-grid">
            {essentials.map((item) => (
              <Link key={item.href} href={item.href} className="home-essential-card">
                <div className="home-essential-top">
                  <span>{item.label}</span>
                  <item.icon size={25} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span className="home-card-link">
                  기준 살펴보기 <ArrowRight size={17} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
        <section
          id="home-process"
          className="home-section home-process"
          aria-labelledby="process-title"
        >
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">준비에서 상담까지</span>
              <h2 id="process-title">신청은 이렇게 이어집니다.</h2>
            </div>
            <Link className="home-text-link" href="/about#application-process">
              절차 자세히 보기 <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <ol className="home-process-grid">
            {[
              [
                '필요한 조건 정리',
                '치수와 원하는 기능을 정리하세요. 치수를 모르면 상담에서 확인할 수 있습니다.',
              ],
              [
                '외부 페이지에서 신청',
                '무료 견적 신청을 누른 뒤 신청 정보와 동의 내용을 확인하세요.',
              ],
              [
                '제품·금액·일정 상담',
                '상담에서 원단과 최종 규격, 설치비 포함 여부와 일정을 확인하세요.',
              ],
            ].map(([title, description], i) => (
              <li key={title}>
                <span className="home-process-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
          <p className="home-process-note">
            <Check size={17} aria-hidden="true" /> 치수를 입력하지 않아도 바로 견적을 신청할 수
            있습니다.
          </p>
        </section>
        <section id="home-faq" className="home-section home-faq" aria-labelledby="faq-title">
          <div className="home-section-heading">
            <div>
              <span className="home-eyebrow">신청 전 궁금한 점</span>
              <h2 id="faq-title">미리 확인하세요.</h2>
            </div>
          </div>
          <div className="home-faq-list">
            {faq.map((item) => (
              <details key={item.question}>
                <summary>
                  {item.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="home-inquiry"
          className="home-section home-inquiry"
          aria-labelledby="inquiry-title"
        >
          <span className="home-eyebrow">이제, 우리 집 조건으로</span>
          <h2 id="inquiry-title">
            준비한 내용으로
            <br />
            견적 상담을 이어가세요.
          </h2>
          <p>
            원단과 레일, 설치 범위까지 같은 조건으로 확인하세요.
            <br />
            치수는 상담에서 함께 확인할 수 있습니다.
          </p>
          <div className="home-actions">
            <AffiliateLink cta="home-final" className="button button-primary">
              무료 견적 신청 <ArrowUpRight size={18} aria-hidden="true" />
            </AffiliateLink>
            <a href="#helper" className="home-text-link">
              치수 정리로 돌아가기 <ArrowRight size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="home-action-note">
            외부 견적 신청 페이지로 이동합니다. 이 링크를 통한 신청으로 운영자에게 수수료가 발생할
            수 있습니다.
          </p>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': absoluteUrl('/#website'),
            name: site.name,
            url: absoluteUrl(),
            description: site.description,
            inLanguage: 'ko-KR',
            publisher: {
              '@type': 'Organization',
              '@id': absoluteUrl('/#publisher'),
              name: site.name,
              url: absoluteUrl('/'),
            },
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
