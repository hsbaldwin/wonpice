"use client";

import { useState } from "react";
import {
  ArrowDown,
  ExternalLink,
  ShieldCheck,
  Users,
  Zap,
  Lock,
  CheckCircle2,
  Wheat,
  Shirt,
  Sparkles,
} from "lucide-react";

export default function SolutionHero() {
  const [heroTab, setHeroTab] = useState<"food" | "fashion">("food");

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#fafafa] pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 border-b border-slate-200/80"
    >
      {/* SaaS Tech Grid & Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-sky-100/60 via-indigo-50/30 to-transparent blur-3xl opacity-70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill Badge - SaaS System Status */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-mono font-medium mb-8 shadow-xs hover:border-slate-300 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-900 font-bold">mord 2.4</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-600 font-sans">2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) - Crisp SaaS Linear Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-slate-900 tracking-[-0.035em] leading-[1.08] mb-6 sm:mb-8 max-w-5xl mx-auto break-keep">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent"> 내 브랜드를 키우는 자사몰 솔루션</span>
        </h1>

        {/* Subtitle - Crisp, sovereign product tone */}
        <p className="text-[#5f6368] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12 font-normal break-keep">
          스마트스토어를 넘어 브랜드 고유의 정체성과 단골 고객 데이터를 온전히 소유하는 독립 D2C 스토어프론트.
          <br className="hidden md:inline" />
          농가·식품부터 패션 브랜드까지, 대표님의 철학을 담은 독창적인 맞춤 디자인과 상품 100개 등록,
          <br className="hidden md:inline" />
          토스 간편결제 연동까지 3~5주 만에 기술 동반자 mord가 완성합니다.
        </p>

        {/* Dual Actions - SaaS high-precision buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-xs hover:shadow-md transition-all cursor-pointer tracking-tight ring-1 ring-slate-800"
          >
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 font-medium text-sm sm:text-base border border-slate-200 shadow-2xs hover:border-slate-300 transition-all cursor-pointer tracking-tight"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Hero Flagship Studio Stage (SaaS Interactive Workbench) */}
        <div
          data-testid="device-mockup"
          className="max-w-5xl mx-auto mb-16 sm:mb-20 rounded-3xl border border-slate-200/90 bg-slate-900/5 backdrop-blur-md p-3 sm:p-5 lg:p-6 shadow-2xl shadow-slate-200/70 relative text-left"
        >
          {/* Top Browser & Window Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/90" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90" />
              <div className="ml-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-1.5 shadow-2xs max-w-[280px] sm:max-w-none truncate">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-900 font-semibold">https://brand-flagship.mord.kr</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-sans font-medium hidden sm:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  TLS 1.3 · 24ms
                </span>
              </div>
            </div>

            {/* Quick Industry Mockup Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-slate-200 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setHeroTab("food")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  heroTab === "food"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Wheat className="w-3.5 h-3.5" />
                <span>산지직송 마켓 프리뷰</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroTab("fashion")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  heroTab === "fashion"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>스타일 룩북 프리뷰</span>
              </button>
            </div>
          </div>

          {/* Store Simulation Canvas with SaaS Telemetry */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 shadow-xs relative overflow-hidden">
            {/* Live Operational Bar */}
            <div className="mb-4 pb-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-slate-900 font-semibold">STOREFRONT: ACTIVE</span>
                <span className="text-slate-300">|</span>
                <span>SEOUL REGION (AP-NORTHEAST-2)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-700 font-medium">BATCH ETL: 100/100 SYNCED</span>
              </div>
            </div>
            {heroTab === "food" ? (
              <div className="space-y-5">
                {/* Food Store Banner */}
                <div className="bg-gradient-to-r from-[#e6f4ea] via-[#f1f8e9] to-[#e8f5e9] p-4 sm:p-5 rounded-xl border border-[#ceead6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#137333] bg-white px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                      산지직송 제철 프리미엄
                    </span>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#202124] mt-1 tracking-tight">
                      제철곳간 · 자연의 맛을 식탁까지 직배송합니다
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#ceead6] text-xs font-semibold text-[#137333] shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#1e8e3e] animate-pulse" />
                    <span>오늘 14:00 주문 건 당일 산지 출발</span>
                  </div>
                </div>

                {/* Product Micro-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#137333] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded">고당도 14Brix+</span>
                      <div className="font-semibold text-[#202124] text-sm mt-1">2026 청송 꿀 부사 5kg (특품)</div>
                      <div className="text-xs text-[#5f6368] mt-0.5">38,000원 · 무료배송</div>
                    </div>
                    <span className="text-xs font-semibold text-white bg-[#1a73e8] px-3 py-1.5 rounded-lg">담기</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#b06000] font-semibold bg-[#fef7e0] px-2 py-0.5 rounded">제주 직송</span>
                      <div className="font-semibold text-[#202124] text-sm mt-1">친환경 무농약 한라봉 실속 3kg</div>
                      <div className="text-xs text-[#5f6368] mt-0.5">29,000원 · 산지출발</div>
                    </div>
                    <span className="text-xs font-semibold text-white bg-[#1a73e8] px-3 py-1.5 rounded-lg">담기</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Fashion Store Banner */}
                <div className="bg-gradient-to-r from-[#e8f0fe] via-[#f3f4f6] to-[#e8f0fe] p-4 sm:p-5 rounded-xl border border-[#d2e3fc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-[#1a73e8] bg-white px-2.5 py-0.5 rounded-full border border-[#d2e3fc]">
                      2026 S/S 시즌 에디토리얼
                    </span>
                    <h3 className="font-semibold text-lg sm:text-xl text-[#202124] mt-1 tracking-tight">
                      온결 · 고유의 실루엣과 감각적인 텍스처
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#d2e3fc] text-xs font-semibold text-[#1a73e8] shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#1a73e8]" />
                    <span>실시간 체형별 핏 가이드 탑재</span>
                  </div>
                </div>

                {/* Product Micro-Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#1a73e8] font-semibold bg-[#e8f0fe] px-2 py-0.5 rounded">Wool 90%</span>
                      <div className="font-semibold text-[#202124] text-sm mt-1">테일러드 오버핏 울 싱글 코트</div>
                      <div className="text-xs text-[#5f6368] mt-0.5">189,000원 · Midnight Navy</div>
                    </div>
                    <span className="text-xs font-semibold text-white bg-[#1a73e8] px-3 py-1.5 rounded-lg">담기</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#f8f9fa] border border-[#dadce0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#5f6368] font-semibold bg-[#f1f3f4] px-2 py-0.5 rounded">Fine Merino</span>
                      <div className="font-semibold text-[#202124] text-sm mt-1">파인 메리노울 크루넥 니트</div>
                      <div className="text-xs text-[#5f6368] mt-0.5">89,000원 · Soft Ivory</div>
                    </div>
                    <span className="text-xs font-semibold text-white bg-[#1a73e8] px-3 py-1.5 rounded-lg">담기</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tactile Floating Proof Badges */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full font-medium border border-emerald-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>토스페이먼츠 직접 계약 · 판매 중개 수수료 0원</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800 bg-blue-50 px-3 py-1.5 rounded-full font-medium border border-blue-200/80">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>고객 데이터 100% 독립 소유 · 단골 팬덤화</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Ribbon with Precision Baseline Alignment (SaaS HUD) */}
        <div data-testid="metrics-ribbon" className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:py-5 lg:px-8 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 gap-y-6 lg:gap-y-0">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider h-4 flex items-center">자사몰 제작비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
                    75만 원부터
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
                    50% 프로모션가
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider h-4 flex items-center">월 고정 유지비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
                    10만 원
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-sans text-slate-500">서버·자동 백업·3중 모니터링</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider h-4 flex items-center">추가 중개 수수료</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-600 tracking-tight font-sans">
                    0원 (0%)
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-sans text-slate-500">토스 PG 직접 계약 · 판매 수수료 0%</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-mono font-medium text-slate-500 uppercase tracking-wider h-4 flex items-center">제작 소요 기간</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-sans">
                    3~5주 완성
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-sans text-slate-500">PG 심사 대행 + 상품 100개 등록</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Manifesto Callout (One Masterpiece) */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-800 mb-5 shadow-xs">
            <span>mord.spec // One Masterpiece</span>
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 tracking-tight leading-snug sm:leading-relaxed break-keep">
            “브랜드 고유의 철학과 감각을 인터페이스 전면에 오롯이 구현하여,
            <br className="hidden sm:inline" />
            고객과 직접 교감하고 영속하는 <span className="text-blue-600 font-bold">단 하나의 명작 자사몰</span>을 완성합니다.”
          </blockquote>
          <p className="text-sm sm:text-base text-slate-600 mt-4 max-w-2xl mx-auto leading-relaxed break-keep font-normal">
            외부 환경의 변화에 흔들리지 않고, 내 브랜드 고유의 자산과 단골 고객 관계를 온전히 축적할 수 있도록 mord가 신뢰할 수 있는 엔지니어링 동반자가 되어드립니다.
          </p>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium mb-3">
            <span>CORE PILLARS // SPECIFICATION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight break-keep">
            단 하나의 명작 자사몰이 약속하는 3가지 본질
          </h2>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28 items-stretch"
        >
          {/* Card 1 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0">
                  PILLAR // 01 · 마진 자율성
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                플랫폼 중개 수수료 0%
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                토스페이먼츠 직접 가맹 연동으로 원가 수준의 카드 수수료만 정산됩니다. 별도의 중간 유통 수수료 없이 모든 결제 대금이 판매자 사업 계좌로 즉시 직결되는 투명한 D2C 구조를 실현합니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-emerald-700 font-semibold text-sm">01</span>
              <span className="font-sans">PG 직접 계약 기반의 100% 투명한 마진 구조</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 shrink-0">
                  PILLAR // 02 · 고객 데이터 소유
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                고객 DB 직접 소유
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                스토어에 방문한 고객의 구매 이력과 회원 데이터를 온전히 자사 자산으로 확보합니다. 직접 소통하는 CRM 마케팅과 개인화 멤버십으로 지속 가능한 브랜드 팬덤을 구축할 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-blue-700 font-semibold text-sm">02</span>
              <span className="font-sans">단골 고객과의 1:1 직접 관계 자산화</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shrink-0">
                  PILLAR // 03 · 안정적 인프라
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                체계적인 인프라 운영 관리
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                정성껏 지은 명작이 비바람에 흔들리지 않도록. 매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에만 전념하실 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-amber-700 font-semibold text-sm">03</span>
              <span className="font-sans">24/7 중단 없는 브랜드 지속 가능성 확보</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
