"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

export default function PromotionBridge() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const isEligible = checked1 && checked2;

  return (
    <section id="promotion" className="py-20 sm:py-28 bg-white border-b border-[#e8eaed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header (Google Store style) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>2026 농가 직거래 특별 지원 프로그램</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4 leading-snug">
            농가 맞춤 자사몰 제작,
            <br />
            <span className="text-[#137333] font-medium">선착순 농가 구축비 50% 지원 혜택</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            비싼 개발사 외주나 복잡한 코딩 걱정 없이, 상품 등록부터 카드 결제 연동까지 원스톱으로 세팅해 드립니다.
            <br className="hidden sm:inline" />
            스마트스토어 수수료를 아끼고 내 단골을 모으는 가장 확실한 첫걸음을 50% 지원과 함께 시작하세요.
          </p>
        </div>

        {/* Pricing & Plan Comparison in Google Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Starter Plan */}
          <div className="bg-white p-8 sm:p-9 rounded-3xl border border-[#dadce0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-medium text-[#5f6368] bg-[#f1f3f4] px-3.5 py-1 rounded-full">
                  스타터 플랜
                </span>
                <span className="text-xs text-[#5f6368]">처음 자사몰을 여는 농가</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#9aa0a6] line-through text-sm">150만 원</span>
                  <span className="text-3xl font-normal text-[#202124]">75만 원</span>
                  <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs text-[#5f6368] mt-1.5">월 유지보수비 10만 원 (서버·백업·장애대응)</div>
              </div>

              <ul className="text-xs text-[#5f6368] space-y-3 pb-6 border-t border-[#f1f3f4] pt-5">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>농산물·식품 맞춤 테마 + 브랜드 로고 세팅</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>중량(kg)/과수 옵션 및 재고 관리 시스템</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>토스페이먼츠 간편결제·카드 결제 연동 (PG 대행)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>주문 접수 알림톡 및 회원 마이페이지</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>매일 새벽 자동 DB 백업 &amp; 10분 주기 서버 감시</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_starter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-xs sm:text-sm transition-all"
              >
                <span>스타터 50% 지원 신청 ↗</span>
              </a>
            </div>
          </div>

          {/* Business Plan (Recommended) in Google Store Flagship Style */}
          <div className="bg-[#f8f9fa] p-8 sm:p-9 rounded-3xl border-2 border-[#202124] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#202124] text-white text-[11px] font-medium px-4 py-1 rounded-bl-2xl">
              가장 많은 농가 선택
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3.5 py-1 rounded-full border border-[#ceead6]">
                  비즈니스 플랜
                </span>
                <span className="text-xs text-[#5f6368]">스마트스토어 병행 농가</span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-[#9aa0a6] line-through text-sm">300만 원</span>
                  <span className="text-3xl font-normal text-[#202124]">150만 원</span>
                  <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs text-[#5f6368] mt-1.5">월 유지보수비 20만 원 (전담 기술 지원)</div>
              </div>

              <ul className="text-xs text-[#3c4043] space-y-3 pb-6 border-t border-[#dadce0] pt-5">
                <li className="flex items-center gap-2.5 font-medium text-[#202124]">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>스타터의 모든 기능 100% 포함</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-[#137333]">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>기존 상품 100개 등록 대행 (엑셀 일괄 세팅)</span>
                </li>
                <li className="flex items-center gap-2.5 font-medium text-[#137333]">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>우리 농장 전용 독립 도메인 연결 (farm.co.kr)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>당일 수확 마감 타이머 &amp; 산지 포장 스토리 블록</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                  <span>농업인을 위한 1:1 원격 실무 교육 (1시간)</span>
                </li>
              </ul>
            </div>

            <div className="pt-6">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_business"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>비즈니스 50% 지원 신청 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* 3-Second Quick Eligibility Checker in Google Style */}
        <div className="bg-[#f8f9fa] p-7 sm:p-8 rounded-3xl border border-[#dadce0] shadow-xs">
          <h3 className="font-medium text-[#202124] text-base flex items-center gap-2 mb-4">
            <ShieldCheck className="w-4 h-4 text-[#1e8e3e]" />
            <span>3초 지원 자격 간이 확인</span>
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-[#3c4043]">
            <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                className="w-4 h-4 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>과수원, 채소 재배, 쌀·잡곡, 수제 가공식품을 직접 생산하거나 판매 중입니다.</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                className="w-4 h-4 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>스마트스토어, 오픈마켓, 또는 직거래로 농산물 판매 경험이 있거나 준비 중입니다.</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer p-2.5 rounded-xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked3}
                onChange={(e) => setChecked3(e.target.checked)}
                className="w-4 h-4 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>내 농장만의 이름과 브랜드를 걸고 정직한 제값에 판매하고 싶습니다.</span>
            </label>
          </div>

          <div className="mt-6 pt-4 border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs">
              {isEligible ? (
                <span className="font-medium text-[#137333] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#1e8e3e]" />
                  지원 대상 확인 완료: 50% 감면 신청이 가능합니다.
                </span>
              ) : (
                <span className="font-medium text-[#b06000]">
                  체크 항목을 확인해 주세요.
                </span>
              )}
            </div>

            <a
              href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_eligibility_box"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#1a73e8] hover:text-[#174ea6] underline underline-offset-4"
            >
              <span>공식 신청서 바로가기 (가게지기) ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
