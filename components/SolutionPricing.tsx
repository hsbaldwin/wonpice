"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ExternalLink, ShieldCheck, AlertCircle, ArrowDown } from "lucide-react";
import { usePartnerModal } from "./PartnerModalContext";

export default function SolutionPricing() {
  const { openPartnerModal } = usePartnerModal();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const isEligible = checked1 && checked2;

  return (
    <section id="pricing" className="py-24 sm:py-32 lg:py-36 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs uppercase font-mono tracking-widest text-[#1a73e8] font-medium mb-3">
            The Trinity of Scale · 3단계 성장 구조
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-[#137333] border border-[#ceead6] text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-[#1e8e3e]" />
            <span>2026 자사몰 구축 프로모션</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            자사몰 솔루션 요금제 &amp; 50% 프로모션 안내
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            비싼 개발사 외주나 프리랜서 고용 없이, 초기 기획부터 디자인 세팅, 결제 연동까지 원스톱으로 제공합니다.
            <br className="hidden sm:inline" />
            프로모션 기간 내 신청 시 자사몰 구축비 50% 감면 혜택이 적용됩니다.
          </p>
        </div>

        {/* 3 Pricing Plans Grid in Google Store Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div
            data-testid="plan-starter"
            className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#dadce0] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-[#5f6368] bg-[#f1f3f4] px-4 py-1.5 rounded-full">
                    스타터
                  </span>
                  <span className="text-[11px] font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    Stage I · 씨앗 (Seed)
                  </span>
                </div>
                <span className="text-xs text-[#5f6368]">처음 자사몰을 여는 브랜드</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[#9aa0a6] line-through text-base">150만 원</span>
                  <span className="text-3xl sm:text-4xl font-normal text-[#202124]">75만 원~</span>
                  <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 할인
                  </span>
                </div>
                <div className="text-xs text-[#5f6368] mt-2">월 유지보수비 10만 원~ (서버·백업·장애대응)</div>
              </div>

              <ul className="text-xs sm:text-sm text-[#5f6368] space-y-3.5 pb-8 border-t border-[#f1f3f4] pt-6">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>업종 테마 + 브랜드 색상·로고 세팅</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>상품·옵션·재고 관리 시스템</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>카드·간편결제 연동 (토스페이먼츠)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>회원가입·마이페이지·배송 조회</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>약관·개인정보처리방침 기본 문안</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-sm transition-all cursor-pointer"
              >
                <span>스타터 50% 신청 ↗</span>
              </a>
            </div>
          </div>

          {/* Business Plan (Recommended) */}
          <div
            data-testid="plan-business"
            className="bg-white p-8 sm:p-10 rounded-[36px] border-2 border-[#1a73e8] shadow-md shadow-[#1a73e8]/5 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-4 right-4 bg-[#1a73e8] text-white text-xs font-medium px-4 py-1 rounded-full shadow-xs">
              가장 추천하는 플랜
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-[#137333] bg-[#e6f4ea] px-4 py-1.5 rounded-full border border-[#ceead6]">
                    비즈니스
                  </span>
                  <span className="text-[11px] font-mono font-medium text-[#137333] bg-[#ceead6] px-2.5 py-0.5 rounded-full">
                    Stage II · 도약 (Core)
                  </span>
                </div>
                <span className="text-xs text-[#5f6368]">스마트스토어 탈플랫폼 브랜드</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-[#9aa0a6] line-through text-base">300만 원</span>
                  <span className="text-3xl sm:text-4xl font-normal text-[#202124]">150만 원~</span>
                  <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 할인
                  </span>
                </div>
                <div className="text-xs text-[#5f6368] mt-2">월 유지보수비 20만 원~ (전담 기술 지원)</div>
              </div>

              <ul className="text-xs sm:text-sm text-[#3c4043] space-y-3.5 pb-8 border-t border-[#dadce0] pt-6">
                <li className="flex items-center gap-3 font-medium text-[#202124]">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>스타터의 모든 기능 포함</span>
                </li>
                <li className="flex items-center gap-3 font-medium text-[#1a73e8]">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>기존 상품 100개 등록 대행 (엑셀 이전)</span>
                </li>
                <li className="flex items-center gap-3 font-medium text-[#1a73e8]">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>브랜드 전용 도메인 연결 (brand.co.kr)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>업종 맞춤 기능 1개 (출고마감 / 사이즈가이드)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>직원 계정·권한 교육 (1시간 원격 실무)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] text-white font-medium text-sm sm:text-base shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>비즈니스 50% 신청 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Custom Plan */}
          <div
            data-testid="plan-custom"
            className="bg-white p-8 sm:p-10 rounded-[36px] border border-[#dadce0] shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-medium text-[#5f6368] bg-[#f1f3f4] px-4 py-1.5 rounded-full">
                    맞춤
                  </span>
                  <span className="text-[11px] font-mono font-medium text-[#5f6368] bg-[#f1f3f4] px-2.5 py-0.5 rounded-full">
                    Stage III · 무한 (Infinity)
                  </span>
                </div>
                <span className="text-xs text-[#5f6368]">엔터프라이즈 / 기업</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-normal text-[#202124]">별도 견적</span>
                </div>
                <div className="text-xs text-[#5f6368] mt-2">유지보수비 별도 견적 협의</div>
              </div>

              <ul className="text-xs sm:text-sm text-[#5f6368] space-y-3.5 pb-8 border-t border-[#f1f3f4] pt-6">
                <li className="flex items-center gap-3 font-medium text-[#202124]">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>비즈니스의 모든 기능 포함</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>전용 서버·DB (독립 데이터 인프라 구성)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>ERP·물류·오픈마켓 연동 개발</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>맞춤 기능 및 레이아웃 커스텀 개발</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-4.5 h-4.5 text-[#1e8e3e] shrink-0" />
                  <span>장애 대응 시간 약정 (SLA 체결)</span>
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-sm transition-all cursor-pointer"
              >
                <span>맞춤 플랜 상담 ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Eligibility Confirmation Card */}
        <div data-testid="eligibility-checker" className="bg-white p-9 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs">
          <h3 className="font-medium text-[#202124] text-lg sm:text-xl flex items-center gap-2.5 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#1e8e3e]" />
            <span>프로모션 지원 자격 자가 진단</span>
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-[#3c4043]">
            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors">
              <input
                type="checkbox"
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0] cursor-pointer"
              />
              <span>식품, 농산물, 패션, 리빙 등 직접 제작·생산하거나 판매 중인 제품이 있습니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors">
              <input
                type="checkbox"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0] cursor-pointer"
              />
              <span>스마트스토어, 오픈마켓, 소셜커머스 수수료에서 벗어나 내 자사몰을 구축하고자 합니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-[#f8f9fa] transition-colors">
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
                <span className="font-medium text-[#137333] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다
                </span>
              ) : (
                <span className="font-medium text-[#b06000] flex items-center gap-2">
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
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#1a73e8] hover:text-[#174ea6] underline underline-offset-4 cursor-pointer"
            >
              <span>공식 지원 신청서 바로가기 ↗</span>
            </a>
          </div>
        </div>

        {/* Contextual Transition Bridge to Section 05 (FAQ) */}
        <div className="pt-4">
          <a
            href="#faq"
            className="group block max-w-4xl mx-auto bg-white border border-[#dadce0] rounded-3xl p-6 sm:p-7 text-left shadow-xs hover:border-[#1a73e8]/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    Next Chapter · 05
                  </span>
                  <span className="text-xs font-medium text-[#5f6368]">
                    자주 묻는 질문 &amp; 1:1 상담
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors flex items-center gap-1.5">
                  <span>신청 전, 아직 풀리지 않은 궁금증이나 고민이 있으신가요?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5f6368]">
                  기존 상품 100개 이전 절차, 도메인 연결, 토스 결제 계약, 관리자 실무 교육 안내
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#1a73e8] bg-[#f8f9fa] border border-[#dadce0] px-4 py-2 rounded-full group-hover:bg-[#1a73e8] group-hover:text-white transition-all shadow-xs inline-flex items-center gap-1.5">
                  <span>05 궁금증 해결하기</span>
                  <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
