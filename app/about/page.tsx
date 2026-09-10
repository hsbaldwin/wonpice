import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs, GuideStructuredData } from '@/components/guide-ui';
import { site } from '@/lib/site';
import { pageMetadata } from '@/lib/seo';
import { AffiliateLink } from '@/components/affiliate-link';
import { GuideImage } from '@/components/guide-image';
import { getGuideImage } from '@/lib/guide-images';
import '../guides/guides.css';

export const metadata = pageMetadata({
  title: '서비스 안내: 커튼 견적 준비와 이용 방법',
  description: `${site.name}의 치수·기능 정리, 브라우저 저장, 견적 신청 절차와 서비스 범위를 안내합니다.`,
  path: '/about',
  image: getGuideImage('companies'),
});

export default function AboutPage() {
  return (
    <main id="main" className="guide-main">
      <div className="container">
        <Breadcrumbs items={[{ name: '서비스 안내', href: '/about' }]} />
        <div className="guide-about-content">
          <header className="guide-about-intro guide-about-editorial">
            <div className="guide-about-copy">
              <span className="eyebrow">상담 전, 준비하는 시간</span>
              <h1>
                커튼 견적 도우미,
                <br />
                이렇게 이용하세요.
              </h1>
              <p>
                {site.name}는 창 치수와 필요한 기능을 정리하는 상담 준비 도구입니다. 실측·원단·설치
                가이드를 읽고 원하는 조건을 저장한 뒤 견적 신청 페이지에서 상담을 이어가세요.
              </p>
            </div>
            <GuideImage
              category="companies"
              className="guide-about-cover"
              sizes="(max-width: 800px) calc(100vw - 48px), 456px"
              preload
            />
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
                입력한 내용은 이 브라우저에 견적 하나로 자동 저장됩니다. 홈의 치수·기능 도우미에서
                마지막 작성 내용을 이어서 볼 수 있습니다. 다른 기기와 자동으로 동기화되지 않으며
                브라우저 데이터를 지우면 사라질 수 있습니다.
              </p>
            </section>
            <section className="guide-about-panel">
              <h2>견적 상담을 준비해요</h2>
              <p>
                저장한 견적은 상담할 치수와 필요한 기능을 정리한 내용입니다. 입력 치수는 상담
                참고용이며 제작 크기, 원단, 설치 조건과 최종 금액은 실측 및 견적 상담에서
                확인합니다.
              </p>
            </section>
            <section className="guide-about-panel">
              <h2>견적 신청 페이지로 연결해요</h2>
              <p>
                무료 견적 신청 버튼은{' '}
                <AffiliateLink cta="home-direct">견적 신청 페이지</AffiliateLink>로 연결됩니다. 이
                링크를 통한 신청으로 운영자에게 수수료가 발생할 수 있습니다. 신청 페이지에서 정보를
                입력하고 동의 내용을 확인하세요.
              </p>
            </section>
          </div>
          <section id="application-process" className="guide-about-more">
            <h2>신청 절차와 준비할 정보</h2>
            <ol>
              <li>원한다면 치수와 필요한 기능을 도우미에서 확인합니다. 바로 신청해도 됩니다.</li>
              <li>
                <AffiliateLink cta="home-direct">무료 견적 신청</AffiliateLink>을 누르면 견적 신청
                페이지로 이동합니다.
              </li>
              <li>
                이름·연락처·제품 종류(커튼·블라인드·커튼+블라인드)·창문 개수·설치 주소를 입력하고
                동의 내용을 확인합니다.
              </li>
              <li>이후 상담에서 준비한 치수·사진·요구사항과 제품·설치 조건을 확인합니다.</li>
            </ol>
            <p>
              입력한 치수와 요구사항은 신청 양식에 자동 전달되지 않습니다. 신청자의
              이름·연락처·주소는 이 사이트의 방문 통계에 수집하지 않습니다.
            </p>
            <p>
              참고 출처: 연결된 커튼명장 견적 신청 양식의 입력 항목과 안내(2026.09.09 확인). 양식과
              제공 범위는 변경될 수 있으므로 신청 페이지의 최신 안내를 확인하세요. 가이드의 비교표와
              작성 예시는 {site.name}의 자체 편집 자료입니다.
            </p>
          </section>
          <section id="analytics" className="guide-about-more">
            <h2>방문 통계는 이렇게 사용합니다</h2>
            <p>
              서비스 개선을 위해 방문한 페이지, 첫 방문 페이지, 유입 경로 분류, 화면 활성 시간의
              30초·60초 도달, 스크롤 25·50·75·90% 도달, 도우미 단계 진행, 입력 확인 오류 발생,
              브라우저 저장 성공·복원·오류, 신청 버튼 노출·클릭을 기록합니다. 브라우저 탭에 저장하는
              임의의 세션 식별자로 방문을 구분하며, 이름·연락처·주소·입력 치수·자유 입력 내용은
              통계에 저장하지 않습니다. 전체 유입 주소와 검색어도 저장하지 않습니다.
            </p>
            <p>
              방문 이벤트는 최근 180일 범위로 보관하며, 저장소 접근 시 하루 간격으로 오래된 기록을
              정리합니다. 날짜별 신청·승인 건수는 개인 정보 없이 별도로 관리합니다. 브라우저
              저장이나 JavaScript가 차단된 경우 일부 방문은 집계되지 않을 수 있습니다.
            </p>
          </section>
          <section className="guide-about-more">
            <h2>도움이 되는 정보부터 담습니다</h2>
            <p>
              가이드는 실측 준비, 공간별 선택 기준, 견적 비교 항목을 안내합니다. 가격·설치 지역·제작
              일정·AS 조건은 연결된 업체에 확인하세요. 이 사이트는 여러 업체의 가격 비교나 직접
              시공을 제공하지 않습니다.
            </p>
          </section>
          <section id="editorial-method" className="guide-about-more">
            <h2>가이드는 이렇게 편집합니다</h2>
            <p>
              실측 준비, 원단 선택, 설치 조건과 견적 상담에서 자주 확인하는 질문을 중심으로 글을
              구성합니다. 제품에 관한 설명은 해당 제조사·판매자의 안내를 확인하고 본문에 참고 출처를
              연결합니다. 사례를 설명하기 위해 만든 수치와 양식은 예시임을 표시하며, 검증된 자료
              없이 평균 가격이나 설치 소요 기간을 제시하지 않습니다.
            </p>
            <p>
              각 글의 발행일과 수정일은 본문 상단에 표시합니다. 제품 사양과 현장 조건이 다른 경우
              상담에서 최신 안내를 확인하세요. 자료를 고치면 관련 설명과 상담 문구도 함께
              점검합니다.
            </p>
          </section>
          <section id="image-policy" className="guide-about-more">
            <h2>이미지와 설명 그림의 기준</h2>
            <p>
              공간·원단 이미지는 AI로 만든 스타일 예시이며 이미지 아래에 표시합니다. 실제 고객의 집,
              직접 시공한 사례, 판매 제품의 사진 또는 측정한 차광 성능을 뜻하지 않습니다. 색과
              질감은 선택할 제품의 실제 샘플로 확인하세요.
            </p>
            <p>
              측정 시작점, 레일 구성, 빛샘 위치와 준비 순서는 직접 작성한 도해와 표로 설명합니다.
              예시 수치를 쓰는 경우 적용 범위를 함께 적으며, 제작 치수나 고정 방식은 제품 정보와
              현장 확인을 통해 확정해야 합니다.
            </p>
          </section>
          <div className="guide-cta">
            <div>
              <h2>준비한 조건으로 상담을 이어가세요.</h2>
              <p>신청 페이지에서 제품 종류와 설치할 창 정보를 입력할 수 있습니다.</p>
              <p className="guide-cta-note">
                신청 정보는 외부 신청 페이지에서 입력합니다. 링크를 통한 신청으로 운영자에게
                수수료가 발생할 수 있습니다.
              </p>
            </div>
            <div className="guide-cta-actions">
              <AffiliateLink cta="about-bottom" className="button button-primary">
                무료 견적 신청 <ArrowRight size={17} aria-hidden="true" />
              </AffiliateLink>
              <Link href="/#helper" className="guide-simple-link">
                치수 먼저 정리하기 <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <GuideStructuredData items={[{ name: '서비스 안내', href: '/about' }]} />
      </div>
    </main>
  );
}
