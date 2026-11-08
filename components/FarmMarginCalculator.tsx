"use client";

import { useState } from "react";
import { Calculator, ArrowRight, ShieldCheck, Sparkles, TrendingUp, HelpCircle } from "lucide-react";

export default function FarmMarginCalculator() {
  // Annual Revenue in 10,000 KRW (e.g. 12000 = 1억 2천만 원)
  const [revenue, setRevenue] = useState<number>(12000);
  // Channel fee rate (e.g. 8.5%)
  const [feeRate, setFeeRate] = useState<number>(8.5);
  // Direct loyal customer conversion target (%)
  const [conversionRate, setConversionRate] = useState<number>(25);

  // Financial calculations
  const totalAnnualSales = revenue * 10000; // in KRW
  const currentTotalFee = Math.round(totalAnnualSales * (feeRate / 100));
  const directLoyalSales = Math.round(totalAnnualSales * (conversionRate / 100));
  
  // D2C PG fee is roughly 2.5%
  const d2cFeeRate = 2.5;
  const netFeeSavedAnnual = Math.round(directLoyalSales * ((feeRate - d2cFeeRate) / 100));
  const threeYearCumulativeSavings = netFeeSavedAnnual * 3;

  // Average order value in farming: approx 45,000 KRW (e.g. 5kg box)
  const avgOrderValue = 45000;
  const estimatedLoyalCustomers = Math.round(directLoyalSales / avgOrderValue);

  // Payback period with 50% discount (Starter plan: 150만원 -> 75만원 setup + 10만원/월 유지보수)
  const starterDiscountedSetup = 750000;
  const annualMaintenance = 1200000;
  const netFirstYearGain = netFeeSavedAnnual - (starterDiscountedSetup + annualMaintenance);
  const monthsToBreakEven = Math.max(1, Math.round((starterDiscountedSetup / (netFeeSavedAnnual / 12)) * 10) / 10);

  return (
    <section id="calculator" className="py-16 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>실시간 농가 수수료 &amp; 순익 시뮬레이터</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-4">
            직거래 단골 25%만 모아도, 내 손에 남는 순이익은 얼마나 늘어날까?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            공판장 상장 수수료와 플랫폼 입점 수수료로 매년 새어나가는 비용을 계산해 보세요.
            <br className="hidden sm:inline" />
            단골 고객의 20~30%만 자사몰로 유도해도 쇼핑몰 구축 비용은 수개월 안에 전액 회수됩니다.
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 bg-stone-50 p-6 sm:p-7 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <h3 className="font-extrabold text-stone-900 text-base flex items-center justify-between pb-3 border-b border-stone-200">
              <span>우리 농장 판매 조건 입력</span>
              <span className="text-xs text-emerald-700 font-semibold">실시간 자동 연산</span>
            </h3>

            {/* Slider 1: Annual Revenue */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">
                  연간 총 농산물 출하액 (매출)
                </label>
                <span className="text-base font-extrabold text-emerald-700">
                  {(revenue / 10000).toFixed(1)}억 원{" "}
                  <span className="text-xs font-medium text-stone-500">
                    ({revenue.toLocaleString()}만 원)
                  </span>
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="30000"
                step="1000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>3,000만 원 (소규모)</span>
                <span>1억 5천만 원</span>
                <span>3억 원 (전업농)</span>
              </div>
            </div>

            {/* Selector 2: Current Channel Fee */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700">
                  현재 주 판매처 평균 수수료율
                </label>
                <span className="text-base font-extrabold text-stone-900">
                  {feeRate}%
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: "스마트스토어 (약 6%)", val: 6.0 },
                  { label: "공판장 경매 (약 7%)", val: 7.0 },
                  { label: "복합/평균 (8.5%)", val: 8.5 },
                  { label: "쿠팡/오픈마켓 (11%)", val: 11.0 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setFeeRate(item.val)}
                    className={`py-2 px-2.5 rounded-xl font-medium text-left transition-all cursor-pointer border ${
                      feeRate === item.val
                        ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                        : "bg-white text-stone-700 border-stone-200 hover:border-emerald-300"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Direct Loyal Conversion Target */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                  <span>자사몰 직거래 단골 전환 목표</span>
                  <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded font-semibold">
                    권장 25%
                  </span>
                </label>
                <span className="text-base font-extrabold text-emerald-700">
                  {conversionRate}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="50"
                step="5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400 mt-1">
                <span>10% (초기 시범)</span>
                <span>25% (현실적 단골)</span>
                <span>50% (브랜드 농장)</span>
              </div>
            </div>

            {/* Informational Box */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-stone-600 space-y-1">
              <div className="font-bold text-emerald-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>계산 기준 안내</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                자사몰 신용카드·간편결제 PG 수수료는 <strong>2.5%</strong> 기준입니다. 기존 채널 수수료와의 차액이 고스란히 농가의 순이익으로 전환됩니다.
              </p>
            </div>
          </div>

          {/* Result Output Column (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Highlight Card */}
            <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 sm:p-7 rounded-2xl shadow-md relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider">
                  Annual Net Gain Simulation
                </span>
                <span className="text-xs bg-emerald-700/80 border border-emerald-500/40 text-emerald-100 px-2.5 py-0.5 rounded-full font-semibold">
                  단골 {conversionRate}% 전환 시
                </span>
              </div>

              <div className="mb-6">
                <div className="text-xs text-emerald-200 mb-1">
                  매년 농가 계좌로 더 들어오는 순이익 (수수료 절감액)
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white flex items-baseline gap-2">
                  <span>+{(netFeeSavedAnnual / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원</span>
                  <span className="text-sm font-semibold text-emerald-200">/ 매년</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-700/80 text-xs">
                <div>
                  <div className="text-emerald-200/80 text-[11px]">3년 누적 순수익 증가</div>
                  <div className="font-black text-lg text-amber-300">
                    +{(threeYearCumulativeSavings / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                  </div>
                </div>
                <div>
                  <div className="text-emerald-200/80 text-[11px]">자사몰 확보 단골 고객 수</div>
                  <div className="font-black text-lg text-white">
                    약 {estimatedLoyalCustomers.toLocaleString()}가구
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Secondary Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left">
                <span className="text-[11px] text-stone-500 font-medium">현재 연간 지출 수수료</span>
                <div className="text-lg font-extrabold text-rose-700 mt-1">
                  -{(currentTotalFee / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                </div>
                <span className="text-[10px] text-stone-400">플랫폼·경매장에 떼이는 돈</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left">
                <span className="text-[11px] text-stone-500 font-medium">50% 지원 시 투자비 회수</span>
                <div className="text-lg font-extrabold text-emerald-700 mt-1">
                  단 {monthsToBreakEven}개월 만에
                </div>
                <span className="text-[10px] text-stone-400">스타터 75만 원 투자 기준</span>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left">
                <span className="text-[11px] text-stone-500 font-medium">첫해 순이익 증가 (비용 제외)</span>
                <div className="text-lg font-extrabold text-stone-900 mt-1">
                  +{(netFirstYearGain / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                </div>
                <span className="text-[10px] text-stone-400">쇼핑몰 유지비 전액 공제 후</span>
              </div>
            </div>

            {/* Insight Callout */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
              <div className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                !
              </div>
              <div>
                <strong className="font-bold text-amber-950 block mb-0.5">
                  올바른 선택의 핵심 통찰:
                </strong>
                스마트스토어를 당장 접으라는 것이 아닙니다. 스마트스토어로 유입된 신규 고객 중 <strong>25%의 단골</strong>만 자사몰로 흡수해도, 쇼핑몰 구축비는 첫해 안에 전액 회수되고 평생 우리 농장만의 고객 자산이 남습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
