import { ArrowDown, ExternalLink, ShieldCheck, Users, Zap } from "lucide-react";

export default function SolutionHero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-28 sm:pt-36 sm:pb-36 border-b border-[#e8eaed]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1e8e3e]" />
          <span>2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) with Google Store Scale */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#202124] tracking-tight leading-[1.12] mb-8">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] font-medium">
            {" "}내 브랜드를 키우는 자사몰 솔루션
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-[#5f6368] leading-relaxed mb-12 sm:mb-16 font-normal">
          스마트스토어와 오픈마켓의 과도한 중개 수수료에서 벗어나 내 고객을 직접 소유하세요.
          <br className="hidden md:inline" />
          농가·식품부터 패션 브랜드까지, 업종에 꼭 맞는 테마 디자인과 상품 100개 등록,
          <br className="hidden md:inline" />
          토스페이먼츠 간편결제 연동까지 3~5주 만에 원스톱으로 완성합니다.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 sm:mb-24">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-base transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4.5 h-4.5 opacity-80" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#202124] font-medium text-base border border-[#dadce0] transition-all cursor-pointer"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4.5 h-4.5 opacity-60" />
          </a>
        </div>

        {/* 3 Core Value Pillars */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto text-left">
          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">플랫폼 중개 수수료 0%</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              오픈마켓의 8~13% 중개 수수료 대신, 토스페이먼츠 직접 계약으로 투명한 PG 결제 수수료(2~3%)만 지출되어 순마진이 획기적으로 개선됩니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">고객 DB 100% 브랜드 소유</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              플랫폼 가상번호 대신 고객의 진짜 연락처와 구매 내역을 직접 소유하여, 광고비 지출 없이 재구매와 프로모션을 자유롭게 실행합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">전담 엔터프라이즈 운영</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에만 온전히 집중하실 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
