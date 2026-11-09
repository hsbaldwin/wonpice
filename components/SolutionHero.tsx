import {
  ArrowDown,
  ExternalLink,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

export default function SolutionHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 border-b border-[#e8eaed]"
    >
      {/* Subtle Studio Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#e8f0fe]/60 via-[#e6f4ea]/30 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill Badge - Calm and understated */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-8 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
          <span>2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) - Clean Google Sans style */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-normal text-[#202124] tracking-tight leading-[1.14] mb-6 sm:mb-8 max-w-5xl mx-auto">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] font-medium"> 내 브랜드를 키우는 자사몰 솔루션</span>
        </h1>

        {/* Subtitle - Informative & natural */}
        <p className="text-[#5f6368] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12 font-normal">
          스마트스토어와 오픈마켓의 과도한 중개 수수료에서 벗어나 내 고객을 직접 소유하세요.
          <br className="hidden md:inline" />
          농가·식품부터 패션 브랜드까지, 업종에 맞는 테마 디자인과 상품 100개 등록,
          <br className="hidden md:inline" />
          토스페이먼츠 간편결제 연동까지 3~5주 만에 원스톱으로 완성합니다.
        </p>

        {/* Dual Actions - Refined pill buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16 sm:mb-20 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-sm sm:text-base shadow-xs hover:shadow transition-colors cursor-pointer"
          >
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#1a73e8] font-medium text-sm sm:text-base border border-[#dadce0] transition-colors cursor-pointer shadow-xs"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* 4-Column KPI Metric Ribbon with Precision Baseline Alignment */}
        <div data-testid="metrics-ribbon" className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-3xl lg:rounded-full p-6 lg:py-5 lg:px-8 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#dadce0] gap-y-6 lg:gap-y-0">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-medium text-[#5f6368] h-4 flex items-center">자사몰 제작비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">
                    75만 원부터
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 프로모션가
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-medium text-[#5f6368] h-4 flex items-center">월 고정 유지비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">
                    10만 원
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] text-[#5f6368]">서버·자동 백업·3중 모니터링</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-medium text-[#5f6368] h-4 flex items-center">추가 중개 수수료</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#1a73e8] tracking-tight">
                    0원 (0%)
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] text-[#5f6368]">토스 PG 직접 계약 · 판매 수수료 0%</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-medium text-[#5f6368] h-4 flex items-center">제작 소요 기간</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">
                    3~5주 완성
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] text-[#5f6368]">PG 심사 대행 + 상품 100개 등록</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars (The Trinity of Growth) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-mono font-medium mb-3">
            <span>The Trinity of Growth · 3대 본질 기둥</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-normal text-[#202124] tracking-tight">
            성장과 자립을 완성하는 3가지 본질적 조화
          </h2>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28 items-stretch"
        >
          {/* Card 1: Monad */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6] shrink-0">
                  Pillar I · 독립 (The Monad)
                </span>
              </div>
              <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center">
                플랫폼 중개 수수료 0%
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px]">
                오픈마켓의 8~13% 중개 수수료 대신, 토스페이먼츠 직접 계약으로 투명한 PG 결제 수수료(2~3%)만 지출되어 유통 마진을 효과적으로 개선할 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#137333] font-semibold text-sm">01</span>
              <span>수수료 종속 탈피와 마진의 온전한 회복</span>
            </div>
          </div>

          {/* Card 2: Dyad */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc] shrink-0">
                  Pillar II · 소유 (The Dyad)
                </span>
              </div>
              <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center">
                고객 DB 직접 소유
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px]">
                플랫폼 가상번호 대신 고객의 연락처와 구매 내역을 직접 소유하여, 플랫폼 제약 없이 재구매 프로모션을 직접 기획하고 운영합니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#1a73e8] font-semibold text-sm">02</span>
              <span>단골 고객과의 1:1 직접 관계 자산화</span>
            </div>
          </div>

          {/* Card 3: Triad */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#b06000] bg-[#fef7e0] px-3 py-1 rounded-full border border-[#feefc3] shrink-0">
                  Pillar III · 영속 (The Triad)
                </span>
              </div>
              <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center">
                체계적인 인프라 운영 관리
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px]">
                매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에 집중하실 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#b06000] font-semibold text-sm">03</span>
              <span>24/7 중단 없는 브랜드 지속 가능성 확보</span>
            </div>
          </div>
        </div>

        {/* Contextual Transition Bridge to Section 02 (Showcase) */}
        <div className="mt-16 sm:mt-20 pt-4">
          <a
            href="#showcase"
            className="group block w-full max-w-7xl mx-auto bg-gradient-to-r from-[#f8f9fa] via-white to-[#f8f9fa] border border-[#dadce0] rounded-3xl p-6 sm:p-8 text-left shadow-xs hover:border-[#1a73e8]/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    Next Chapter · 02
                  </span>
                  <span className="text-xs font-medium text-[#5f6368]">
                    라이브 데모 쇼케이스
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors flex items-center gap-1.5">
                  <span>3대 본질 가치가 실제 내 업종 쇼핑몰에 어떻게 구현될까요?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5f6368]">
                  대지의 신선도를 전하는 <strong>식품(제철곳간)</strong>과 핏과 감각의 <strong>패션(온결)</strong> 실제 구축 화면 둘러보기
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#1a73e8] bg-white border border-[#dadce0] px-5 py-2.5 rounded-full group-hover:bg-[#1a73e8] group-hover:text-white transition-all shadow-xs inline-flex items-center gap-2">
                  <span>02 라이브 데모 확인</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
