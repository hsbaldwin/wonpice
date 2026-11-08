import { ArrowDown, ExternalLink, ShieldCheck, TrendingUp, Users, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-stone-50 to-stone-50 pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-stone-200/80">
      {/* Background Subtle Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#047857_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Ethos Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs sm:text-sm font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>올바른 선택에 의한 승리 (Victory by the Right Choice)</span>
        </div>

        {/* Primary SEO Heading (H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-[1.2] mb-6">
          농산물 직거래 쇼핑몰 제작
          <br className="hidden sm:inline" />
          <span className="text-emerald-700 bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent">
            {" "}공판장 헐값과 수수료를 넘는 농가의 올바른 선택
          </span>
        </h1>

        {/* Subtitle / Philosophy */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed mb-8 sm:mb-10 font-normal">
          땀 흘려 지은 농산물을 10원 단위 최저가 출혈 경쟁에 던지지 마세요.
          <br className="hidden md:inline" />
          시세 폭락에 휘둘리는 <strong>공판장 경매</strong>와 8~13%를 떼어가는 <strong>오픈마켓 수수료</strong>에서 벗어나,
          <br className="hidden md:inline" />
          내 농산물의 진정한 가치를 알고 정가를 지불하는 <strong>30%의 충성 단골</strong>을 만드는 직거래 자사몰 구축 실전 가이드입니다.
        </p>

        {/* Core CTA Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12">
          <a
            href="#calculator"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <span>실시간 수수료 절감액 계산하기</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-stone-100 text-stone-800 font-bold text-sm sm:text-base border border-stone-300 shadow-xs hover:shadow-sm transition-all cursor-pointer"
          >
            <span>농가 전용 쇼핑몰 '제철곳간' 데모 체험</span>
            <ExternalLink className="w-4 h-4 text-emerald-700" />
          </a>
        </div>

        {/* 3 Pillar Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">수수료 7~10% 순익 즉시 개선</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              공판장 경매 상장비와 플랫폼 수수료(8~13%) 대신 2~3%대 PG 수수료만 지출되어 연간 수백~수천만 원이 순이익으로 남습니다.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">고객 전화번호·주소 100% 농가 소유</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              플랫폼의 암호화된 가상번호 대신 고객 DB를 온전히 확보하여, 다음 해 제철 수확 때마다 광고비 0원으로 선주문 완판을 달성합니다.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-stone-900 text-base mb-1">2026 농가 구축비 50% 지원 혜택</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              상품 등록 100개 대행, 토스 결제 연동, 도메인 연결까지 원스톱으로 제공하며 선착순 농가에 한해 구축비 50%가 지원됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
