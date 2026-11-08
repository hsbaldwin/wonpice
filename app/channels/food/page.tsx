import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityChecker from "@/components/EligibilityChecker";
import { UtensilsCrossed, ExternalLink, ArrowRight, ShieldCheck, Flame, Repeat, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "수제 식품·밀키트 온라인 판로 개척 가이드 — 전국 택배 직판로 구축법 | WonPice",
  description:
    "동네 매장 한계를 넘어 전국 단골을 확보하는 수제 식품·밀키트 온라인 판로 개척 실전 가이드. 배달앱 수수료에서 벗어나 자사몰로 마진을 지키는 법.",
  keywords: [
    "수제 식품 온라인 판로 개척",
    "밀키트 쇼핑몰 제작",
    "식품 자사몰 구축 지원",
    "반찬 배송 쇼핑몰 만들기",
    "로컬 맛집 택배 판매",
    "가게지기",
  ],
};

export default function FoodChannelPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            홈
          </Link>
          <span>/</span>
          <span className="text-slate-700 font-semibold">온라인 판로 개척</span>
          <span>/</span>
          <span className="text-emerald-700 font-semibold">수제 식품 · 밀키트</span>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <UtensilsCrossed className="w-4 h-4 text-emerald-700" />
            <span>수제 먹거리 · 로컬 맛집 전국 택배 판로 솔루션</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            골목 상권과 배달앱 수수료를 넘어,
            <br />
            <span className="text-emerald-700">전국 단골을 만드는 수제 식품 온라인 직판로</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-6">
            매장 손님들이 &quot;지방에 사는 가족에게도 보내주고 싶다&quot;고 하시나요?
            배달앱의 20~30% 중개 수수료에 허덕이지 않고, 정성껏 끓인 국과 반찬, 밀키트를 <strong>전국 택배 자사몰 직판로</strong>를 통해 제값 받고 판매할 수 있습니다.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>식품 소상공인 판로 지원 혜택:</strong> 현재 소상공인 자사몰 전문 파트너 &apos;가게지기&apos;에서 
              <strong> 식품·농가 선착순 구축비 50% 할인 프로모션</strong>을 지원하고 있습니다.
            </div>
          </div>
        </section>

        {/* Channel Profit Comparison */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            식품 판매 채널별 마진 구조 대조
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 mb-1">판로 1. 배달앱 플랫폼</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">수수료 20~30% 지출</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>중개수수료 + 배달비 + 결제수수료 부담</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>상권 반경 2~3km 이내로 제한</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>악성 별점 리뷰 테러 리스크</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-emerald-700 mb-1">판로 2. 오픈마켓 밀키트 입점</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">전국 노출 / 가격 압박</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>전국 소비자에게 첫 노출 가능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>대기업 공장제 밀키트와 가격 비교</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>재구매 고객 연락처 미제공</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-sm relative overflow-hidden">
              <div className="text-xs font-bold text-emerald-800 mb-1">판로 3. 브랜드 전국 택배 자사몰</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">수익률 극대화 판로</div>
              <ul className="space-y-2 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>수수료 0%:</strong> PG 결제 수수료 외 추가 수수료 없음</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>전국 택배 배송:</strong> 지역 한계 없는 무한 확장</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>정기 재구매:</strong> 주간/월간 밥상 정기 주문 확보</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Food Specialized Features */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            수제 먹거리 판매에 필수적인 3대 디테일
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            식품은 배송 사고나 보관 방법 오해로 인한 문의가 많습니다. 이를 사전에 차단하는 UI가 매출을 만듭니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">냉장·냉동 보관 안내</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                보관법(냉장/냉동/실온)과 소비기한이 상품 상세 상단에 직관적으로 노출되어 고객 신뢰도 확보.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Flame className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">맛있는 조리법 가이드</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                간편 조리 팁, 꿀조합 레시피를 모바일에서 큼직하게 확인할 수 있는 맞춤 레이아웃.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Repeat className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">재구매 알림 &amp; 단골 문자</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                식품이 떨어질 즈음(2~3주 주기) 단골 고객에게 자사몰 혜택과 함께 신선한 출고 소식 발송 가능.
              </p>
            </div>
          </div>

          {/* Demo Link */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-bold mb-1">식품 테마 실제 사례</div>
              <h3 className="text-base font-bold text-white">식품 전용 쇼핑몰 &apos;제철곳간&apos; 라이브 데모</h3>
              <p className="text-xs text-slate-400 mt-1">냉장·냉동 안내, 출고 마감 타이머가 적용된 실제 쇼핑몰 화면을 둘러보세요.</p>
            </div>
            <a
              href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 transition-colors"
            >
              <span>식품 데모몰 체험하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Eligibility Checker */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <EligibilityChecker
            defaultCategory="food"
            title="우리 식품/가게도 온라인 판로 구축비 50% 지원 대상일까요?"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
