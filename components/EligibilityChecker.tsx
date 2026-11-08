"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Sparkles, Building2, HelpCircle } from "lucide-react";

interface EligibilityCheckerProps {
  defaultCategory?: "farm" | "food" | "fashion";
  title?: string;
}

export default function EligibilityChecker({
  defaultCategory = "farm",
  title = "우리 농가/가게도 온라인 판로 구축비 50% 지원 대상일까요?",
}: EligibilityCheckerProps) {
  const [currentChannel, setCurrentChannel] = useState<string>("smartstore");
  const [sellingType, setSellingType] = useState<string>(
    defaultCategory === "farm" ? "fresh_produce" : defaultCategory === "food" ? "processed_food" : "self_brand"
  );
  const [hasRepeatDemand, setHasRepeatDemand] = useState<string>("yes");

  // Determine eligibility
  const isEligible = sellingType !== "simple_sourcing" || currentChannel !== "offline_only";

  const categoryParam = defaultCategory;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 rounded-3xl p-6 sm:p-10 border border-emerald-500/30 text-white shadow-xl relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>2026 소상공인·농가 온라인 판로 개척 지원</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            3가지 항목만 선택하시면 선착순 구축비 50% 지원 혜택 적용 가능 여부를 즉시 판정해 드립니다.
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* Question 1: Current Channel */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Q1. 현재 어디에서 판매하고 계신가요?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "smartstore", label: "스마트스토어" },
                { id: "coupang", label: "쿠팡 / 오픈마켓" },
                { id: "direct_sns", label: "인스타 / 블로그 직거래" },
                { id: "offline_only", label: "오프라인 / 신규 준비" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCurrentChannel(item.id)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                    currentChannel === item.id
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm"
                      : "bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-750"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2: Selling Type */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Q2. 판매하는 상품의 성격은 무엇인가요?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "fresh_produce", label: "산지직송 농수산물", sub: "과일, 쌀, 채소 등 제철 먹거리" },
                { id: "processed_food", label: "수제 가공식품 / 밀키트", sub: "반찬, 간편식, 건강식 등" },
                { id: "self_brand", label: "자체기획 패션 / 수공예", sub: "고유한 감성 브랜드" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setSellingType(item.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    sellingType === item.id
                      ? "bg-emerald-500/20 text-white border-emerald-400 ring-1 ring-emerald-400"
                      : "bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-750"
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{item.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Repeat Demand */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">
              Q3. 단골의 재구매나 지인 추천 문의를 받아보신 적이 있나요?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "yes", label: "네, 다시 사겠다는 단골 문의가 있습니다" },
                { id: "soon", label: "아직 없지만, 단골을 만들고 싶습니다" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setHasRepeatDemand(item.id)}
                  className={`p-3 rounded-xl text-xs font-semibold border transition-all text-center ${
                    hasRepeatDemand === item.id
                      ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                      : "bg-slate-800/80 text-slate-300 border-slate-700/80 hover:bg-slate-750"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Result Box */}
        {isEligible ? (
          <div className="p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="text-sm font-extrabold text-emerald-300">
              축하합니다! 온라인 판로 구축비 50% 지원 혜택 대상입니다
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
              대표님의 상품은 스마트스토어의 수수료 굴레를 벗어나 **독자적인 직거래 자사몰 판로**를 열기에 최적의 조건을 갖추고 있습니다.
            </p>
            <div className="mt-4 pt-4 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs text-amber-300 font-bold">
                ★ 선착순 한정 프로모션 슬롯 적용 가능
              </span>
              <a
                href={`https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_eligible&category=${categoryParam}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all group"
              >
                <span>가게지기에서 50% 지원받고 무료 상담 신청하기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 text-center">
            <div className="text-sm font-bold text-slate-200">
              상담을 통해 맞춤 지원 가능 여부를 확인하실 수 있습니다
            </div>
            <p className="text-xs text-slate-400 mt-1">
              업종 상황에 맞는 최적의 온라인 판로 개척 방안을 가게지기 전문 매니저와 상담해보세요.
            </p>
            <div className="mt-4">
              <a
                href={`https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_consult&category=${categoryParam}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-900 font-bold text-xs transition-all"
              >
                <span>가게지기 무료 상담 문의하기</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
