import { ArrowDown, ExternalLink, TrendingUp, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28 border-b border-[#e8eaed]">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Google-style Pill Eyebrow Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#e6f4ea] border border-[#ceead6] text-[#137333] text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
          <span>올바른 선택에 의한 승리 — Google Store 가이드 에디션</span>
        </div>

        {/* Primary SEO Heading (H1) with Google Store Typography */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#202124] tracking-tight leading-[1.18] mb-6">
          농산물 직거래 쇼핑몰 제작
          <br className="hidden sm:inline" />
          <span className="text-[#137333] font-medium">
            {" "}공판장 헐값과 수수료를 넘는 농가의 올바른 선택
          </span>
        </h1>

        {/* Subtitle / Philosophy in Google Muted Text */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-[#5f6368] leading-relaxed mb-10 sm:mb-12 font-normal">
          땀 흘려 지은 농산물을 10원 단위 최저가 출혈 경쟁에 던지지 마세요.
          <br className="hidden md:inline" />
          시세 폭락에 휘둘리는 <strong>공판장 경매</strong>와 8~13%를 떼어가는 <strong>오픈마켓 수수료</strong>에서 벗어나,
          <br className="hidden md:inline" />
          내 농산물의 진정한 가치를 알고 정가를 지불하는 <strong>30%의 충성 단골</strong>을 만드는 직거래 자사몰 구축 실전 가이드입니다.
        </p>

        {/* Google Store Dual Pill CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>실시간 수수료 절감액 계산하기</span>
            <ArrowDown className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#1a73e8] hover:text-[#174ea6] font-medium text-sm border border-[#dadce0] transition-all cursor-pointer"
          >
            <span>농가 전용 쇼핑몰 '제철곳간' 데모 체험</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Google Store Spec Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0] hover:shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">수수료 7~10% 순익 즉시 개선</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              공판장 상장 수수료와 오픈마켓 수수료(8~13%) 대신 2~3%대 투명한 결제 수수료만 지출되어 연간 수백~수천만 원이 순이익으로 남습니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0] hover:shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">고객 연락처·주소 100% 농가 소유</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              플랫폼의 암호화된 가상번호 대신 고객 DB를 온전히 확보하여, 다음 해 제철 수확 때마다 광고비 0원으로 선주문 완판을 달성합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0] hover:shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">2026 농가 구축비 50% 지원</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              상품 등록 대행 100개, 토스 결제 연동, 도메인 연결까지 원스톱으로 제공하며 선착순 농가에 한해 구축비 50%가 지원됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
