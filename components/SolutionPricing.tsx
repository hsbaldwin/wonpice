"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
import { usePartnerModal } from "./PartnerModalContext";

export default function SolutionPricing() {
  const { openPartnerModal } = usePartnerModal();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const isEligible = checked1 && checked2;

  return (
    <section id="pricing" className="py-24 sm:py-32 lg:py-36 bg-[#fafafa] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 border border-slate-200 text-xs font-mono font-medium mb-6 shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>PRICING MATRIX // 2026 자사몰 구축 프로모션</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6 leading-tight break-keep">
            자사몰 솔루션 요금제 &amp; 50% 프로모션 안내
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed break-keep font-normal">
            비싼 개발사 외주나 프리랜서 고용 없이, 초기 기획부터 디자인 세팅, 결제 연동까지 원스톱으로 제공합니다.
            <br className="hidden sm:inline" />
            프로모션 기간 내 신청 시 자사몰 구축비 50% 감면 혜택이 적용됩니다.
          </p>
        </div>

        {/* 3 Pricing Plans Grid in SaaS Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div
            data-testid="plan-starter"
            className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 min-h-[36px]">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-semibold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                    스타터
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">처음 자사몰을 여는 브랜드</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5 h-10">
                  <span className="text-slate-400 line-through text-base font-normal">150만 원</span>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">75만 원~</span>
                  <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                    50% 할인
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-2 h-5 flex items-center">월 유지보수비 10만 원~ (서버·백업·장애대응)</div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-600 space-y-3.5 pb-8 border-t border-slate-100 pt-6 min-h-[280px]">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>업종 테마 + 브랜드 색상·로고 세팅</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>상품·옵션·재고 관리 시스템</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>카드·간편결제 연동 (토스페이먼츠)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>회원가입·마이페이지·배송 조회</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>약관·개인정보처리방침 기본 문안</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>장애 알림 · 매일 새벽 자동 백업</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_starter"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openPartnerModal({ plan: "starter" });
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-sm transition-all cursor-pointer h-12 tracking-tight border border-slate-200"
              >
                <span>스타터 50% 신청 ↗</span>
              </a>
            </div>
          </div>

          {/* Business Plan (Recommended) */}
          <div
            data-testid="plan-business"
            className="bg-white p-8 sm:p-10 rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-200/50 flex flex-col justify-between h-full relative overflow-hidden ring-4 ring-slate-900/5"
          >
            <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-mono font-medium px-3.5 py-1 rounded-full shadow-xs">
              가장 추천하는 플랜
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 min-h-[36px]">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/80">
                    비즈니스
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">스마트스토어 탈플랫폼 브랜드</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5 h-10">
                  <span className="text-slate-400 line-through text-base font-normal">300만 원</span>
                  <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">150만 원~</span>
                  <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                    50% 할인
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-2 h-5 flex items-center">월 유지보수비 20만 원~ (전담 기술 지원)</div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-700 space-y-3.5 pb-8 border-t border-slate-100 pt-6 min-h-[280px]">
                <li className="flex items-center gap-3 font-semibold text-slate-900">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>스타터의 모든 기능 포함</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-blue-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>기존 상품 100개 등록 대행 (엑셀 이전)</span>
                </li>
                <li className="flex items-center gap-3 font-semibold text-blue-600">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>브랜드 전용 도메인 연결 (brand.co.kr)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>업종 맞춤 기능 1개 (출고마감 / 사이즈가이드)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>직원 계정·권한 교육 (1시간 원격 실무)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>분기별 데이터 복구 점검 보고서 제공</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_business"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openPartnerModal({ plan: "business" });
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm sm:text-base shadow-xs hover:shadow-md transition-all cursor-pointer h-12 tracking-tight ring-1 ring-slate-800"
              >
                <span>비즈니스 50% 신청 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Custom Plan */}
          <div
            data-testid="plan-custom"
            className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6 min-h-[36px]">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-mono font-semibold text-slate-700 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                    맞춤 플랜
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500">엔터프라이즈 / 기업</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5 h-10">
                  <span className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight font-sans">별도 견적</span>
                </div>
                <div className="text-xs text-slate-500 mt-2 h-5 flex items-center">유지보수비 별도 견적 협의</div>
              </div>

              <ul className="text-xs sm:text-sm text-slate-600 space-y-3.5 pb-8 border-t border-slate-100 pt-6 min-h-[280px]">
                <li className="flex items-center gap-3 font-semibold text-slate-900">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>비즈니스의 모든 기능 포함</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>전용 서버·DB (독립 데이터 인프라 구성)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>ERP·물류·오픈마켓 연동 개발</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>맞춤 기능 및 레이아웃 커스텀 개발</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>장애 대응 시간 약정 (SLA 체결)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                  <span>전담 기술 PM 배정 &amp; 커스텀 보안 감사</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_custom"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  openPartnerModal({ plan: "custom" });
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-medium text-sm transition-all cursor-pointer h-12 tracking-tight border border-slate-200"
              >
                <span>맞춤 플랜 상담 ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Eligibility Confirmation Card */}
        <div data-testid="eligibility-checker" className="bg-white p-9 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs">
          <h3 className="font-semibold text-[#202124] text-lg sm:text-xl flex items-center gap-2.5 mb-6 tracking-tight">
            <ShieldCheck className="w-5 h-5 text-[#1e8e3e]" />
            <span>프로모션 지원 자격 자가 진단</span>
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-[#3c4043]">
            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors break-keep">
              <input
                type="checkbox"
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0] cursor-pointer"
              />
              <span>식품, 농산물, 패션, 리빙 등 직접 제작·생산하거나 판매 중인 제품이 있습니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors break-keep">
              <input
                type="checkbox"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0] cursor-pointer"
              />
              <span>스마트스토어, 오픈마켓, 소셜커머스 수수료에서 벗어나 내 자사몰을 구축하고자 합니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors break-keep">
              <input
                type="checkbox"
                checked={checked3}
                onChange={(e) => setChecked3(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0] cursor-pointer"
              />
              <span>내 브랜드 전용 도메인으로 충성 단골 고객을 소유하고 성장시키고 싶습니다.</span>
            </label>
          </div>

          <div className="mt-8 pt-6 border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              {isEligible ? (
                <span className="font-semibold text-[#137333] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다
                </span>
              ) : (
                <span className="font-semibold text-[#b06000] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#b06000] shrink-0" />
                  체크 항목을 확인해 주세요
                </span>
              )}
            </div>

            <a
              href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_eligibility_box"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openPartnerModal({ plan: "business" });
              }}
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#1a73e8] hover:text-[#174ea6] underline underline-offset-4 cursor-pointer tracking-tight"
            >
              <span>공식 지원 신청서 바로가기 ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
