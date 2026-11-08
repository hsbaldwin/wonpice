import Link from "next/link";
import { Wheat, UtensilsCrossed, Shirt, ArrowRight, Sparkles } from "lucide-react";

export default function ChannelHubSection() {
  const channels = [
    {
      href: "/channels/farm",
      icon: <Wheat className="w-5 h-5 text-emerald-700" />,
      tag: "농가 · 산지직송",
      tagBg: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
      title: "공판장 헐값 경매를 넘어, 직거래 판로 개척",
      desc: "kg/박스 중량 옵션, 당일 출고 마감 시계, 신선 배송 안내가 완비된 농가 자사몰 가이드. (선착순 구축비 50% 프로모션 진행 중)",
      cta: "농가 판로 가이드 & 지원 확인하기",
    },
    {
      href: "/channels/food",
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-700" />,
      tag: "수제 식품 · 밀키트",
      tagBg: "bg-amber-50 text-amber-800 border-amber-200/60",
      title: "배달앱 30% 수수료를 넘어, 전국 택배 판로 개척",
      desc: "동네 골목 매장의 한계를 깨고 전국 단골 밥상을 만드는 수제 반찬, 밀키트, 로컬 맛집 전용 온라인 택배 직판로 전략.",
      cta: "식품 판로 가이드 & 지원 확인하기",
    },
    {
      href: "/channels/fashion",
      icon: <Shirt className="w-5 h-5 text-indigo-700" />,
      tag: "디자이너 패션 · 자체제작",
      tagBg: "bg-indigo-50 text-indigo-800 border-indigo-200/60",
      title: "10원 깎기 최저가 전쟁을 넘어, 룩북 감성 판로 개척",
      desc: "플랫폼 카피와 수수료에서 벗어나, 세로형 피팅 룩북과 사이즈 가이드로 팬덤을 모으는 디자이너 의류 독립 가이드.",
      cta: "패션 판로 가이드 & 지원 확인하기",
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>업종별 온라인 판로 개척 가이드</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          내 업종에 꼭 맞는 <span className="text-emerald-700">실전 온라인 판로 개척법</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
          외주 업체의 500만 원+ 높은 비용 부담 없이, 소상공인 판로 지원 및 프로모션을 영리하게 활용하여 내 가게만의 자사몰을 구축하는 업종별 가이드를 확인해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {channels.map((c, idx) => (
          <Link
            key={idx}
            href={c.href}
            className="group flex flex-col justify-between p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-emerald-500 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${c.tagBg}`}>
                  {c.tag}
                </span>
                <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                  {c.icon}
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                {c.title}
              </h3>

              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                {c.desc}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-700">
              <span>{c.cta}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
