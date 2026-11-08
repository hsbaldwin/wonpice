"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ExternalLink, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";

export default function PromotionBridge() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const isEligible = checked1 && checked2;

  return (
    <section id="promotion" className="py-16 sm:py-24 bg-gradient-to-b from-stone-50 via-emerald-50/50 to-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2026 농가 온라인 직거래 특별 지원 프로그램</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight mb-4 leading-tight">
            농가 맞춤 자사몰 제작,
            <br />
            <span className="text-emerald-700">선착순 농가 구축비 50% 지원 혜택</span>
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            비싼 개발사 외주나 복잡한 코딩 걱정 없이, 상품 등록부터 카드 결제 연동까지 원스톱으로 세팅해 드립니다.
            <br className="hidden sm:inline" />
            스마트스토어 수수료를 아끼고 내 단골을 모으는 가장 확실한 첫걸음을 50% 지원과 함께 시작하세요.
          </p>
        </div>

        {/* Pricing & Plan Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Starter Plan */}
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-stone-600 bg-stone-100 px-3 py-1 rounded-full">
                  스타터 플랜
                </span>
                <span className="text-xs text-stone-400 font-medium">처음 자사몰을 여는 농가</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-stone-400 line-through text-sm font-semibold">150만 원</span>
                  <span className="text-3xl font-black text-stone-900">75만 원</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-1">월 유지보수비 10만 원 (서버·백업·장애대응)</div>
              </div>

              <ul className="text-xs text-stone-600 space-y-2.5 pb-6 border-b border-stone-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>농산물·식품 맞춤 테마 + 농장 브랜드 로고 세팅</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>중량(kg)/과수 옵션 및 재고 관리 시스템</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>토스페이먼츠 간편결제·카드 결제 연동 (PG 심사 대행)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>주문 접수 카카오 알림톡 및 회원 마이페이지</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>매일 새벽 자동 DB 백업 &amp; 10분 주기 서버 감시</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_starter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-all"
              >
                <span>스타터 50% 지원 신청 ↗</span>
              </a>
            </div>
          </div>

          {/* Business Plan (Recommended) */}
          <div className="bg-white p-7 rounded-3xl border-2 border-emerald-600 shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-700 text-white text-[11px] font-black px-4 py-1 rounded-bl-xl shadow-xs">
              가장 많은 농가 선택
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  비즈니스 플랜
                </span>
                <span className="text-xs text-emerald-700 font-medium">스마트스토어 병행 브랜드 농가</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-stone-400 line-through text-sm font-semibold">300만 원</span>
                  <span className="text-3xl font-black text-emerald-800">150만 원</span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs text-stone-500 mt-1">월 유지보수비 20만 원 (전담 기술 지원)</div>
              </div>

              <ul className="text-xs text-stone-600 space-y-2.5 pb-6 border-b border-stone-100">
                <li className="flex items-center gap-2 font-semibold text-stone-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>스타터의 모든 기능 100% 포함</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>기존 상품 100개 등록 대행 (엑셀 전달 시 일괄 세팅)</span>
                </li>
                <li className="flex items-center gap-2 font-semibold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>우리 농장 전용 독립 도메인 연결 (farm.co.kr / .kr)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>당일 수확 마감 타이머 &amp; 산지 포장 스토리 블록 맞춤 개발</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>어르신 농업인을 위한 1:1 관리자 화면 원격 실무 교육 (1시간)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_business"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>비즈니스 50% 지원 신청 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Second Quick Eligibility Checker */}
        <div className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs">
          <h3 className="font-extrabold text-stone-900 text-sm sm:text-base flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>3초 지원 자격 간이 확인</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-stone-700">
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-stone-50">
              <input
                type="checkbox"
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
              />
              <span>과수원, 채소 재배, 쌀·잡곡, 수제 가공식품을 직접 생산하거나 판매 중입니다.</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-stone-50">
              <input
                type="checkbox"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
              />
              <span>스마트스토어, 오픈마켓, 또는 지인 직거래로 농산물 판매 경험이 있거나 준비 중입니다.</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-stone-50">
              <input
                type="checkbox"
                checked={checked3}
                onChange={(e) => setChecked3(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-stone-300"
              />
              <span>내 농장만의 이름과 브랜드를 걸고 정직한 제값에 판매하고 싶습니다.</span>
            </label>
          </div>

          <div className="mt-5 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              {isEligible ? (
                <span className="font-bold text-emerald-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  지원 대상 확인 완료: 50% 감면 신청이 가능합니다.
                </span>
              ) : (
                <span className="font-bold text-amber-700">
                  체크 항목을 확인해 주세요.
                </span>
              )}
            </div>

            <a
              href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_eligibility_box"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 underline underline-offset-4"
            >
              <span>공식 신청서 바로가기 (가게지기) ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
