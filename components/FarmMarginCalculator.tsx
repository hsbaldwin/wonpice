"use client";

import { useState } from "react";
import { Calculator, Sparkles } from "lucide-react";

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

  // Average order value in farming: approx 45,000 KRW
  const avgOrderValue = 45000;
  const estimatedLoyalCustomers = Math.round(directLoyalSales / avgOrderValue);

  // Payback period with 50% discount (Starter plan: 150만원 -> 75만원 setup + 10만원/월 유지보수)
  const starterDiscountedSetup = 750000;
  const annualMaintenance = 1200000;
  const netFirstYearGain = netFeeSavedAnnual - (starterDiscountedSetup + annualMaintenance);
  const monthsToBreakEven = Math.max(1, Math.round((starterDiscountedSetup / (netFeeSavedAnnual / 12)) * 10) / 10);

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-white border-b border-[#e8eaed]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header (Google Store style) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-medium mb-4">
            <Calculator className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>수수료 &amp; 순익 시뮬레이터</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4">
            직거래 단골 25%만 모아도, 순이익은 얼마나 늘어날까?
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            공판장 상장 수수료와 오픈마켓 수수료로 매년 새어나가는 비용을 확인하세요.
            <br className="hidden sm:inline" />
            단골 고객의 20~30%만 자사몰로 유도해도 구축 비용은 수개월 안에 전액 회수됩니다.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) in Google Card */}
          <div className="lg:col-span-5 bg-[#f8f9fa] p-7 sm:p-8 rounded-3xl border border-[#dadce0] space-y-6">
            <h3 className="font-medium text-[#202124] text-base flex items-center justify-between pb-3 border-b border-[#e8eaed]">
              <span>우리 농장 조건 입력</span>
              <span className="text-xs text-[#137333] font-medium bg-[#e6f4ea] px-2.5 py-0.5 rounded-full">
                실시간 연산
              </span>
            </h3>

            {/* Slider 1: Annual Revenue */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-medium text-[#5f6368]">
                  연간 총 농산물 출하액 (매출)
                </label>
                <span className="text-base font-normal text-[#202124]">
                  {(revenue / 10000).toFixed(1)}억 원{" "}
                  <span className="text-xs text-[#5f6368]">
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
                className="w-full h-1.5 bg-[#dadce0] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#5f6368] mt-1.5">
                <span>3,000만 원 (소규모)</span>
                <span>1억 5천만 원</span>
                <span>3억 원 (전업농)</span>
              </div>
            </div>

            {/* Selector 2: Current Channel Fee in Pill Chips */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-medium text-[#5f6368]">
                  현재 주 판매처 평균 수수료율
                </label>
                <span className="text-base font-normal text-[#202124]">
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
                    className={`py-2 px-3 rounded-full font-medium text-left transition-all cursor-pointer border ${
                      feeRate === item.val
                        ? "bg-[#202124] text-white border-[#202124] shadow-xs"
                        : "bg-white text-[#3c4043] border-[#dadce0] hover:border-[#202124]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Direct Loyal Conversion Target */}
            <div>
              <div className="flex justify-between items-center mb-2.5">
                <label className="text-xs font-medium text-[#5f6368] flex items-center gap-1.5">
                  <span>자사몰 단골 전환 목표</span>
                  <span className="text-[10px] text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full font-medium">
                    권장 25%
                  </span>
                </label>
                <span className="text-base font-normal text-[#202124]">
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
                className="w-full h-1.5 bg-[#dadce0] rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#5f6368] mt-1.5">
                <span>10% (시범 운영)</span>
                <span>25% (평균 단골)</span>
                <span>50% (브랜드 농장)</span>
              </div>
            </div>

            {/* Informational Box in Google Soft Green */}
            <div className="bg-[#e6f4ea]/60 border border-[#ceead6] rounded-2xl p-4 text-xs text-[#137333] space-y-1">
              <div className="font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#1e8e3e]" />
                <span>계산 기준 안내</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#3c4043]">
                자사몰 토스페이먼츠 PG 결제 수수료는 <strong>2.5%</strong> 기준입니다. 기존 채널 수수료와의 차액이 전액 농가의 순이익으로 전환됩니다.
              </p>
            </div>
          </div>

          {/* Result Output Column (7 cols) in Google Hardware Card */}
          <div className="lg:col-span-7 space-y-5">
            {/* Main Highlight Card (Google Store Signature Charcoal) */}
            <div className="bg-[#202124] text-white p-7 sm:p-9 rounded-3xl shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="text-xs font-medium text-[#9aa0a6] uppercase tracking-wider">
                  Annual Net Gain Simulation
                </span>
                <span className="text-xs bg-[#3c4043] text-[#ceead6] px-3 py-1 rounded-full font-medium border border-[#5f6368]/40">
                  단골 {conversionRate}% 전환 시
                </span>
              </div>

              <div className="mb-8">
                <div className="text-xs text-[#9aa0a6] mb-1.5">
                  매년 농가 계좌로 더 들어오는 순이익 (수수료 절감액)
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white flex items-baseline gap-2">
                  <span>+{(netFeeSavedAnnual / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원</span>
                  <span className="text-sm font-normal text-[#9aa0a6]">/ 매년</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-[#3c4043] text-xs">
                <div>
                  <div className="text-[#9aa0a6] text-[11px]">3년 누적 순수익 증가</div>
                  <div className="font-medium text-xl text-[#81c995] mt-0.5">
                    +{(threeYearCumulativeSavings / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                  </div>
                </div>
                <div>
                  <div className="text-[#9aa0a6] text-[11px]">자사몰 확보 단골 고객 수</div>
                  <div className="font-medium text-xl text-white mt-0.5">
                    약 {estimatedLoyalCustomers.toLocaleString()}가구
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Secondary Metric Cards in Google Clean White */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-[#dadce0] text-left">
                <span className="text-[11px] text-[#5f6368] font-normal">현재 연간 지출 수수료</span>
                <div className="text-lg font-medium text-[#d93025] mt-1">
                  -{(currentTotalFee / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                </div>
                <span className="text-[10px] text-[#5f6368]">플랫폼·경매장에 떼이는 돈</span>
              </div>

              <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-[#dadce0] text-left">
                <span className="text-[11px] text-[#5f6368] font-normal">50% 지원 시 투자비 회수</span>
                <div className="text-lg font-medium text-[#137333] mt-1">
                  단 {monthsToBreakEven}개월 만에
                </div>
                <span className="text-[10px] text-[#5f6368]">스타터 75만 원 기준</span>
              </div>

              <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-[#dadce0] text-left">
                <span className="text-[11px] text-[#5f6368] font-normal">첫해 순이익 증가 (비용 제외)</span>
                <div className="text-lg font-medium text-[#202124] mt-1">
                  +{(netFirstYearGain / 10000).toLocaleString(undefined, { maximumFractionDigits: 0 })}만 원
                </div>
                <span className="text-[10px] text-[#5f6368]">유지보수비 전액 공제 후</span>
              </div>
            </div>

            {/* Google Store Insight Callout */}
            <div className="bg-[#fef7e0]/60 border border-[#feefc3] rounded-2xl p-4 flex items-start gap-3 text-xs text-[#202124]">
              <div className="w-5 h-5 rounded-full bg-[#f9ab00] text-[#202124] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                i
              </div>
              <div className="leading-relaxed">
                <strong className="font-medium text-[#202124] block mb-0.5">
                  올바른 선택의 핵심 통찰:
                </strong>
                스마트스토어를 즉시 닫을 필요가 없습니다. 스마트스토어로 유입된 신규 고객 중 <strong>25%의 단골</strong>만 자사몰로 흡수해도 쇼핑몰 구축비는 첫해 안에 전액 회수되고 평생 우리 농장만의 고객 자산이 남습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
