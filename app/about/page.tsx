import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs, GuideStructuredData } from '@/components/guide-ui';
import { absoluteUrl, site } from '@/lib/site';
import { AffiliateLink } from '@/components/affiliate-link';
import '../guides/guides.css';

export const metadata: Metadata = {
  title: '서비스 소개 | 커튼 선택을 더 쉽게',
  description: `${site.name}의 이용 방법, 브라우저 저장과 제휴 상담 연결을 안내합니다.`,
  alternates: { canonical: absoluteUrl('/about') },
  openGraph: {
    title: `커튼 선택을 더 쉽게 | ${site.name}`,
    siteName: site.name,
    description: '내 공간을 알아가는 견적 도우미와 커튼 가이드.',
    url: absoluteUrl('/about'),
    images: ['/images/curtain-natural.webp'],
  },
};

export default function AboutPage() {
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={[{ name: '서비스 소개', href: '/about' }]} />
        <div className="guide-about-content">
          <header className="guide-about-intro">
            <h1>
              막연했던 커튼 선택을,
              <br />
              우리 집 이야기로.
            </h1>
            <p>
              {site.name}는 창 크기와 생활 방식으로 커튼 선택을 돕습니다. 필요한 조건을 먼저
              정리하고, 제휴 상담에서 다음 단계를 이어가세요.
            </p>
          </header>
          <div className="guide-about-panels">
            <section className="guide-about-panel">
              <h2>상담할 내용을 정리해요</h2>
              <p>
                창의 가로·세로와 자연광·암막·시선 보호·빛 조절 중 필요한 기능을 정리합니다. 상담
                전에 원하는 조건을 살펴보고 저장한 견적을 참고할 수 있습니다.
              </p>
            </section>
            <section className="guide-about-panel">
              <h2>내 브라우저에 저장해요</h2>
              <p>
                입력한 내용은 이 브라우저에 견적 하나로 자동 저장됩니다. 시작하기를 누르면 마지막
                작성 내용을 이어서 볼 수 있습니다. 다른 기기와 자동으로 동기화되지 않으며 브라우저
                데이터를 지우면 사라질 수 있습니다.
              </p>
            </section>
            <section className="guide-about-panel">
              <h2>견적 상담을 준비해요</h2>
              <p>
                저장한 견적은 상담할 치수와 필요한 기능을 정리한 내용입니다. 입력 치수는 상담
                참고용이며 제작 크기, 원단, 설치 조건과 최종 금액은 실측·제휴 상담에서 확인합니다.
              </p>
            </section>
            <section className="guide-about-panel">
              <h2>제휴 페이지로 연결해요</h2>
              <p>
                견적 문의 버튼은 <AffiliateLink cta="home-direct">제휴 신청 페이지</AffiliateLink>로
                연결됩니다. 해당 링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다. 요청서
                내용은 자동 전송되지 않으니 상담 시 직접 공유하세요.
              </p>
            </section>
          </div>
          <section className="guide-about-more">
            <h2>도움이 되는 정보부터 담습니다</h2>
            <p>
              가이드는 실측 준비, 공간별 선택 기준, 견적 비교 항목을 안내합니다. 가격·설치 지역·제작
              일정·AS 조건은 연결된 업체에 확인하세요. 이 사이트는 여러 업체의 가격 비교나 직접
              시공을 제공하지 않습니다.
            </p>
          </section>
          <div className="guide-cta">
            <div>
              <h2>우리 집 창에서 시작해 보세요.</h2>
              <p>공간과 크기, 원하는 느낌만 있으면 됩니다.</p>
            </div>
            <Link href="/#helper" className="button button-primary">
              도우미 시작 <ArrowRight size={17} />
            </Link>
          </div>
        </div>
        <GuideStructuredData items={[{ name: '서비스 소개', href: '/about' }]} />
      </div>
    </main>
  );
}
