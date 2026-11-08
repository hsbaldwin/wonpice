import { CheckCircle2, TrendingUp, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-12 px-4 sm:px-6 max-w-4xl mx-auto text-center">
      {/* Top Value Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
        <Sparkles className="w-4 h-4 text-emerald-600" />
        <span>출혈 경쟁을 멈추고 내 브랜드를 지키는 경영 판단</span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6">
        최저가 경쟁에 휘둘리지 않고,
        <br />
        <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2 underline-offset-8">
          내 가게의 가치를 지키는 올바른 선택
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed mb-8">
        스마트스토어와 쿠팡의 끝없는 수수료와 알고리즘 순위 싸움에 지치셨나요?
        <br className="hidden sm:inline" />
        소중한 단골을 온전히 내 자산으로 만들 때가 되었는지,{" "}
        <strong className="text-slate-900 font-semibold">30초 자가진단</strong>으로 우리 가게의 준비도를 확인해보세요.
      </p>

      {/* Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto text-left">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">단골의 자산화</div>
            <div className="text-xs text-slate-500 mt-0.5">매번 광고비 내고 다시 사오던 고객을 평생 단골로</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">제값 받는 브랜드</div>
            <div className="text-xs text-slate-500 mt-0.5">10원 깎기 최저가 비교에서 벗어나 산지·품질의 제값 받기</div>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">안정적인 병행 전략</div>
            <div className="text-xs text-slate-500 mt-0.5">스마트스토어로 유입받고 자사몰로 정착시키는 상생 구조</div>
          </div>
        </div>
      </div>
    </section>
  );
}
