import { Check, ShieldAlert, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function GuideSection() {
  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-xs sm:text-sm font-bold text-emerald-700 tracking-wider uppercase mb-2">
          경영 전략 가이드
        </h2>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          스마트스토어를 닫지 마세요.
          <br className="sm:hidden" />
          <span className="text-emerald-700"> &apos;병행&apos;</span>이 가장 올바른 선택입니다.
        </h3>
        <p className="text-sm text-slate-600 mt-3 max-w-2xl mx-auto leading-relaxed">
          많은 대표님들이 &apos;플랫폼을 떠나야 하나?&apos;를 고민하십니다. 하지만 성공하는 브랜드는 플랫폼과 싸우지 않고, 영리하게 역할을 나누어 운영합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Trap of Platform Only */}
        <div className="p-6 rounded-2xl bg-white border border-rose-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm mb-4">
            <ShieldAlert className="w-4 h-4" />
            <span>플랫폼에만 100% 의존할 때 마주치는 한계</span>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span>
                <strong>단골이 쌓이지 않는 밑 빠진 독:</strong> 3번 재구매한 고객도 다음번에 네이버에서 검색하다 다른 최저가 샵으로 이탈합니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span>
                <strong>광고비 쳇바퀴:</strong> 고객 연락처와 DB가 플랫폼에 귀속되어, 신상품이 나와도 매번 광고비를 지출해야만 알릴 수 있습니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
              <span>
                <strong>10원 깎기 가격 전쟁:</strong> 산지에서 흘린 땀과 정성보다, 포털의 &apos;최저가 순&apos; 필터가 가격을 결정합니다.
              </span>
            </li>
          </ul>
        </div>

        {/* The Right Way: Smart Coexistence */}
        <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 shadow-xs relative overflow-hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>스마트스토어 + 자사몰 병행의 올바른 공식</span>
          </div>
          <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>스마트스토어 = 신규 고객 낚시터:</strong> 포털의 방대한 트래픽을 활용해 우리 상품을 처음 맛보고 입어보게 합니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>배송 상자 = 단골 징검다리:</strong> 박스에 따뜻한 산지 편지와 &apos;자사몰 첫 구매 혜택 카드&apos;를 동봉합니다.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0" />
              <span>
                <strong>자사몰 = 내 브랜드의 금고:</strong> 수수료 0%로 제값을 받고, 단골 회원에게 직접 소식을 전하는 영구 자산이 됩니다.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Philosophy Callout: Won + Pice */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 text-center">
        <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-3">
          <HeartHandshake className="w-5 h-5" />
        </div>
        <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          WonPice가 믿는 &apos;승리(Won)&apos;의 정의
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          진정한 승리는 남을 짓밟거나 가격을 덤핑해 쟁취하는 것이 아닙니다.
          <br />
          나의 정당한 가치를 인정해 주는 단골을 지키고, 흔들리지 않는 사업의 주체성을 확보하는 <strong>&apos;올바른 선택(Right Choice)&apos;</strong>만이 장기적인 번영을 가져다줍니다.
        </p>
      </div>
    </section>
  );
}
