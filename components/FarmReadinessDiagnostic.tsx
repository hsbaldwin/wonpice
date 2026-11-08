"use client";

import { useState } from "react";
import { Compass, ArrowRight } from "lucide-react";

export default function FarmReadinessDiagnostic() {
  const [q1, setQ1] = useState<string>("smartstore");
  const [q2, setQ2] = useState<string>("seasonal_fruit");
  const [q3, setQ3] = useState<string>("frequent");
  const [q4, setQ4] = useState<string>("own_box");

  // Calculate score
  const score1 = q1 === "smartstore" ? 30 : q1 === "direct_chat" ? 35 : 15;
  const score2 = q2 === "seasonal_fruit" ? 25 : q2 === "processed_food" ? 25 : 20;
  const score3 = q3 === "frequent" ? 30 : q3 === "occasional" ? 20 : 10;
  const score4 = q4 === "own_box" ? 15 : q4 === "plain_box" ? 10 : 5;
  const totalScore = Math.min(100, score1 + score2 + score3 + score4);

  let tierTitle = "자사몰 병행 독립 최우선 권장 단계";
  let tierBadge = "A+ 등급";
  let tierDesc =
    "이미 품질을 인정받아 단골 수요가 충분히 축적된 상태입니다. 지금 즉시 자사몰을 오픈하여 스마트스토어와 공판장에 떼이던 수수료를 농가 순이익으로 전환하고 고객 DB를 소유해야 할 최적의 골든타임입니다.";
  let badgeColor = "bg-[#e6f4ea] text-[#137333] border-[#ceead6]";

  if (totalScore < 65) {
    tierTitle = "직거래 인프라 선제 구축 단계";
    tierBadge = "B 등급";
    tierDesc =
      "아직 대규모 단골이 없더라도, 처음부터 자사몰을 함께 세팅해 두어야 유입되는 고객을 놓치지 않고 차곡차곡 농장의 평생 단골 자산으로 모을 수 있습니다. 50% 구축비 지원을 활용해 부담 없이 시작할 것을 권장합니다.";
    badgeColor = "bg-[#fef7e0] text-[#b06000] border-[#feefc3]";
  } else if (totalScore < 85) {
    tierTitle = "스마트스토어-자사몰 상생 전환 적기";
    tierBadge = "A 등급";
    tierDesc =
      "신규 고객이 꾸준히 유입되고 있으나 고객 정보가 플랫폼에 묶여 있습니다. 택배 박스 내 농부 편지와 자사몰 첫 구매 QR 쿠폰을 투입하여 25%의 충성 단골을 자사몰로 유도하기 가장 이상적인 조건입니다.";
    badgeColor = "bg-[#e8f0fe] text-[#1a73e8] border-[#d2e3fc]";
  }

  return (
    <section id="diagnostic" className="py-20 sm:py-28 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header (Google Store style) */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs font-medium mb-4">
            <Compass className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>1분 인터랙티브 판로 자가진단</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4">
            우리 농장은 지금 자사몰을 만들면 얼마나 효과를 볼까?
          </h2>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            4가지 핵심 질문에 응답하시면, 우리 농산물의 판로 독립 적합도 점수와 맞춤형 실행 가이드를 즉시 진단해 드립니다.
          </p>
        </div>

        {/* Diagnostic Form */}
        <div className="bg-white p-7 sm:p-10 rounded-3xl border border-[#dadce0] shadow-xs space-y-8">
          {/* Question 1 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#202124] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#202124] text-white text-xs flex items-center justify-center font-medium">
                1
              </span>
              <span>현재 농산물의 가장 주된 판매 경로는 무엇인가요?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "auction", label: "공판장·도매시장 경매 위주", desc: "시세에 따라 출하" },
                { id: "smartstore", label: "스마트스토어·쿠팡 위주", desc: "온라인 오픈마켓 입점" },
                { id: "direct_chat", label: "지인·카카오톡·전화 직거래", desc: "기존 고객 직접 연락" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQ1(opt.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    q1 === opt.id
                      ? "bg-[#f8f9fa] border-[#202124] shadow-xs"
                      : "bg-white border-[#dadce0] hover:border-[#5f6368]"
                  }`}
                >
                  <div className="font-medium text-xs sm:text-sm text-[#202124] mb-0.5">{opt.label}</div>
                  <div className="text-[11px] text-[#5f6368]">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#202124] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#202124] text-white text-xs flex items-center justify-center font-medium">
                2
              </span>
              <span>재배·생산하시는 주력 농식품 품목은 무엇인가요?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "seasonal_fruit", label: "제철 신선 과일·채소", desc: "사과, 감귤, 딸기, 토마토 등" },
                { id: "grains", label: "쌀·잡곡·건나물류", desc: "상온 보관 및 정기 소비형" },
                { id: "processed_food", label: "가공식품·수제 장류·즙류", desc: "된장, 참기름, 과일즙 등" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQ2(opt.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    q2 === opt.id
                      ? "bg-[#f8f9fa] border-[#202124] shadow-xs"
                      : "bg-white border-[#dadce0] hover:border-[#5f6368]"
                  }`}
                >
                  <div className="font-medium text-xs sm:text-sm text-[#202124] mb-0.5">{opt.label}</div>
                  <div className="text-[11px] text-[#5f6368]">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#202124] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#202124] text-white text-xs flex items-center justify-center font-medium">
                3
              </span>
              <span>“작년에 산 거 또 살 수 있나요?”라는 단골 재구매 문의가 있나요?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "frequent", label: "수확기마다 문의가 자주 옴", desc: "재구매 고객 다수 확보" },
                { id: "occasional", label: "이따금 전화나 문자가 옴", desc: "일부 단골 고객 존재" },
                { id: "none", label: "아직 거의 없음 (신규 단계)", desc: "이제 막 판매 시작" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQ3(opt.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    q3 === opt.id
                      ? "bg-[#f8f9fa] border-[#202124] shadow-xs"
                      : "bg-white border-[#dadce0] hover:border-[#5f6368]"
                  }`}
                >
                  <div className="font-medium text-xs sm:text-sm text-[#202124] mb-0.5">{opt.label}</div>
                  <div className="text-[11px] text-[#5f6368]">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 4 */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-[#202124] flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-[#202124] text-white text-xs flex items-center justify-center font-medium">
                4
              </span>
              <span>택배 발송 시 농장 이름이나 브랜드 박스를 사용하시나요?</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "own_box", label: "우리 농장 전용 박스·스티커", desc: "브랜드 인지도 구축 중" },
                { id: "plain_box", label: "일반 무지 상자나 공판장 박스", desc: "포장재 표준화 미비" },
                { id: "no_courier", label: "아직 택배 배송 경험 없음", desc: "직접 납품 또는 수매" },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setQ4(opt.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    q4 === opt.id
                      ? "bg-[#f8f9fa] border-[#202124] shadow-xs"
                      : "bg-white border-[#dadce0] hover:border-[#5f6368]"
                  }`}
                >
                  <div className="font-medium text-xs sm:text-sm text-[#202124] mb-0.5">{opt.label}</div>
                  <div className="text-[11px] text-[#5f6368]">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Result Card in Google Style */}
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#dadce0] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#dadce0]">
              <div>
                <span className="text-xs text-[#5f6368] font-normal">자가진단 종합 결과</span>
                <h4 className="text-xl font-normal text-[#202124] flex items-center gap-2 mt-1">
                  <span>{tierTitle}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${badgeColor}`}>
                    {tierBadge} ({totalScore}점)
                  </span>
                </h4>
              </div>
              <div>
                <span className="text-xs text-[#5f6368]">자사몰 적합도 지수</span>
                <div className="text-2xl font-normal text-[#202124]">{totalScore} / 100점</div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#3c4043] leading-relaxed font-normal">
              {tierDesc}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#5f6368]">
                💡 2026 선착순 농가 구축비 50% 지원 대상에 부합합니다.
              </span>
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_diagnostic_result"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-xs transition-all cursor-pointer shadow-xs"
              >
                <span>50% 지원 혜택 신청서 작성하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
