import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EligibilityChecker from "@/components/EligibilityChecker";
import { Wheat, Check, ExternalLink, ArrowRight, ShieldCheck, Clock, Package, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "농가·산지직송 온라인 판로 개척 가이드 — 자사몰 구축비 50% 지원 활용법 | WonPice",
  description:
    "공판장 헐값 경매와 스마트스토어 수수료를 넘어, 내 농산물의 제값을 받는 농가 직거래 온라인 판로 개척 실전 가이드. 선착순 농가 자사몰 50% 프로모션 안내.",
  keywords: [
    "농가 온라인 판로 개척",
    "농산물 직거래 쇼핑몰 제작",
    "산지직송 쇼핑몰 만들기",
    "농가 자사몰 구축 지원",
    "과일 직거래 사이트",
    "농가 스마트스토어 수수료",
    "가게지기",
  ],
};

export default function FarmChannelPage() {
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
          <span className="text-emerald-700 font-semibold">농가 · 산지직송</span>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4">
            <Wheat className="w-4 h-4 text-emerald-700" />
            <span>농업인 · 산지직송 전문 온라인 판로 솔루션</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            공판장 헐값 경매와 수수료를 넘어,
            <br />
            <span className="text-emerald-700">내 땀의 제값을 받는 농가 직거래 판로 개척</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed mb-6">
            새벽부터 땀 흘려 키운 농산물을 공판장에 넘기며 상자당 수수료와 경매가 폭락에 속상하셨나요?
            이제는 중간 유통 없이 단골 소비자와 직접 만나는 <strong>농가 직거래 자사몰</strong>로 흔들리지 않는 온라인 판로를 세워야 할 때입니다.
          </p>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium flex items-start gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>2026 농가 특별 지원 안내:</strong> 현재 소상공인 자사몰 전문 파트너 &apos;가게지기&apos;에서 
              <strong> 선착순 10곳 농가 대상 구축비 50% 프로모션</strong>을 진행 중입니다. 페이지 하단에서 지원 대상 여부를 확인하실 수 있습니다.
            </div>
          </div>
        </section>

        {/* 3 Channels Comparison Table */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            농가 판매 판로별 수익 구조 심층 비교
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-slate-500 mb-1">판로 1. 도매 공판장 / 경매</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">가격 결정권 0%</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>상장 수수료, 하역비, 운송비 차감</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>대풍년에도 가격 폭락으로 손해</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>내 소비자가 누구인지 알 수 없음</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <div className="text-xs font-bold text-emerald-700 mb-1">판로 2. 스마트스토어 / 오픈마켓</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">신규 고객 유입용</div>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>네이버 검색 노출로 첫 고객 확보</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>판매 수수료 6~12% 지속 지출</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>재구매 고객 연락처를 가질 수 없음</span>
                </li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 shadow-sm relative overflow-hidden">
              <div className="text-xs font-bold text-emerald-800 mb-1">판로 3. 직거래 전용 자사몰 (추천)</div>
              <div className="text-base font-extrabold text-slate-900 mb-3">평생 단골 금고</div>
              <ul className="space-y-2 text-xs text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>수수료 0%</strong> (PG 결제 수수료 외 무료)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>제값 받기:</strong> 산지 스토리텔링으로 프리미엄 인정</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">✓</span>
                  <span><strong>수확 알림 문자:</strong> 제철마다 단골에게 직접 직송</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Essential Features for Farm Store */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            농가 직거래 쇼핑몰에 반드시 필요한 3대 특화 기능
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6">
            일반 쇼핑몰 템플릿으로는 농산물을 팔기 어렵습니다. 신선식품의 특성을 고려한 기능이 준비되어야 고객 신뢰가 생깁니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">중량(kg/과수) 옵션</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                3kg 가정용, 5kg 실속형, 10kg 선물용 등 농산물 맞춤 중량 옵션과 박스 수량 선택 기능.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <Clock className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">당일 출고 마감 시계</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                &quot;오늘 낮 12시 이전 주문 시 당일 수확 산지 직송 출고&quot; 타이머로 고객 구매 전환율 상승.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">냉장·신선 배송 안내</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                아이스박스, 완충재 포장 안내 및 수령 즉시 보관 방법 안내를 상세페이지 상단에 자동 표기.
              </p>
            </div>
          </div>

          {/* Demo Link */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs text-emerald-400 font-bold mb-1">농가 전용 테마 실제 사례</div>
              <h3 className="text-base font-bold text-white">산지직송 직거래 쇼핑몰 &apos;제철곳간&apos; 데모를 직접 확인해보세요</h3>
              <p className="text-xs text-slate-400 mt-1">스마트폰에서도 어르신들이 손쉽게 주문할 수 있는 직관적인 UI입니다.</p>
            </div>
            <a
              href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold shrink-0 transition-colors"
            >
              <span>제철곳간 데모몰 열기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Eligibility Checker & 50% Support */}
        <section className="py-8 max-w-4xl mx-auto px-4 sm:px-6">
          <EligibilityChecker
            defaultCategory="farm"
            title="우리 농가도 온라인 판로 구축비 50% 지원 대상일까요?"
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
