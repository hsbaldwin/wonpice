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
import { usePartnerModal } from "./PartnerModalContext";

export default function SolutionHero() {
  const [heroTab, setHeroTab] = useState<"food" | "fashion">("food");
  const { openPartnerModal } = usePartnerModal();

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
        {/* Eyebrow Pill Badge - SaaS Electric Current Status */}
        <div
          data-testid="hero-eyebrow"
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950 text-slate-100 text-xs font-mono font-medium mb-8 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_24px_rgba(6,182,212,0.6)] transition-all cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]"></span>
          </span>
          <span className="text-cyan-300 font-bold tracking-tight">mord 2.4</span>
          <span className="text-cyan-500/60 font-mono">⚡ 220V</span>
          <span className="text-slate-300 font-sans">2026 자사몰 구축비 50% 프로모션 진행 중</span>
        </div>

        {/* Primary SEO Heading (H1) - Neon Sign Glow Typography */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold text-slate-900 tracking-[-0.035em] leading-[1.08] mb-6 sm:mb-8 max-w-5xl mx-auto break-keep drop-shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          오픈마켓 수수료 없이,
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-500 bg-clip-text text-transparent neon-text-blue"> 내 브랜드를 키우는 자사몰 솔루션</span>
        </h1>

        {/* Subtitle - Concrete, product-promotional tone */}
        <p className="text-[#5f6368] text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 sm:mb-12 font-normal break-keep">
          스마트스토어 상품 100개 엑셀 이전부터 토스페이먼츠 PG 가맹 연동, 전용 도메인 연결까지.
          <br className="hidden md:inline" />
          초기 구축비 50% 프로모션으로 외주 개발 부담 없이 3~5주 만에 실제 판매 가능한 자사몰을 오픈합니다.
        </p>

        {/* Dual Actions - Interactive Luminous Energy Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14 sm:mb-16 w-full max-w-md sm:max-w-none mx-auto">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_hero"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white font-medium text-sm sm:text-base btn-3d-primary cursor-pointer tracking-tight ring-1 ring-cyan-500/40 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>50% 프로모션 신청하기</span>
              <ExternalLink className="w-4 h-4 opacity-90 text-cyan-300" />
            </span>
          </a>

          <a
            href="#showcase"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-cyan-50/50 text-slate-900 font-medium text-sm sm:text-base border border-slate-200 btn-3d-secondary cursor-pointer tracking-tight"
          >
            <span>업종별 라이브 데모 둘러보기</span>
            <ArrowDown className="w-4 h-4 opacity-70 text-cyan-600" />
          </a>
        </div>

        {/* Hero Flagship Studio Stage (SaaS Interactive Luminous Workbench) */}
        <div
          data-testid="device-mockup"
          className="max-w-5xl mx-auto mb-16 sm:mb-20 rounded-3xl border border-cyan-500/35 bg-slate-950/5 backdrop-blur-md p-3 sm:p-5 lg:p-6 stage-3d-floating relative text-left"
        >
          {/* Top Browser & Window Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400/90 shadow-2xs" />
              <span className="w-3 h-3 rounded-full bg-amber-400/90 shadow-2xs" />
              <span className="w-3 h-3 rounded-full bg-emerald-400/90 shadow-2xs" />
              <div className="ml-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-mono text-slate-600 flex items-center gap-1.5 slot-depth-inset max-w-[280px] sm:max-w-none truncate">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-slate-900 font-semibold">https://brand-flagship.mord.kr</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-sans font-medium hidden sm:inline-flex items-center gap-1 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  TLS 1.3 · 24ms
                </span>
              </div>
            </div>

            {/* Quick Industry Mockup Switcher */}
            <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200 self-start sm:self-auto track-3d-recessed">
              <button
                type="button"
                onClick={() => setHeroTab("food")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  heroTab === "food"
                    ? "bg-slate-900 text-white pill-3d-active"
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
                    ? "bg-slate-900 text-white pill-3d-active"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Shirt className="w-3.5 h-3.5" />
                <span>스타일 룩북 프리뷰</span>
              </button>
            </div>
          </div>

          {/* Store Simulation Canvas with SaaS Telemetry */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 card-3d-elevated relative overflow-hidden">
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
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 lg:py-5 lg:px-8 card-3d-elevated">
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
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70 shadow-2xs">
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

        {/* Official Product Promotion Package Hub - Neon Energy Power Core */}
        <div className="max-w-4xl mx-auto mb-16 sm:mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950 text-cyan-300 text-xs font-mono font-medium mb-5 shadow-[0_0_15px_rgba(6,182,212,0.35)] border border-cyan-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>PROMOTION SPEC // 2026 상반기 한정 특별 지원</span>
          </div>
          
          <div className="bg-white rounded-3xl border border-cyan-500/35 p-7 sm:p-10 card-3d-elevated hover:shadow-[0_0_50px_rgba(6,182,212,0.28)] text-left space-y-6 relative overflow-hidden group">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-600 uppercase tracking-wider">All-in-One Package</span>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1">
                  mord 자사몰 올인원 런칭 패키지
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  초기 기획부터 상품 100개 세팅, 결제 심사, 보안 도메인까지 전담 엔지니어가 완성합니다.
                </p>
              </div>
              <div className="sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-2xl border sm:border-0 border-slate-200">
                <div className="text-xs text-slate-400 line-through">정가 3,000,000원</div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight neon-text-cyan">
                  1,500,000원
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 ml-2 shadow-[0_0_8px_rgba(16,185,129,0.25)]">50% OFF</span>
                </div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">선착순 파트너사 프로모션 특별가</div>
              </div>
            </div>

            {/* 4 Concrete Core Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3 hover:border-cyan-400/70 hover:shadow-[0_8px_20px_-4px_rgba(6,182,212,0.18)] hover:-translate-y-0.5 transition-all">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">기존 상품 100개 일괄 등록 대행</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    엑셀 파일로 전달 시 상품명·옵션·상세페이지 이미지 완전 세팅
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3 hover:border-cyan-400/70 hover:shadow-[0_8px_20px_-4px_rgba(6,182,212,0.18)] hover:-translate-y-0.5 transition-all">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">토스 간편결제 4종 가맹 연동</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    토스페이·카카오페이·네이버페이·신용카드 PG 심사 서류 일체 대행
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3 hover:border-cyan-400/70 hover:shadow-[0_8px_20px_-4px_rgba(6,182,212,0.18)] hover:-translate-y-0.5 transition-all">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">브랜드 독립 도메인 무상 연결</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    brand.co.kr 전용 주소 및 256-bit SSL 보안 인증서 평생 자동 갱신
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50/90 border border-slate-200/90 flex items-start gap-3 hover:border-cyan-400/70 hover:shadow-[0_8px_20px_-4px_rgba(6,182,212,0.18)] hover:-translate-y-0.5 transition-all">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">3중 모니터링 &amp; 1:1 실무 교육</div>
                  <div className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    매일 새벽 자동 DB 백업 및 관리자 60분 원격 실무 교육 기본 제공
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-mono">
                구축 소요 기간: 계약일로부터 3~5주 (PG 심사 병행)
              </span>
              <button
                type="button"
                onClick={() => openPartnerModal({ plan: "business" })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 hover:bg-slate-900 text-white text-xs sm:text-sm font-medium transition-all btn-3d-primary cursor-pointer w-full sm:w-auto justify-center ring-1 ring-cyan-500/40"
              >
                <span>50% 프로모션 패키지 신청하기</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
              </button>
            </div>
          </div>
        </div>

        {/* 3 Core Value Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-medium mb-3 shadow-2xs">
            <span>CORE SPEC // 3대 실무 혜택</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight break-keep">
            mord 솔루션 도입으로 얻는 3대 실무 성과
          </h2>
        </div>

        <div
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto text-left scroll-mt-24 sm:scroll-mt-28 items-stretch"
        >
          {/* Card 1 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 card-3d-elevated hover:border-emerald-400 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.25)] transition-all duration-300 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 shrink-0 shadow-2xs">
                  PILLAR // 01 · 판매 수수료 0%
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                플랫폼 중개 수수료 0%
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                토스페이먼츠 직접 가맹 계약으로 카드사 원가 수수료(약 2~3%대)만 발생합니다. 별도의 플랫폼 중개 수수료가 일체 없어, 모든 판매 대금이 사업자 통장으로 100% 직결 정산됩니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-emerald-700 font-semibold text-sm neon-text-emerald">01</span>
              <span className="font-sans">중개 수수료 0원 · 전액 판매자 직결 정산</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 card-3d-elevated hover:border-cyan-400 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.25)] transition-all duration-300 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
                  <Users className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 shrink-0 shadow-2xs">
                  PILLAR // 02 · 고객 데이터 소유
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                고객 DB 직접 소유
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                구매 고객의 성명, 연락처, 배송지, 주문 내역을 자사 DB로 영구 보존합니다. 가상번호가 아닌 실제 고객 연락처로 신상품 안내, 카카오 알림톡 등 자율적인 재구매 마케팅을 집행할 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-blue-700 font-semibold text-sm neon-text-blue">02</span>
              <span className="font-sans">실고객 데이터 100% 엑셀 다운로드 및 CRM 자산화</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 card-3d-elevated hover:border-amber-400 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.25)] transition-all duration-300 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center justify-between mb-6 h-12">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 border border-amber-200/80 flex items-center justify-center shrink-0 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200/80 shrink-0 shadow-2xs">
                  PILLAR // 03 · 안정적 인프라
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-xl sm:text-2xl mb-3 h-8 sm:h-9 flex items-center tracking-tight break-keep font-sans">
                체계적인 인프라 운영 관리
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed min-h-[72px] sm:min-h-[84px] break-keep">
                서울 ICN 거점 기반의 초저지연 서버와 매일 새벽 자동 DB 백업, 서울·미국·유럽 10분 주기 헬스체크를 가동합니다. 전담 엔지니어가 시스템을 관리하므로 비개발자도 기술 부담 없이 판매에 집중할 수 있습니다.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-slate-100 text-xs font-mono font-medium text-slate-500 flex items-center justify-between h-10">
              <span className="text-amber-700 font-semibold text-sm">03</span>
              <span className="font-sans">24/7 서버 장애 자동 감시 &amp; 일일 백업</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
