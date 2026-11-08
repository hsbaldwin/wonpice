import { ArrowDown, Check, ExternalLink, Lock, ShieldCheck, Users, Zap } from "lucide-react";

export default function SolutionHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-32 sm:pb-32 lg:pt-36 lg:pb-36 border-b border-[#e8eaed]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill Badge */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-8 sm:mb-10 shadow-xs"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1e8e3e]" />
          <span>2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) with Google Store Scale */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#202124] tracking-tight leading-[1.12] mb-6 sm:mb-8 max-w-5xl mx-auto">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] font-medium"> 내 브랜드를 키우는 자사몰 솔루션</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#5f6368] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-10 sm:mb-12 font-normal">
          스마트스토어와 오픈마켓의 과도한 중개 수수료에서 벗어나 내 고객을 직접 소유하세요.
          <br className="hidden md:inline" />
          농가·식품부터 패션 브랜드까지, 업종에 꼭 맞는 테마 디자인과 상품 100개 등록,
          <br className="hidden md:inline" />
          토스페이먼츠 간편결제 연동까지 3~5주 만에 원스톱으로 완성합니다.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-14 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-base shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4.5 h-4.5 opacity-90" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#f8f9fa] text-[#1a73e8] font-medium text-base border border-[#dadce0] transition-all cursor-pointer shadow-xs hover:border-[#1a73e8]/40"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4.5 h-4.5 opacity-70" />
          </a>
        </div>

        {/* Studio Hardware & Browser Mockup Showcase Stage */}
        <div
          data-testid="device-mockup"
          className="max-w-5xl mx-auto mb-16 sm:mb-20 rounded-3xl lg:rounded-[32px] border border-[#dadce0] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.06)] overflow-hidden text-left"
        >
          {/* Browser Top Chrome */}
          <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ea4335]" />
              <span className="w-3 h-3 rounded-full bg-[#fbbc04]" />
              <span className="w-3 h-3 rounded-full bg-[#34a853]" />
              <span className="w-3 h-3 rounded-full bg-[#dadce0] hidden" />
            </div>

            {/* URL Bar */}
            <div className="flex-1 max-w-md mx-auto bg-white border border-[#dadce0] rounded-full px-3.5 py-1 flex items-center justify-center gap-2 text-xs shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#1e8e3e] shrink-0" />
              <span className="text-xs text-[#5f6368] font-mono truncate">
                https://shop-site-950864605215.asia-northeast3.run.app
              </span>
            </div>

            {/* Live Engine Status Badge */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-[#137333] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#1e8e3e] animate-pulse" />
              <span>라이브 엔진 가동 중</span>
            </div>
          </div>

          {/* Floating Google 4-Color Chip Badges Bar */}
          <div className="bg-[#f8f9fa]/80 border-b border-[#dadce0] px-4 sm:px-5 py-2.5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#d2e3fc] bg-[#e8f0fe] text-[#1a73e8] text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>추가 중개 수수료 0%</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#ceead6] bg-[#e6f4ea] text-[#137333] text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>3~5주 완성 원스톱 런칭</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#feefc3] bg-[#fef7e0] text-[#b06000] text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>구축비 50% 프로모션</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#fad2cf] bg-[#fce8e6] text-[#c5221f] text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>업종 맞춤 테마 제공</span>
            </span>
          </div>

          {/* Studio Preview Interior */}
          <div className="p-6 sm:p-8 bg-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#e8eaed] gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2 py-0.5 rounded">
                    v2026.11
                  </span>
                  <h4 className="font-medium text-[#202124] text-base sm:text-lg">
                    WonPice Commerce Engine v2026
                  </h4>
                </div>
                <p className="text-xs text-[#5f6368]">
                  식품·농가(제철곳간) 및 패션·디자이너(온결) 업종별 전용 테마 맞춤 지원
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-xs text-[#3c4043] shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
                <span>클라우드 런 정상 배포됨</span>
              </div>
            </div>

            {/* 3 Real-time Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
              <div className="bg-[#f8f9fa] p-5 sm:p-6 rounded-2xl border border-[#dadce0] transition-all hover:border-[#1a73e8]/30">
                <span className="text-xs font-medium text-[#5f6368]">일간 실시간 결제액</span>
                <div className="text-2xl sm:text-3xl font-medium text-[#202124] mt-2 mb-1">₩ 4,820,000</div>
                <div className="inline-flex items-center gap-1 text-xs text-[#137333] font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>오픈마켓 중개 수수료 절감</span>
                </div>
              </div>

              <div className="bg-[#f8f9fa] p-5 sm:p-6 rounded-2xl border border-[#dadce0] transition-all hover:border-[#1a73e8]/30">
                <span className="text-xs font-medium text-[#5f6368]">토스 간편결제 연동</span>
                <div className="text-2xl sm:text-3xl font-medium text-[#1a73e8] mt-2 mb-1">안정적 승인</div>
                <div className="inline-flex items-center gap-1 text-xs text-[#5f6368]">
                  <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
                  <span>투명한 PG 원가(2~3%) 적용</span>
                </div>
              </div>

              <div className="bg-[#f8f9fa] p-5 sm:p-6 rounded-2xl border border-[#dadce0] transition-all hover:border-[#1a73e8]/30">
                <span className="text-xs font-medium text-[#5f6368]">브랜드 직접 소유 고객 DB</span>
                <div className="text-2xl sm:text-3xl font-medium text-[#202124] mt-2 mb-1">2,450명</div>
                <div className="inline-flex items-center gap-1 text-xs text-[#5f6368]">
                  <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
                  <span>가상번호 없는 자사몰 회원 DB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Ribbon */}
        <div data-testid="metrics-ribbon" className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-3xl lg:rounded-full p-6 lg:py-5 lg:px-8 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#dadce0] gap-y-6 lg:gap-y-0">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">자사몰 제작비</span>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">75만 원부터</span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                  <span>50% 프로모션가</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">월 고정 유지비</span>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">10만 원</span>
                </div>
                <span className="text-[11px] text-[#5f6368]">서버·자동 백업·3중 모니터링</span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">추가 중개 수수료</span>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#1a73e8] tracking-tight">0원 (0%)</span>
                </div>
                <span className="text-[11px] text-[#5f6368]">토스 PG 직접 계약 · 판매 수수료 0%</span>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">제작 소요 기간</span>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-2xl sm:text-3xl font-medium text-[#202124] tracking-tight">3~5주 완성</span>
                </div>
                <span className="text-[11px] text-[#5f6368]">PG 심사 대행 + 상품 100개 등록</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28"
        >
          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">플랫폼 중개 수수료 0%</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              오픈마켓의 8~13% 중개 수수료 대신, 토스페이먼츠 직접 계약으로 투명한 PG 결제 수수료(2~3%)만 지출되어 유통 마진을 효과적으로 개선할 수 있습니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">고객 DB 직접 소유</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              플랫폼 가상번호 대신 고객의 연락처와 구매 내역을 직접 소유하여, 플랫폼 제약 없이 재구매 프로모션을 직접 기획하고 운영합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">체계적인 인프라 운영 관리</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에 집중하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
