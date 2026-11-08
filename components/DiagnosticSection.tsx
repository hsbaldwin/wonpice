"use client";

import { useState, useId } from "react";
import {
  Wheat,
  UtensilsCrossed,
  Shirt,
  Package,
  Award,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  CheckCircle,
  ExternalLink,
  Coins,
  Repeat,
  Store,
} from "lucide-react";

interface OptionItem<T> {
  id: T;
  label: string;
  desc: string;
  icon?: React.ReactNode;
  score: number;
}

export default function DiagnosticSection() {
  const revenueSliderId = useId();
  // State
  const [category, setCategory] = useState<string>("farm");
  const [customerVoice, setCustomerVoice] = useState<string>("direct_ask");
  const [bottleneck, setBottleneck] = useState<string>("customer_data");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1200); // in 10,000 KRW (1,200만 원)

  // Options
  const categories: OptionItem<string>[] = [
    {
      id: "farm",
      label: "산지직송 농산물 / 제철 신선식품",
      desc: "생산자의 정직한 스토리와 신선도가 최우선인 먹거리",
      icon: <Wheat className="w-5 h-5" />,
      score: 30,
    },
    {
      id: "food",
      label: "수제 가공식품 / 밀키트 / 반찬",
      desc: "맛에 반한 고객의 주기적인 재구매가 일어나는 식품",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      score: 30,
    },
    {
      id: "fashion",
      label: "자체제작 / 디자이너 패션",
      desc: "고유한 감성 룩북과 디테일한 핏 가이드가 중요한 브랜드",
      icon: <Shirt className="w-5 h-5" />,
      score: 28,
    },
    {
      id: "general",
      label: "일반 공산품 / 생활잡화 / 사입",
      desc: "브랜드 스토리보다 규격과 가격 경쟁력이 우선인 상품",
      icon: <Package className="w-5 h-5" />,
      score: 10,
    },
  ];

  const customerVoices: OptionItem<string>[] = [
    {
      id: "direct_ask",
      label: "직접 주문 문의가 온다",
      desc: '"스마트스토어 말고 대표님께 직접 살 수 없나요?" 묻는 단골이 있다',
      score: 30,
    },
    {
      id: "bulk_gift",
      label: "재구매 및 선물용 주문이 잦다",
      desc: '품질을 신뢰하여 명절 선물, 지인 추천 등으로 다시 찾아온다',
      score: 25,
    },
    {
      id: "sns_fans",
      label: "SNS/블로그에 팬층이 생기고 있다",
      desc: '우리 브랜드 소식을 기다리고 댓글과 문의를 남기는 고객층 형성',
      score: 20,
    },
    {
      id: "price_only",
      label: "1회성 최저가 구매자가 대부분이다",
      desc: '가격 비교 검색을 통해 들어오며 재구매 주기는 불분명하다',
      score: 5,
    },
  ];

  const bottlenecks: OptionItem<string>[] = [
    {
      id: "customer_data",
      label: "고객 DB를 가질 수 없어 매번 광고비 지출",
      desc: "한번 구매한 단골에게 신상품 알림이나 문자를 보낼 권한이 없다",
      score: 25,
    },
    {
      id: "price_race",
      label: "10원 단위 최저가 비교에 제값을 못 받음",
      desc: "산지의 땀과 정성보다 '최저가 정렬' 알고리즘이 우선시된다",
      score: 25,
    },
    {
      id: "algorithm_shake",
      label: "포털의 노출 알고리즘 변동에 매출 급변",
      desc: "플랫폼 정책이나 순위 변동 하나에 사업 전체가 흔들린다",
      score: 20,
    },
    {
      id: "slow_settlement",
      label: "수수료 부담 및 느린 정산 주기",
      desc: "매출은 나는데 플랫폼 수수료와 묶인 정산금으로 현금 흐름 답답",
      score: 15,
    },
  ];

  // Calculate score
  const selectedCat = categories.find((c) => c.id === category);
  const selectedVoice = customerVoices.find((v) => v.id === customerVoice);
  const selectedBottleneck = bottlenecks.find((b) => b.id === bottleneck);

  const revenueScore = monthlyRevenue >= 2000 ? 15 : monthlyRevenue >= 1000 ? 12 : monthlyRevenue >= 500 ? 8 : 4;

  const totalScore = Math.min(
    100,
    (selectedCat?.score || 0) + (selectedVoice?.score || 0) + (selectedBottleneck?.score || 0) + revenueScore
  );

  // Financial calculations
  // Average platform blended commission ~ 9.5% (Smartstore + Coupang + Pay)
  const annualRevenue = monthlyRevenue * 12; // 만 원
  const estAnnualPlatformFee = Math.round(annualRevenue * 0.095); // 9.5%

  // Assuming 25% of existing customers convert to direct loyal shop within 1 year
  const directLoyalRevenue = annualRevenue * 0.25;
  // Self-hosted only pays PG fee ~2.5% vs 9.5% platform fee (net saving 7.0%)
  const estFeeSavedByLoyal = Math.round(directLoyalRevenue * 0.07);

  // Self-hosted maintenance (Gagejigi standard: ~15~20만원/월 = 180~240만원/연)
  const estAnnualMaintenance = 200;
  const netFinancialGain = estFeeSavedByLoyal - estAnnualMaintenance;

  const isHighFit = totalScore >= 75;
  const isMidFit = totalScore >= 55 && totalScore < 75;

  return (
    <div id="diagnostic" className="scroll-mt-20">
      {/* Step Indicators */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 mb-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                내 가게의 자사몰 독립 준비도 자가진단
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                4가지 질문을 선택하시면, 우리 가게에 자사몰 병행이 올바른 선택인지 즉시 판정해 드립니다.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              <Store className="w-3.5 h-3.5 text-slate-500" />
              <span>무료 자가진단</span>
            </div>
          </div>

          <div className="space-y-10">
            {/* Question 1: Category */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <label className="text-base font-bold text-slate-900">
                  우리 가게의 주력 품목/업종은 무엇인가요?
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCategory(item.id)}
                    className={`flex items-start gap-3.5 p-4 rounded-xl border text-left transition-all ${
                      category === item.id
                        ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 text-slate-900 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        category === item.id
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 2: Customer Voice */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <label className="text-base font-bold text-slate-900">
                  현재 고객들이 보여주는 가장 흔한 반응은 무엇인가요?
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {customerVoices.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setCustomerVoice(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      customerVoice === item.id
                        ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 text-slate-900 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{item.label}</span>
                      {customerVoice === item.id && (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 3: Bottleneck */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <label className="text-base font-bold text-slate-900">
                  현재 판매 채널을 운영하며 가장 답답한 점은 무엇인가요?
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {bottlenecks.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setBottleneck(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      bottleneck === item.id
                        ? "bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-500/20 text-slate-900 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold">{item.label}</span>
                      {bottleneck === item.id && (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Question 4: Monthly Revenue Slider */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <label htmlFor={revenueSliderId} className="text-base font-bold text-slate-900">
                    현재 월 평균 판매 매출 규모는 어느 정도인가요?
                  </label>
                </div>
                <div className="text-right">
                  <span className="text-xl font-extrabold text-emerald-700">
                    {monthlyRevenue.toLocaleString()}만 원
                  </span>
                  <span className="text-xs text-slate-500 ml-1">/월</span>
                </div>
              </div>

              <input
                id={revenueSliderId}
                aria-label="현재 월 평균 판매 매출 규모"
                type="range"
                min="200"
                max="5000"
                step="100"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer mb-2"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                <span>200만 원</span>
                <span>1,500만 원</span>
                <span>3,000만 원</span>
                <span>5,000만 원+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Diagnosis Result Report */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>WonPice 올바른 선택(Right Choice) 진단 리포트</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isHighFit
                  ? "자사몰 병행이 사업을 지키는 '올바른 선택'입니다."
                  : isMidFit
                  ? "자사몰 독립을 차분히 준비할 '골든타임'입니다."
                  : "현재는 오픈마켓에서 상품력을 다지는 것이 유리합니다."}
              </h3>
            </div>

            <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3 rounded-2xl border border-slate-700/80 shrink-0">
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-medium">독립 준비도 점수</div>
                <div className="text-2xl font-black text-emerald-400">{totalScore}점 <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
              </div>
            </div>
          </div>

          {/* 3 Pillars of Victory */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1.5">
                <Repeat className="w-4 h-4" />
                <span>단골 자산화의 승리</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                플랫폼에 의존하면 매번 광고비를 내고 고객을 다시 사와야 합니다. 자사몰은 1번 방문한 고객이 평생 내 회원 자산이 됩니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>제값 받는 브랜드의 승리</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                네이버/쿠팡의 10원 단위 최저가 비교에서 벗어나, 생산자의 철학과 룩북 스토리를 온전히 제값으로 전달할 수 있습니다.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold mb-1.5">
                <Coins className="w-4 h-4" />
                <span>재무적 건전성의 승리</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                현재 매출 기준 연간 약 {estAnnualPlatformFee.toLocaleString()}만 원의 플랫폼 수수료가 지출되는 구조에서 수수료 유출을 방어합니다.
              </p>
            </div>
          </div>

          {/* Financial Calculation Box */}
          <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 mb-8">
            <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              <span>현실적인 수수료 절감 및 단골 전환 시뮬레이션</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <div className="text-xs text-slate-400">현재 연간 추정 플랫폼 수수료</div>
                <div className="text-lg font-bold text-slate-200 mt-0.5">
                  약 {estAnnualPlatformFee.toLocaleString()}만 원 <span className="text-xs text-slate-400 font-normal">(월 {monthlyRevenue.toLocaleString()}만 기준)</span>
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">단골 25% 자사몰 전환 시 절감액</div>
                <div className="text-lg font-bold text-emerald-400 mt-0.5">
                  연간 약 +{estFeeSavedByLoyal.toLocaleString()}만 원 절약
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400">자사몰 유지비 차감 후 순이익</div>
                <div className="text-lg font-bold text-amber-300 mt-0.5">
                  {netFinancialGain > 0 ? `연간 +${netFinancialGain.toLocaleString()}만 원 이득` : "손익분기 근접"}
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-3 border-t border-emerald-900/40 leading-relaxed">
              ※ 스마트스토어를 폐쇄하는 것이 아닙니다. <strong>스마트스토어는 신규 고객 유입 창구로 유지</strong>하고, 배송 박스에 소식지와 자사몰 혜택을 넣어 <strong>단골을 자사몰로 정착시키는 병행 전략</strong>이 가장 안전하고 올바른 경영 방식입니다.
            </p>
          </div>

          {/* Strategic Advice based on Score */}
          <div className="mb-8">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>대표님을 위한 다음 단계 경영 조언</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {isHighFit && (
                <>
                  대표님의 상품은 생산자의 땀과 정성, 브랜드 고유의 핏이 명확하여 <strong>소비자가 다시 찾는 &apos;단골 잠재력&apos;</strong>이 매우 높습니다. 이미 오픈마켓 수수료로 나가는 비용의 일부만으로도 전문 자사몰을 충분히 운영하고 남는 시점입니다. 더 이상 고객 데이터를 플랫폼에 남겨두지 마시고, <strong>자사몰을 열어 고객을 온전한 나의 자산으로 만드세요.</strong>
                </>
              )}
              {isMidFit && (
                <>
                  현재 사업 모델은 자사몰을 함께 운영했을 때 브랜드 가치를 인정받을 수 있는 충분한 잠재력을 지니고 있습니다. 무리하게 플랫폼을 옮기기보다, <strong>부담 없는 초기 구축 프로모션을 활용하여 자사몰을 테스트하고 단골 소통 창구로 활용</strong>해 보시기를 권장합니다.
                </>
              )}
              {!isHighFit && !isMidFit && (
                <>
                  현재 품목은 가격 민감도가 높거나 아직 고정 단골이 형성되는 초기 단계입니다. 당장 큰 비용을 들여 독립하기보다는, <strong>스마트스토어에서 충성 고객의 리뷰와 단골층을 조금 더 모으신 후</strong> 자사몰로 확장하는 것이 현실적으로 올바른 선택입니다.
                </>
              )}
            </p>
          </div>

          {/* Outbound Bridge to Gagejigi */}
          <div className="bg-gradient-to-r from-emerald-900/60 to-slate-800/80 p-6 rounded-2xl border border-emerald-500/40">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                  ★ 선착순 10곳 구축비 50% 프로모션 진행 중
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  올바른 길임을 알지만, 쇼핑몰 제작과 관리가 막막하신가요?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                  소상공인을 지키는 자사몰 전문 파트너 <strong>&apos;가게지기&apos;</strong>는 농가·식품·패션 업종에 맞춘 자사몰을 <strong>3주 만에 완성</strong>해 드리고, 결제·배송·서버 장애 대응까지 모두 맡아 드립니다.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white underline underline-offset-4"
                  >
                    🌾 농가·식품 &apos;제철곳간&apos; 데모몰 구경하기
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-slate-600">·</span>
                  <a
                    href="https://shop-store-950864605215.asia-northeast3.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-white underline underline-offset-4"
                  >
                    👗 패션 &apos;온결&apos; 데모몰 구경하기
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0">
                <a
                  href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_diagnosis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-emerald-500/20 transition-all group"
                >
                  <span>가게지기에서 맞춤 상담 신청하기</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
