import {
  ArrowDown,
  Check,
  ExternalLink,
  Lock,
  ShieldCheck,
  Users,
  Zap,
  TrendingUp,
  CreditCard,
  Package,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

export default function SolutionHero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-32 sm:pb-32 lg:pt-36 lg:pb-36 border-b border-[#e8eaed]"
    >
      {/* Ambient Radial Mesh Lighting & Subtle Studio Grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-[#e8f0fe]/80 via-[#e6f4ea]/40 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#e8f0fe] rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#fef7e0] rounded-full blur-3xl opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(#dadce0_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill Badge */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-8 sm:mb-10 shadow-sm hover:shadow-md transition-all"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34a853] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1e8e3e]"></span>
          </span>
          <span className="font-semibold text-[#1e8e3e]">2026 자사몰 구축비 50% 프로모션 진행 중</span>
          <span className="text-xs text-[#1a73e8] font-mono pl-2 border-l border-[#dadce0]">
            The Monad · 독자적 생태계
          </span>
        </div>

        {/* Primary SEO Heading (H1) with Google Store Scale */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#202124] tracking-tight leading-[1.12] mb-6 sm:mb-8 max-w-5xl mx-auto">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#1a73e8] via-[#1557b0] to-[#1e8e3e] bg-clip-text text-transparent font-medium">
            {" "}내 브랜드를 키우는 자사몰 솔루션
          </span>
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
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 mb-16 sm:mb-20 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-base shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white/90" />
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4.5 h-4.5 opacity-90" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-white hover:bg-[#f8f9fa] text-[#1a73e8] font-medium text-base border border-[#dadce0] transition-all hover:border-[#1a73e8]/60 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-xs"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4.5 h-4.5 opacity-70" />
          </a>
        </div>

        {/* Studio Hardware & Browser Mockup Showcase Stage */}
        <div
          data-testid="device-mockup"
          className="max-w-5xl mx-auto mb-16 sm:mb-20 rounded-3xl lg:rounded-[36px] border border-[#dadce0] bg-white shadow-[0_24px_70px_rgba(26,115,232,0.12)] overflow-hidden text-left relative"
        >
          {/* Browser Top Chrome */}
          <div className="bg-[#f8f9fa] border-b border-[#dadce0] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-3 h-3 rounded-full bg-[#ea4335] shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#fbbc04] shadow-xs" />
              <span className="w-3 h-3 rounded-full bg-[#34a853] shadow-xs" />
            </div>

            {/* URL Bar */}
            <div className="flex-1 max-w-md mx-auto bg-white border border-[#dadce0] rounded-full px-4 py-1.5 flex items-center justify-center gap-2 text-xs shadow-xs">
              <Lock className="w-3.5 h-3.5 text-[#1e8e3e] shrink-0" />
              <span className="text-xs text-[#5f6368] font-mono truncate font-medium">
                https://shop-site-950864605215.asia-northeast3.run.app
              </span>
            </div>

            {/* Live Engine Status Badge */}
            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-[#137333] shrink-0 bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6]">
              <span className="w-2 h-2 rounded-full bg-[#1e8e3e] animate-pulse" />
              <span>라이브 엔진 가동 중</span>
            </div>
          </div>

          {/* Floating Google 4-Color Chip Badges Bar */}
          <div className="bg-[#f8f9fa]/90 border-b border-[#dadce0] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#d2e3fc] bg-[#e8f0fe] text-[#1a73e8] text-xs font-medium shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>추가 중개 수수료 0%</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#ceead6] bg-[#e6f4ea] text-[#137333] text-xs font-medium shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>3~5주 완성 원스톱 런칭</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#feefc3] bg-[#fef7e0] text-[#b06000] text-xs font-medium shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>구축비 50% 프로모션</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#fad2cf] bg-[#fce8e6] text-[#c5221f] text-xs font-medium shadow-xs">
              <Check className="w-3.5 h-3.5" />
              <span>업종 맞춤 테마 제공</span>
            </span>
          </div>

          {/* Studio Preview Interior: High-Tech Control Console */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-white to-[#fbfcfe]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#e8eaed] gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-md">
                    v2026.11
                  </span>
                  <h4 className="font-semibold text-[#202124] text-base sm:text-lg">
                    WonPice Commerce Engine v2026
                  </h4>
                  <span className="hidden md:inline-flex items-center text-[11px] font-mono text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded">
                    SLA 99.9%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5f6368]">
                  식품·농가(제철곳간) 및 패션·디자이너(온결) 업종별 전용 테마 맞춤 지원
                </p>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-xs text-[#3c4043] shrink-0 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
                <span>클라우드 런 정상 배포됨</span>
              </div>
            </div>

            {/* 3 Real-time Metric Cards with Visual Impact */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dadce0] shadow-xs transition-all hover:border-[#1a73e8]/40 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#5f6368]">일간 실시간 결제액</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight mb-2">
                  ₩ 4,820,000
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs text-[#137333] font-medium bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                  <Check className="w-3 h-3" />
                  <span>오픈마켓 중개 수수료 절감</span>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dadce0] shadow-xs transition-all hover:border-[#1a73e8]/40 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#5f6368]">토스 간편결제 연동</span>
                  <div className="w-7 h-7 rounded-lg bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
                    <CreditCard className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-[#1a73e8] tracking-tight mb-2">
                  안정적 승인
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-[#5f6368]">
                  <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
                  <span>투명한 PG 원가(2~3%) 적용</span>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dadce0] shadow-xs transition-all hover:border-[#1a73e8]/40 hover:shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#5f6368]">브랜드 직접 소유 고객 DB</span>
                  <div className="w-7 h-7 rounded-lg bg-[#fef7e0] text-[#b06000] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight mb-2">
                  2,450명
                </div>
                <div className="inline-flex items-center gap-1 text-xs text-[#5f6368]">
                  <Check className="w-3.5 h-3.5 text-[#1e8e3e]" />
                  <span>가상번호 없는 자사몰 회원 DB</span>
                </div>
              </div>
            </div>

            {/* Bottom Live Operations Banner */}
            <div className="mt-5 p-3.5 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#3c4043]">
                <Package className="w-4 h-4 text-[#1a73e8] shrink-0" />
                <span className="font-medium">실시간 주문 연동 피드:</span>
                <span className="text-[#5f6368] truncate">
                  [제철곳간] 성주 꿀참외 3kg 주문 완료 (토스 결제 · 직배송 승인)
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded font-medium">
                  수수료 0원 정산
                </span>
                <a
                  href="#showcase"
                  className="text-[#1a73e8] hover:underline font-medium inline-flex items-center gap-0.5"
                >
                  <span>라이브 뷰</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Ribbon */}
        <div data-testid="metrics-ribbon" className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="bg-white/95 backdrop-blur-md border border-[#dadce0] rounded-3xl lg:rounded-full p-6 lg:py-6 lg:px-10 shadow-sm hover:shadow-md transition-all">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#dadce0] gap-y-6 lg:gap-y-0">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">자사몰 제작비</span>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight">
                    75만 원부터
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-3 py-0.5 rounded-full border border-[#ceead6]">
                  <span>50% 프로모션가</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">월 고정 유지비</span>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight">
                    10만 원
                  </span>
                </div>
                <span className="text-[11px] text-[#5f6368] bg-[#f1f3f4] px-2.5 py-0.5 rounded-full">
                  서버·자동 백업·3중 모니터링
                </span>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">추가 중개 수수료</span>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#1a73e8] tracking-tight">
                    0원 (0%)
                  </span>
                </div>
                <span className="text-[11px] text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full font-medium">
                  토스 PG 직접 계약 · 판매 수수료 0%
                </span>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center justify-center px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0">
                <span className="text-xs font-medium text-[#5f6368] mb-1.5">제작 소요 기간</span>
                <div className="flex items-baseline gap-1.5 mb-1.5">
                  <span className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight">
                    3~5주 완성
                  </span>
                </div>
                <span className="text-[11px] text-[#b06000] bg-[#fef7e0] px-2.5 py-0.5 rounded-full font-medium">
                  PG 심사 대행 + 상품 100개 등록
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars with Numerological Storytelling (The Trinity of Growth) */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-mono font-medium mb-3 shadow-xs">
            <span>The Trinity of Growth · 3대 본질 기둥</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal text-[#202124] tracking-tight">
            성장과 자립을 완성하는 3가지 본질적 조화
          </h2>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28"
        >
          {/* Card 1: Monad */}
          <div className="bg-white p-9 sm:p-11 rounded-[36px] border border-[#dadce0] shadow-xs hover:shadow-md transition-all hover:border-[#137333]/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#34a853]" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shadow-xs">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6]">
                  Pillar I · 독립 (The Monad)
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3">플랫폼 중개 수수료 0%</h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                오픈마켓의 8~13% 중개 수수료 대신, 토스페이먼츠 직접 계약으로 투명한 PG 결제 수수료(2~3%)만 지출되어 유통 마진을 효과적으로 개선할 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f1f3f4] text-xs text-[#5f6368] flex items-center justify-between">
              <span className="font-mono text-[#137333] font-semibold text-sm">01</span>
              <span>수수료 종속 탈피와 마진의 온전한 회복</span>
            </div>
          </div>

          {/* Card 2: Dyad */}
          <div className="bg-white p-9 sm:p-11 rounded-[36px] border border-[#dadce0] shadow-xs hover:shadow-md transition-all hover:border-[#1a73e8]/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1a73e8]" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc]">
                  Pillar II · 소유 (The Dyad)
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3">고객 DB 직접 소유</h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                플랫폼 가상번호 대신 고객의 연락처와 구매 내역을 직접 소유하여, 플랫폼 제약 없이 재구매 프로모션을 직접 기획하고 운영합니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f1f3f4] text-xs text-[#5f6368] flex items-center justify-between">
              <span className="font-mono text-[#1a73e8] font-semibold text-sm">02</span>
              <span>단골 고객과의 1:1 직접 관계 자산화</span>
            </div>
          </div>

          {/* Card 3: Triad */}
          <div className="bg-white p-9 sm:p-11 rounded-[36px] border border-[#dadce0] shadow-xs hover:shadow-md transition-all hover:border-[#b06000]/40 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#fbbc04]" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-[#b06000] bg-[#fef7e0] px-3 py-1 rounded-full border border-[#feefc3]">
                  Pillar III · 영속 (The Triad)
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3">체계적인 인프라 운영 관리</h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에 집중하실 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#f1f3f4] text-xs text-[#5f6368] flex items-center justify-between">
              <span className="font-mono text-[#b06000] font-semibold text-sm">03</span>
              <span>24/7 중단 없는 브랜드 지속 가능성 확보</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
