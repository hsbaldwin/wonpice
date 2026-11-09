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
  Calculator,
  TrendingUp,
  Sparkles,
} from "lucide-react";

export default function SolutionHero() {
  const [heroTab, setHeroTab] = useState<"food" | "fashion">("food");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1500);

  // Financial ROI calculations
  const openMarketFee = Math.round(monthlyRevenue * 0.11);
  const monthlyMaintenance = 10;
  const monthlyNetSavings = Math.max(0, openMarketFee - monthlyMaintenance);
  const annualNetSavings = monthlyNetSavings * 12;
  const paybackDays = monthlyNetSavings > 0 ? Math.max(1, Math.round((75 / monthlyNetSavings) * 30)) : 30;

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-white pt-20 pb-24 sm:pt-28 sm:pb-28 lg:pt-32 lg:pb-32 border-b border-[#e8eaed]"
    >
      {/* Subtle Studio Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-b from-[#e8f0fe]/60 via-[#e6f4ea]/30 to-transparent blur-3xl opacity-60" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill Badge - Calm and understated */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-8 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
          <span>2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) - Clean Google Sans style */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[72px] font-semibold text-[#202124] tracking-tight leading-[1.12] mb-6 sm:mb-8 max-w-5xl mx-auto break-keep">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="text-[#1a73e8] font-bold"> 내 브랜드를 키우는 자사몰 솔루션</span>
        </h1>

        {/* Subtitle - Warm, reassuring mentor tone */}
        <p className="text-[#5f6368] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12 font-normal break-keep">
          남들과 똑같은 스마트스토어 화면과 오픈마켓의 과도한 수수료에서 벗어나 내 고객과 마진의 온전한 주권을 되찾으세요.
          <br className="hidden md:inline" />
          농가·식품부터 패션 브랜드까지, 대표님의 철학을 담은 독창적인 맞춤 디자인과 상품 100개 등록,
          <br className="hidden md:inline" />
          토스 간편결제 연동까지 3~5주 만에 든든한 기술 동반자가 함께 완성합니다.
        </p>

        {/* Dual Actions - Refined pill buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold text-sm sm:text-base shadow-xs hover:shadow transition-colors cursor-pointer tracking-tight"
          >
            <span>50% 프로모션 신청하기</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#1a73e8] font-semibold text-sm sm:text-base border border-[#dadce0] transition-colors cursor-pointer shadow-xs tracking-tight"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4 h-4 opacity-70" />
          </a>
        </div>

        {/* Hero Flagship Studio Stage (Visual Proof Centerpiece) */}
        <div
          data-testid="device-mockup"
          className="max-w-5xl mx-auto mb-16 sm:mb-20 rounded-[32px] sm:rounded-[36px] border border-[#dadce0] bg-[#f8f9fa] shadow-xl shadow-black/5 p-4 sm:p-6 lg:p-7 relative text-left"
        >
          {/* Top Browser Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#dadce0]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ea4335]/80" />
              <span className="w-3 h-3 rounded-full bg-[#fbbc04]/80" />
              <span className="w-3 h-3 rounded-full bg-[#34a853]/80" />
              <div className="ml-2 px-3 py-1 rounded-full bg-white border border-[#dadce0] text-xs font-mono text-[#5f6368] flex items-center gap-1.5 shadow-2xs max-w-[260px] sm:max-w-none truncate">
                <Lock className="w-3.5 h-3.5 text-[#137333]" />
                <span className="text-[#202124] font-semibold">https://brand-flagship.wonpice.kr</span>
                <span className="text-[10px] text-[#137333] hidden sm:inline font-sans font-medium">· TLS 1.3 보안 연결</span>
              </div>
            </div>

            {/* Quick Industry Mockup Switcher */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-full border border-[#dadce0] self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setHeroTab("food")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  heroTab === "food"
                    ? "bg-[#1a73e8] text-white shadow-xs"
                    : "text-[#5f6368] hover:text-[#202124]"
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
                    ? "bg-[#1a73e8] text-white shadow-xs"
                    : "text-[#5f6368] hover:text-[#202124]"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>스타일 룩북 프리뷰</span>
              </button>
            </div>
          </div>

          {/* Store Simulation Canvas */}
          <div className="bg-white rounded-2xl border border-[#dadce0] p-5 sm:p-7 shadow-xs relative overflow-hidden">
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
            <div className="mt-4 pt-4 border-t border-[#f1f3f4] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#137333] bg-[#e6f4ea] px-3 py-1.5 rounded-full font-semibold border border-[#ceead6]">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>토스페이먼츠 직접 계약 · 판매 중개 수수료 0원</span>
              </div>
              <div className="flex items-center gap-2 text-[#1a73e8] bg-[#e8f0fe] px-3 py-1.5 rounded-full font-semibold border border-[#d2e3fc]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>고객 데이터 100% 독립 소유 · 단골 팬덤화</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Metric Ribbon with Precision Baseline Alignment */}
        <div data-testid="metrics-ribbon" className="max-w-7xl mx-auto mb-16 sm:mb-20">
          <div className="bg-[#f8f9fa] border border-[#dadce0] rounded-3xl lg:rounded-full p-6 lg:py-5 lg:px-8 shadow-xs">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#dadce0] gap-y-6 lg:gap-y-0">
              {/* Metric 1 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-semibold text-[#5f6368] h-4 flex items-center tracking-tight">자사몰 제작비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
                    75만 원부터
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 프로모션가
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center min-h-[96px]">
                <span className="text-xs font-semibold text-[#5f6368] h-4 flex items-center tracking-tight">월 고정 유지비</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
                    10만 원
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-medium text-[#5f6368]">서버·자동 백업·3중 모니터링</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-semibold text-[#5f6368] h-4 flex items-center tracking-tight">추가 중개 수수료</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#1a73e8] tracking-tight">
                    0원 (0%)
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-medium text-[#5f6368]">토스 PG 직접 계약 · 판매 수수료 0%</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="flex flex-col items-center justify-between px-4 py-2 lg:py-1 text-center pt-6 lg:pt-0 min-h-[96px]">
                <span className="text-xs font-semibold text-[#5f6368] h-4 flex items-center tracking-tight">제작 소요 기간</span>
                <div className="flex items-baseline justify-center gap-1.5 h-8 items-center my-1">
                  <span className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight">
                    3~5주 완성
                  </span>
                </div>
                <div className="h-6 flex items-center">
                  <span className="text-[11px] font-medium text-[#5f6368]">PG 심사 대행 + 상품 100개 등록</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Manifesto Callout (One Masterpiece) */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f8f9fa] border border-[#dadce0] text-xs font-semibold text-[#1a73e8] mb-5 shadow-xs">
            <span>WonPice Philosophy · One Masterpiece</span>
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#202124] tracking-tight leading-snug sm:leading-relaxed break-keep">
            “모두가 똑같은 플랫폼 템플릿에 브랜드를 구겨 넣을 때,
            <br className="hidden sm:inline" />
            원피스는 대표님의 철학과 핏을 오롯이 담아낸 <span className="text-[#1a73e8] font-bold">단 하나의 명작</span>을 짓습니다.”
          </blockquote>
          <p className="text-sm sm:text-base text-[#5f6368] mt-4 max-w-2xl mx-auto leading-relaxed break-keep font-normal">
            오픈마켓의 잦은 알고리즘 변화에 불안해하지 않고, 내 브랜드의 주권을 온전히 지키며 단골과 직접 호흡할 수 있도록 가장 가까운 기술 동반자가 되어드립니다.
          </p>
        </div>

        {/* Interactive D2C Fee & Profit Simulator */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 bg-white rounded-[32px] border border-[#dadce0] p-6 sm:p-9 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#dadce0]">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e8f0fe] text-xs font-semibold text-[#1a73e8] mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>D2C 실시간 수익 시뮬레이터</span>
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl text-[#202124] tracking-tight break-keep">
                월 매출에 따라 내가 되찾는 순이익은 얼마일까요?
              </h3>
            </div>
            <div className="text-right self-start sm:self-auto">
              <span className="text-xs text-[#5f6368]">현재 예상 월 매출</span>
              <div className="text-2xl sm:text-3xl font-bold text-[#1a73e8] tracking-tight">
                {monthlyRevenue.toLocaleString()}만 원
              </div>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="py-6 space-y-3">
            <div className="flex justify-between text-xs text-[#5f6368] font-medium">
              <span>300만 원</span>
              <span>1,500만 원 (일반 소상공인 평균)</span>
              <span>5,000만 원</span>
            </div>
            <input
              type="range"
              min="300"
              max="5000"
              step="100"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              aria-label="월 매출 슬라이더"
              className="w-full h-3 bg-[#e8eaed] rounded-lg appearance-none cursor-pointer accent-[#1a73e8]"
            />
          </div>

          {/* 3-Column Financial Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {/* Open Market Fee */}
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#dadce0]">
              <span className="text-xs font-medium text-[#5f6368]">오픈마켓 수수료 (평균 11%)</span>
              <div className="text-xl font-bold text-[#d93025] mt-1 tracking-tight">
                -{openMarketFee.toLocaleString()}만 원 / 월
              </div>
              <div className="text-[11px] text-[#5f6368] mt-1">연간 {(openMarketFee * 12).toLocaleString()}만 원 플랫폼에 지출</div>
            </div>

            {/* WonPice Fee */}
            <div className="p-4 rounded-2xl bg-[#f8f9fa] border border-[#dadce0]">
              <span className="text-xs font-medium text-[#5f6368]">원피스 자사몰 수수료</span>
              <div className="text-xl font-bold text-[#1a73e8] mt-1 tracking-tight">
                0원 (수수료 0%)
              </div>
              <div className="text-[11px] text-[#5f6368] mt-1">월 고정 유지보수비 10만 원만 소요</div>
            </div>

            {/* Net Monthly Savings */}
            <div className="p-4 rounded-2xl bg-[#e6f4ea] border border-[#ceead6]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#137333]">매월 추가 확보 순이익</span>
                <TrendingUp className="w-4 h-4 text-[#137333]" />
              </div>
              <div className="text-2xl font-bold text-[#137333] mt-1 tracking-tight">
                +{monthlyNetSavings.toLocaleString()}만 원 / 월
              </div>
              <div className="text-[11px] font-semibold text-[#188038] mt-1">
                연간 +{annualNetSavings.toLocaleString()}만 원 순익 증가
              </div>
            </div>
          </div>

          {/* Payback Callout */}
          <div className="mt-5 p-3.5 rounded-xl bg-[#e8f0fe] border border-[#d2e3fc] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#1a73e8] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#1a73e8]" />
              <span>50% 프로모션 자사몰 구축비(75만 원) 회수 시점</span>
            </div>
            <div className="text-[#1a73e8] font-bold text-sm sm:text-base">
              오픈 후 단 {paybackDays}일 만에 전액 회수
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-semibold mb-3">
            <span>자사몰 핵심 강점</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#202124] tracking-tight break-keep">
            단 하나의 명작 자사몰이 약속하는 3가지 본질
          </h2>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28 items-stretch"
        >
          {/* Card 1 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] text-[#137333] flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6] shrink-0">
                  01 · 수수료 독립
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep">
                플랫폼 중개 수수료 0%
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                오픈마켓의 8~13% 중개 수수료 대신, 토스페이먼츠 직접 계약으로 투명한 PG 결제 수수료만 지출됩니다. 땀 흘려 일군 마진을 플랫폼에 빼앗기지 않고 온전히 대표님의 몫으로 지켜드립니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs font-medium text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#137333] font-semibold text-sm">01</span>
              <span>수수료 종속 탈피와 마진의 온전한 회복</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc] shrink-0">
                  02 · 고객 데이터 소유
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep">
                고객 DB 직접 소유
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                플랫폼 가상번호 뒤에 가려졌던 소중한 단골 고객을 직접 맞이하세요. 구매 이력과 연락처를 100% 소유하여, 언제든 내 손으로 재구매와 브랜드 팬덤을 키워갈 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs font-medium text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#1a73e8] font-semibold text-sm">02</span>
              <span>단골 고객과의 1:1 직접 관계 자산화</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#f8f9fa] p-8 sm:p-10 rounded-[32px] border border-[#dadce0] shadow-xs hover:border-[#bdc1c6] transition-colors flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-2xl bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-[#b06000] bg-[#fef7e0] px-3 py-1 rounded-full border border-[#feefc3] shrink-0">
                  03 · 안정적 인프라
                </span>
              </div>
              <h3 className="font-semibold text-[#202124] text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep">
                체계적인 인프라 운영 관리
              </h3>
              <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                정성껏 지은 명작이 비바람에 흔들리지 않도록. 매일 새벽 자동 DB 백업과 서울·미국·유럽 10분 주기 3중 장애 모니터링으로 기술 걱정 없이 판매에만 전념하실 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#e8eaed] text-xs font-medium text-[#5f6368] flex items-center justify-between h-10">
              <span className="font-mono text-[#b06000] font-semibold text-sm">03</span>
              <span>24/7 중단 없는 브랜드 지속 가능성 확보</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
