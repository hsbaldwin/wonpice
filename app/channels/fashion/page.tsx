import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityChecker from "@/components/EligibilityChecker";
import { Shirt, ExternalLink, ArrowRight, ShieldCheck, Sparkles, Image as ImageIcon, Ruler, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "디자이너 패션·자체제작 온라인 판로 개척 가이드 — 브랜드 독립 자사몰 구축법 | WonPice",
  description:
    "에이블리·지그재그의 최저가 출혈 경쟁과 카피를 넘어, 내 브랜드 고유의 감성과 핏을 온전히 제값 받는 패션 온라인 자사몰 판로 개척 가이드.",
  keywords: [
    "패션 온라인 판로 개척",
    "디자이너 브랜드 자사몰 제작",
    "자체제작 의류 쇼핑몰 만들기",
    "에이블리 지그재그 수수료 절감",
    "의류 룩북 쇼핑몰",
    "가게지기",
  ],
};

export default function FashionChannelPage() {
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
          <span className="text-indigo-700 font-semibold">디자이너 패션 · 자체제작</span>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold mb-4">
            <Shirt className="w-4 h-4 text-indigo-700" />
            <span>디자이너 의류 · 자체제작 패션 브랜드 판로 솔루션</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            10원 단위 최저가 전쟁과 카피를 넘어,
            <br />
            <span className="text-indigo-700">브랜드 감성과 핏의 제값을 받는 패션 자사몰 판로</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-6">
            패션 플랫폼에 입점하자마자 비슷한 저가 카피 상품들과의 &apos;최저가 비교&apos;에 밀려 원단과 핏의 가치를 깎아내리고 계셨나요?
            이제는 내 브랜드 고유의 세로형 룩북과 팬덤을 온전히 담아내는 <strong>독립 패션 자사몰</strong>로 당당하게 승부할 때입니다.
          </p>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-950 text-xs sm:text-sm font-medium flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>패션 브랜드 판로 개척 지원:</strong> 소상공인 자사몰 전문 파트너 &apos;가게지기&apos;에서 
              <strong> 룩북·사이즈 가이드가 포함된 업종 맞춤 자사몰을 3주 만에 완성</strong>해 드립니다.
            </div>
          </div>
        </section>

        {/* Channel Comparison */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            패션 유통 채널별 수익 및 브랜드 가치 대조
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 mb-1">판로 1. 패션 전문 플랫폼 입점</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">수수료 15~25% + 쿠폰 출혈</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>비싼 수수료와 강제 쿠폰 분담금</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>비슷한 디자인의 저가 사입품과 가격 경쟁</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>브랜드 고유의 룩북 감성을 살리기 어려움</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-700 mb-1">판로 2. 인스타 DM 주문 판매</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">팬덤은 있으나 비효율</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>팔로워들과의 친밀한 소통 가능</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>일일이 입금 확인, 주소 취합하느라 CS 과부하</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>카드 결제 불가로 구매 이탈율 극심</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-indigo-50/70 border border-indigo-300 shadow-sm relative overflow-hidden">
              <div className="text-xs font-bold text-indigo-900 mb-1">판로 3. 독립 감성 자사몰 (추천)</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">팬덤을 매출로 전환</div>
              <ul className="space-y-2 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-700 font-bold">✓</span>
                  <span><strong>수수료 0%:</strong> PG 카드 결제 수수료 외 추가 수수료 없음</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-700 font-bold">✓</span>
                  <span><strong>고화질 룩북:</strong> 원단 텍스처와 실루엣 온전 전달</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-700 font-bold">✓</span>
                  <span><strong>신상 드롭 알림:</strong> 신규 컬렉션을 단골에게 직접 전달</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fashion Specialized Features */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            패션 브랜드 구매 전환율을 높이는 3대 디자인 요소
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            패션 의류는 &apos;입어본 듯한 신뢰감&apos;을 주는 시각적 경험이 구매를 결정짓습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <ImageIcon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">세로형 룩북 갤러리</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                스마트폰 화면을 가득 채우는 세로형 피팅 컷으로 원단의 드레이프와 핏을 감성적으로 전달.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <Ruler className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">실측 사이즈 &amp; 모델 정보</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                어깨·가슴·기장 세부 치수와 모델 신장/착용 사이즈를 명확히 표기하여 교환/반품률 최소화.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">단골 회원 전용 혜택</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                자사몰 회원 가입 시 첫 구매 할인, 시즌 오프 프리패스 등 단골 팬덤 전용 혜택 시스템.
              </p>
            </div>
          </div>

          {/* Demo Link */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-400 font-bold mb-1">패션 테마 실제 사례</div>
              <h3 className="text-base font-bold text-white">디자이너 패션 쇼핑몰 &apos;온결&apos; 라이브 데모</h3>
              <p className="text-xs text-slate-400 mt-1">세로형 고화질 룩북과 사이즈 가이드가 탑재된 실제 쇼핑몰 화면을 둘러보세요.</p>
            </div>
            <a
              href="https://shop-store-950864605215.asia-northeast3.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold shrink-0 transition-colors"
            >
              <span>온결 데모몰 체험하기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Eligibility Checker */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <EligibilityChecker
            defaultCategory="fashion"
            title="우리 패션 브랜드도 온라인 판로 구축비 지원 대상일까요?"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
