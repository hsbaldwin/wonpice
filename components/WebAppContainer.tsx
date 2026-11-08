"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Wheat,
  UtensilsCrossed,
  Shirt,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Repeat,
  Package,
  Clock,
  Flame,
  ImageIcon,
  Ruler,
  Heart,
  Share2,
  HelpCircle,
  Coins,
  Store,
  ChevronRight,
} from "lucide-react";

export type TabType = "diagnostic" | "farm" | "food" | "fashion" | "eligibility";

interface WebAppContainerProps {
  initialTab?: TabType;
}

export default function WebAppContainer({ initialTab = "diagnostic" }: WebAppContainerProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);

  // Diagnostic state
  const [category, setCategory] = useState<string>("farm");
  const [customerVoice, setCustomerVoice] = useState<string>("direct_ask");
  const [bottleneck, setBottleneck] = useState<string>("customer_data");
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(1200); // 1,200만 원

  // Checklist state for interactive engagement
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    item1: true,
    item2: false,
    item3: false,
    item4: false,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Eligibility state
  const [currentChannel, setCurrentChannel] = useState<string>("smartstore");
  const [sellingType, setSellingType] = useState<string>("fresh_produce");
  const [hasRepeatDemand, setHasRepeatDemand] = useState<string>("yes");
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  // Sync initialTab when props change
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  // Financial calculations
  const annualRevenue = monthlyRevenue * 12;
  const estAnnualPlatformFee = Math.round(annualRevenue * 0.095);
  const directLoyalRevenue = annualRevenue * 0.25;
  const estFeeSavedByLoyal = Math.round(directLoyalRevenue * 0.07);
  const estAnnualMaintenance = 200;
  const netFinancialGain = estFeeSavedByLoyal - estAnnualMaintenance;

  // Diagnostic Score
  const catScore = category === "farm" || category === "food" ? 30 : category === "fashion" ? 28 : 10;
  const voiceScore = customerVoice === "direct_ask" ? 30 : customerVoice === "bulk_gift" ? 25 : customerVoice === "sns_fans" ? 20 : 5;
  const bottleneckScore = bottleneck === "customer_data" || bottleneck === "price_race" ? 25 : bottleneck === "algorithm_shake" ? 20 : 15;
  const revScore = monthlyRevenue >= 2000 ? 15 : monthlyRevenue >= 1000 ? 12 : 8;
  const totalScore = Math.min(100, catScore + voiceScore + bottleneckScore + revScore);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedNotification(true);
      setTimeout(() => setCopiedNotification(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-28 sm:pb-24">
      {/* Web-App Top Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 h-15 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-base shadow-md">
              W
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">WonPice</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  웹앱 가이드
                </span>
              </div>
            </div>
          </Link>

          {/* Right Live Badge */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>2026 판로 구축비 50% 지원 접수 중</span>
            </div>

            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors relative"
              title="가이드 링크 복사"
            >
              <Share2 className="w-4 h-4" />
              {copiedNotification && (
                <span className="absolute top-10 right-0 bg-emerald-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap">
                  링크 복사 완료!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Web-App Segmented Tab Controller */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
            {[
              { id: "diagnostic", label: "판로 자가진단", icon: <Compass className="w-3.5 h-3.5" /> },
              { id: "farm", label: "농가 판로", icon: <Wheat className="w-3.5 h-3.5" /> },
              { id: "food", label: "식품 판로", icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
              { id: "fashion", label: "패션 판로", icon: <Shirt className="w-3.5 h-3.5" /> },
              { id: "eligibility", label: "50% 지원 판정", icon: <Sparkles className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "bg-slate-850/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Interactive App Viewport */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 pt-6 sm:pt-8">
        {/* ========================================================= */}
        {/* TAB 1: DIAGNOSTIC (스마트 판로 자가진단 툴) */}
        {/* ========================================================= */}
        {activeTab === "diagnostic" && (
          <div className="space-y-6 animate-fadeIn">
            {/* View Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold mb-3 border border-emerald-800/40">
                <Compass className="w-3.5 h-3.5" />
                <span>30초 인터랙티브 자가진단</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                최저가 경쟁을 넘어, 내 가게의 가치를 지키는 올바른 선택
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                스마트스토어와 쿠팡에 갇힌 단골을 온전히 내 자산으로 만들 때가 되었는지,
                현재 사업 상황을 터치하여 독립 자사몰 적합도와 예상 수수료 절감액을 확인해보세요.
              </p>
            </div>

            {/* Step Wizard Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-8">
              {/* Step 1: Category */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">
                    1
                  </span>
                  <span className="text-sm font-bold text-white">주력 품목 및 업종 선택</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "farm", label: "🌾 산지직송 농산물 / 제철 신선식품", desc: "신선도와 수확 스토리가 중요한 먹거리" },
                    { id: "food", label: "🍲 수제 가공식품 / 밀키트 / 반찬", desc: "재구매 주기가 뚜렷한 맛있는 먹거리" },
                    { id: "fashion", label: "👗 자체제작 / 디자이너 패션", desc: "고유한 룩북 핏과 감성이 핵심인 의류" },
                    { id: "general", label: "📦 일반 공산품 / 생활잡화 / 사입", desc: "규격과 가격 경쟁력이 우선인 상품" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCategory(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        category === item.id
                          ? "bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/30 text-white"
                          : "bg-slate-850/60 border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Customer Voice */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">
                    2
                  </span>
                  <span className="text-sm font-bold text-white">단골 고객의 반응 신호</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: "direct_ask", label: "직접 주문 문의가 온다", desc: '"스마트스토어 말고 농장에 직접 살 수 없나요?"' },
                    { id: "bulk_gift", label: "선물용 및 재구매가 잦다", desc: "지인 추천, 명절 선물 등으로 다시 찾아오는 고객층" },
                    { id: "sns_fans", label: "SNS/블로그 팬덤 형성", desc: "신상품 소식을 기다리고 응원하는 지지층 존재" },
                    { id: "price_only", label: "1회성 최저가 구매 위주", desc: "가격 비교로 유입되어 재구매 여부가 불분명" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCustomerVoice(item.id)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        customerVoice === item.id
                          ? "bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/30 text-white"
                          : "bg-slate-850/60 border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Monthly Revenue Slider */}
              <div className="p-5 rounded-2xl bg-slate-850/60 border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center justify-center">
                      3
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">월 평균 판매 매출 규모</span>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-emerald-400">{monthlyRevenue.toLocaleString()}만 원</span>
                    <span className="text-xs text-slate-400 ml-1">/월</span>
                  </div>
                </div>

                <input
                  type="range"
                  min="200"
                  max="5000"
                  step="100"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>200만</span>
                  <span>1,500만</span>
                  <span>3,000만</span>
                  <span>5,000만+</span>
                </div>
              </div>
            </div>

            {/* Live Generated Report Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    WonPice 실시간 판로 진단 리포트
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    {totalScore >= 75
                      ? "자사몰 병행이 사업을 지키는 '올바른 선택'입니다."
                      : totalScore >= 55
                      ? "단골을 자사몰로 독립시킬 '최적의 준비기'입니다."
                      : "스마트스토어에서 충성 고객을 다질 시점입니다."}
                  </h2>
                </div>
                <div className="bg-slate-800/90 border border-slate-700 px-4 py-2.5 rounded-2xl text-right shrink-0">
                  <div className="text-[10px] text-slate-400">독립 준비도 점수</div>
                  <div className="text-2xl font-black text-emerald-400">{totalScore}점 <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
                </div>
              </div>

              {/* Financial Box */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 mb-6 text-center sm:text-left">
                <div>
                  <div className="text-[11px] text-slate-400">현재 연간 추정 수수료</div>
                  <div className="text-base font-bold text-slate-200 mt-0.5">약 {estAnnualPlatformFee.toLocaleString()}만 원</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">단골 25% 자사몰 전환 시</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">연간 +{estFeeSavedByLoyal.toLocaleString()}만 원 절감</div>
                </div>
                <div>
                  <div className="text-[11px] text-slate-400">유지비 차감 후 순이익</div>
                  <div className="text-base font-bold text-amber-300 mt-0.5">
                    {netFinancialGain > 0 ? `연간 +${netFinancialGain.toLocaleString()}만 원` : "손익분기 근접"}
                  </div>
                </div>
              </div>

              {/* Action Box to Gagejigi */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                <div className="text-xs text-slate-300 text-center sm:text-left">
                  <span>선착순 10곳 구축비 50% 프로모션 적용으로 </span>
                  <strong className="text-emerald-400">3주 만에 업종 맞춤 자사몰을 오픈</strong>할 수 있습니다.
                </div>
                <a
                  href={`https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_webapp&score=${totalScore}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all group"
                >
                  <span>가게지기에서 무료 상담 신청</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: FARM GUIDE (농가·산지직송 판로 가이드) */}
        {/* ========================================================= */}
        {activeTab === "farm" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold mb-3 border border-emerald-800/40">
                <Wheat className="w-4 h-4 text-emerald-400" />
                <span>농가 · 산지직송 직거래 판로 가이드</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                공판장 헐값 경매를 넘어, 내 땀의 제값을 받는 직거래 판로
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                풍년에도 가격 폭락과 상장 수수료로 고통받던 농가들이 스마트스토어로 고객을 모으고,
                자사몰로 평생 직거래 단골을 확보하여 안정적 농가 소득을 만든 실전 공식입니다.
              </p>
            </div>

            {/* Farm 3-Step Strategy */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-slate-500 mb-1">STEP 1. 첫 유입</div>
                <div className="text-sm font-bold text-white mb-2">스마트스토어로 고객 만나기</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  네이버 쇼핑 검색 트래픽을 활용해 우리 제철 과일/농산물의 첫 맛을 보게 합니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="text-xs font-bold text-emerald-400 mb-1">STEP 2. 징검다리</div>
                <div className="text-sm font-bold text-white mb-2">배송 상자에 산지 편지 동봉</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  포장 박스에 농부의 따뜻한 편지와 &apos;자사몰 재구매 2,000원 쿠폰&apos;을 함께 넣어 단골로 연결합니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40">
                <div className="text-xs font-bold text-emerald-300 mb-1">STEP 3. 자립 판로</div>
                <div className="text-sm font-bold text-white mb-2">수수료 0% 농가 자사몰 정착</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  제철 수확 때마다 단골에게 문자로 소식을 전하고, 중간 마진 없이 제값 받고 판매합니다.
                </p>
              </div>
            </div>

            {/* Interactive Farm Readiness Checklist */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>농가 직거래 쇼핑몰 준비 체크리스트 (터치하여 체크)</span>
              </h3>
              <div className="space-y-2.5">
                {[
                  { id: "item1", label: "산지 농장 및 과수원 사진 (밭, 수확 모습, 가족 사진)" },
                  { id: "item2", label: "중량 옵션 구성 (예: 3kg 가정용 / 5kg 실속형 / 10kg 선물용)" },
                  { id: "item3", label: "배송 포장 방식 (아이스박스, 에어캡 완충재, 안전 배송 안내)" },
                  { id: "item4", label: "단골 재구매 혜택 (자사몰 첫 가입 쿠폰, 제철 알림 동의)" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      checkedItems[item.id]
                        ? "bg-emerald-950/50 border-emerald-500/60 text-white"
                        : "bg-slate-850/60 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                        checkedItems[item.id]
                          ? "bg-emerald-500 border-emerald-400 text-slate-950"
                          : "border-slate-600 bg-slate-800"
                      }`}
                    >
                      {checkedItems[item.id] && <CheckCircle2 className="w-3.5 h-3.5 font-bold" />}
                    </div>
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Demo & CTA */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-emerald-400 font-bold mb-1">실제 작동 중인 농가 테마</div>
                <div className="text-base font-bold text-white">&apos;제철곳간&apos; 라이브 데모몰을 체험해보세요</div>
                <div className="text-xs text-slate-400 mt-0.5">중량 옵션, 출고 마감 타이머가 탑재되어 있습니다.</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center inline-flex items-center justify-center gap-1"
                >
                  <span>데모몰 구경</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_farm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold text-center inline-flex items-center justify-center gap-1"
                >
                  <span>50% 지원 상담</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: FOOD GUIDE (수제 식품·밀키트 판로 가이드) */}
        {/* ========================================================= */}
        {activeTab === "food" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 text-amber-400 text-xs font-bold mb-3 border border-amber-800/40">
                <UtensilsCrossed className="w-4 h-4 text-amber-400" />
                <span>수제 식품 · 밀키트 전국 택배 판로 가이드</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                배달앱 30% 수수료를 넘어, 전국 단골을 확보하는 비결
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                동네 골목 매장의 한계를 깨고 정성껏 만든 국, 반찬, 수제 밀키트를 전국 택배 직판로로 확장하는 실전 운영 매뉴얼입니다.
              </p>
            </div>

            {/* Food 3 Core Keys */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center mb-2">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">냉장·냉동 보관 안내</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  보관법과 소비기한이 상품 상세 상단에 명확히 표기되어 배송 후 반품/문의율을 70% 줄입니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center mb-2">
                  <Flame className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">맛있는 조리법 가이드</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  조리 순서와 꿀팁 레시피를 사진과 함께 제공하여 고객 만족도와 재구매율을 끌어올립니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-amber-950 text-amber-400 flex items-center justify-center mb-2">
                  <Repeat className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">2~3주 주기 단골 문자</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  음식이 다 떨어질 시점에 맞춰 자사몰 혜택과 함께 신선한 조리 소식을 단골에게 직접 발송합니다.
                </p>
              </div>
            </div>

            {/* Food CTA Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/60 to-slate-900 border border-amber-600/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-amber-400 font-bold mb-1">식품 소상공인 판로 지원</div>
                <div className="text-base font-bold text-white">가게지기 식품 맞춤 자사몰 50% 프로모션</div>
                <div className="text-xs text-slate-400 mt-0.5">냉장 보관 안내, 출고 마감 타이머가 기본 탑재됩니다.</div>
              </div>
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_food"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5"
              >
                <span>무료 상담 신청하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FASHION GUIDE (디자이너 패션·자체제작 판로 가이드) */}
        {/* ========================================================= */}
        {activeTab === "fashion" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-indigo-400 text-xs font-bold mb-3 border border-indigo-800/40">
                <Shirt className="w-4 h-4 text-indigo-400" />
                <span>디자이너 패션 · 자체제작 브랜드 가이드</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                최저가 전쟁과 카피를 넘어, 브랜드의 감성과 핏을 제값 받는 길
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                에이블리, 지그재그의 쿠폰 출혈과 저가 사입품 카피에서 벗어나,
                나만의 고화질 세로형 룩북과 팬덤 회원제로 브랜드를 성장시키는 방법입니다.
              </p>
            </div>

            {/* Fashion 3 Core Keys */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center mb-2">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">세로형 피팅 룩북</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  모바일 화면을 꽉 채우는 세로형 룩북으로 원단의 드레이프와 핏을 감성적으로 전달합니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center mb-2">
                  <Ruler className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">정밀 사이즈 가이드</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  모델 스펙과 실측 단면 치수를 한눈에 비교할 수 있어 교환/반품 비용을 획기적으로 줄입니다.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold text-white mb-1">신상 드롭 알림</div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  신규 컬렉션 공개 시 단골 회원에게 가장 먼저 알리고 첫 구매 혜택을 제공하여 매진을 유도합니다.
                </p>
              </div>
            </div>

            {/* Fashion Demo Link & CTA */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="text-xs text-indigo-400 font-bold mb-1">패션 테마 실제 사례</div>
                <div className="text-base font-bold text-white">디자이너 패션 쇼핑몰 &apos;온결&apos; 데모 체험</div>
                <div className="text-xs text-slate-400 mt-0.5">룩북 뷰어와 착용컷 전환을 직접 둘러보세요.</div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://shop-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center inline-flex items-center justify-center gap-1"
                >
                  <span>온결 데모몰 구경</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_fashion"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold text-center inline-flex items-center justify-center gap-1"
                >
                  <span>가게지기 상담</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: ELIGIBILITY CHECKER (50% 지원 혜택 판정 툴) */}
        {/* ========================================================= */}
        {activeTab === "eligibility" && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-bold mb-3 border border-emerald-800/40">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>2026 소상공인·농가 온라인 판로 구축 지원</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                우리 농가/가게도 구축비 50% 지원 혜택 대상일까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                외주 웹 에이전시의 500만~800만 원 높은 비용 부담 없이,
                가게지기에서 진행 중인 선착순 10곳 구축비 50% 할인 대상 여부를 3초 만에 판정해 드립니다.
              </p>
            </div>

            {/* Interactive Checker Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Q1. 현재 주력 판매 채널
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "smartstore", label: "스마트스토어" },
                    { id: "coupang", label: "쿠팡 / 오픈마켓" },
                    { id: "direct_sns", label: "인스타 / 블로그 직거래" },
                    { id: "offline_only", label: "오프라인 / 신규 준비" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setCurrentChannel(item.id)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        currentChannel === item.id
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                          : "bg-slate-850/60 text-slate-400 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Q2. 취급 상품 품목
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: "fresh_produce", label: "🌾 산지직송 농수산물", sub: "과일, 쌀, 채소 등 제철 먹거리" },
                    { id: "processed_food", label: "🍲 수제 식품 / 밀키트", sub: "반찬, 간편식, 로컬 먹거리" },
                    { id: "self_brand", label: "👗 자체기획 패션 / 수공예", sub: "고유한 브랜드 의류 및 잡화" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSellingType(item.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        sellingType === item.id
                          ? "bg-emerald-950/70 border-emerald-500 ring-1 ring-emerald-500/30 text-white"
                          : "bg-slate-850/60 border-slate-800 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      <div className="text-xs font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{item.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Q3. 단골의 재구매/추천 문의 경험
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "yes", label: "네, 다시 사겠다는 단골 문의가 있습니다" },
                    { id: "soon", label: "아직 없지만, 단골을 만들고 싶습니다" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setHasRepeatDemand(item.id)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        hasRepeatDemand === item.id
                          ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
                          : "bg-slate-850/60 text-slate-400 border-slate-800 hover:bg-slate-800"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Instant Eligibility Result */}
              <div className="p-6 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="text-base font-black text-emerald-300">
                  선착순 구축비 50% 할인 지원 혜택 적용 대상입니다
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  스마트스토어와 병행하여 독자적인 직거래 자사몰 판로를 개척하기에 최적의 요건을 갖추고 계십니다.
                </p>
                <div className="mt-4 pt-4 border-t border-emerald-900/60">
                  <a
                    href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_eligibility_tab"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-emerald-500/20 transition-all"
                  >
                    <span>가게지기에서 50% 지원받고 무료 상담 신청</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Bottom App Dock (Sticky on mobile and desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 px-4 py-3 shadow-2xl">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div className="text-xs">
              <span className="text-slate-400 hidden sm:inline">소상공인·농가 판로 지원: </span>
              <strong className="text-white">선착순 10곳 구축비 50% 할인</strong>
            </div>
          </div>

          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_bottom_dock"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow transition-all shrink-0"
          >
            <span>가게지기 무료 상담</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
