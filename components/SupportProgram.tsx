"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

export default function SupportProgram() {
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(true);

  const isEligible = checked1 && checked2;

  return (
    <section id="support" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e6f4ea] text-[#137333] border border-[#ceead6] text-xs sm:text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 text-[#1e8e3e]" />
            <span>2026 농가 판로개척 지원 사업</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            농가 맞춤 자사몰 제작,
            <br />
            <span className="text-[#137333] font-medium">선착순 구축비 50% 지원 혜택</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            복잡한 코딩이나 웹 개발 걱정 없이, 상품 등록부터 카드 결제 연동까지 원스톱으로 지원합니다.
            <br className="hidden sm:inline" />
            농업인은 좋은 농산물을 기르고 포장하는 데만 집중하실 수 있도록 가게지기가 기술을 책임집니다.
          </p>
        </div>

        {/* 2 Plan Cards in 1280px Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Starter Plan */}
          <div className="bg-white p-10 sm:p-14 rounded-[36px] border border-[#dadce0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs sm:text-sm font-medium text-[#5f6368] bg-[#f1f3f4] px-4 py-1.5 rounded-full">
                  스타터 플랜
                </span>
                <span className="text-xs sm:text-sm text-[#5f6368]">처음 자사몰을 여는 농가</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#9aa0a6] line-through text-base sm:text-lg">150만 원</span>
                  <span className="text-4xl sm:text-5xl font-normal text-[#202124]">75만 원</span>
                  <span className="text-xs sm:text-sm font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6]">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#5f6368] mt-2">월 유지보수비 10만 원 (서버 호스팅·매일 백업·장애 모니터링)</div>
              </div>

              <ul className="text-xs sm:text-sm text-[#5f6368] space-y-3.5 pb-8 border-t border-[#f1f3f4] pt-6">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>농산물 맞춤 테마 디자인 + 농장 로고 세팅</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>중량(kg)/과수 규격 옵션 관리 시스템</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>토스페이먼츠 간편결제·카드 결제 연동 (PG 심사 대행)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>주문 접수 알림톡 및 고객 마이페이지</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>매일 새벽 자동 DB 백업 &amp; 10분 주기 서버 감시</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_starter"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full bg-[#f1f3f4] hover:bg-[#e8eaed] text-[#202124] font-medium text-sm sm:text-base transition-all"
              >
                <span>스타터 50% 지원 신청 ↗</span>
              </a>
            </div>
          </div>

          {/* Business Plan (Recommended) */}
          <div className="bg-[#f8f9fa] p-10 sm:p-14 rounded-[36px] border-2 border-[#202124] shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#202124] text-white text-xs font-medium px-5 py-1.5 rounded-bl-2xl">
              가장 많은 농가 선택
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs sm:text-sm font-medium text-[#137333] bg-[#e6f4ea] px-4 py-1.5 rounded-full border border-[#ceead6]">
                  비즈니스 플랜
                </span>
                <span className="text-xs sm:text-sm text-[#5f6368]">스마트스토어 병행 농가</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#9aa0a6] line-through text-base sm:text-lg">300만 원</span>
                  <span className="text-4xl sm:text-5xl font-normal text-[#202124]">150만 원</span>
                  <span className="text-xs sm:text-sm font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full border border-[#ceead6]">
                    50% 지원가
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-[#5f6368] mt-2">월 유지보수비 20만 원 (전담 기술 지원)</div>
              </div>

              <ul className="text-xs sm:text-sm text-[#3c4043] space-y-3.5 pb-8 border-t border-[#dadce0] pt-6">
                <li className="flex items-center gap-3 font-medium text-[#202124]">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>스타터의 모든 기능 100% 포함</span>
                </li>
                <li className="flex items-center gap-3 font-medium text-[#137333]">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>기존 상품 100개 등록 대행 (엑셀 전달 시 일괄 세팅)</span>
                </li>
                <li className="flex items-center gap-3 font-medium text-[#137333]">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>우리 농장 전용 독립 도메인 연결 (farm.co.kr)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>당일 수확 마감 타이머 &amp; 산지 포장 스토리 블록</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e] shrink-0" />
                  <span>농업인을 위한 1:1 원격 실무 교육 (1시간)</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_business"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base shadow-xs hover:shadow-sm transition-all cursor-pointer"
              >
                <span>비즈니스 50% 지원 신청 ↗</span>
                <ExternalLink className="w-4.5 h-4.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Inline Support Eligibility Confirmation in 1280px Scale */}
        <div className="bg-[#f8f9fa] p-9 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs">
          <h3 className="font-medium text-[#202124] text-lg sm:text-xl flex items-center gap-2.5 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#1e8e3e]" />
            <span>3초 지원 자격 간이 확인</span>
          </h3>

          <div className="space-y-4 text-sm sm:text-base text-[#3c4043]">
            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked1}
                onChange={(e) => setChecked1(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>과수원, 채소 재배, 쌀·잡곡, 수제 가공식품을 직접 생산하거나 판매 중입니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked2}
                onChange={(e) => setChecked2(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>스마트스토어, 오픈마켓, 또는 직거래로 농산물 판매 경험이 있거나 준비 중입니다.</span>
            </label>

            <label className="flex items-center gap-3.5 cursor-pointer p-3 rounded-2xl hover:bg-white transition-colors">
              <input
                type="checkbox"
                checked={checked3}
                onChange={(e) => setChecked3(e.target.checked)}
                className="w-5 h-5 rounded text-[#1e8e3e] focus:ring-[#1e8e3e] border-[#dadce0]"
              />
              <span>내 농장만의 이름과 브랜드를 걸고 정직한 제값에 판매하고 싶습니다.</span>
            </label>
          </div>

          <div className="mt-8 pt-6 border-t border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              {isEligible ? (
                <span className="font-medium text-[#137333] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#1e8e3e]" />
                  지원 대상 확인 완료: 50% 감면 혜택 적용 대상입니다.
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
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-medium text-[#1a73e8] hover:text-[#174ea6] underline underline-offset-4"
            >
              <span>공식 지원 신청서 바로가기 (가게지기) ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
