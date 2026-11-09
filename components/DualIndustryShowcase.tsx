"use client";

import { useState } from "react";
import { Store, Shirt, Wheat, ExternalLink, Clock, Package, Scale, Ruler, Sparkles, Layers, ArrowDown } from "lucide-react";

export interface DualIndustryShowcaseProps {
  initialIndustry?: "food" | "fashion";
}

function FreshAppleVector({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="신선한 사과 일러스트"
      role="img"
    >
      <defs>
        {/* Ambient Ground Shadow Gradient */}
        <radialGradient id="appleShadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#202124" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#202124" stopOpacity="0" />
        </radialGradient>

        {/* Rich Organic Ruby Apple Gradient */}
        <radialGradient id="appleBodyGrad" cx="38%" cy="36%" r="65%">
          <stop offset="0%" stopColor="#ff5252" />
          <stop offset="25%" stopColor="#e53935" />
          <stop offset="60%" stopColor="#d32f2f" />
          <stop offset="85%" stopColor="#b71c1c" />
          <stop offset="100%" stopColor="#7f0000" />
        </radialGradient>

        {/* 3D Specular Highlight Gradient */}
        <linearGradient id="appleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Secondary Rim Reflection */}
        <linearGradient id="appleRimGrad" x1="100%" y1="70%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#ffcdd2" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffcdd2" stopOpacity="0" />
        </linearGradient>

        {/* Emerald Leaf Gradient */}
        <linearGradient id="appleLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#66bb6a" />
          <stop offset="50%" stopColor="#43a047" />
          <stop offset="100%" stopColor="#1b5e20" />
        </linearGradient>

        {/* Wooden Stem Gradient */}
        <linearGradient id="appleStemGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4e342e" />
          <stop offset="50%" stopColor="#6d4c41" />
          <stop offset="100%" stopColor="#3e2723" />
        </linearGradient>
      </defs>

      {/* Ambient soft shadow */}
      <ellipse cx="50" cy="91" rx="28" ry="6" fill="url(#appleShadowGrad)" />

      {/* Wooden Stem with natural organic curve */}
      <path
        d="M 50 34 C 49 26 53 19 61 14 C 62 13 63 15 62 16 C 56 22 53 27 52 34 Z"
        fill="url(#appleStemGrad)"
      />

      {/* Emerald leaf with vein */}
      <path
        d="M 51 30 C 58 20 73 20 78 27 C 78 35 65 39 52 32 Z"
        fill="url(#appleLeafGrad)"
        filter="drop-shadow(0 1px 1px rgba(0,0,0,0.15))"
      />
      {/* Delicate Leaf Center Vein */}
      <path
        d="M 52 30 C 60 27 68 26 77 28"
        stroke="#81c784"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Organic Apple Body Silhouette with natural clefts */}
      <path
        d="M 50 35 
           C 42 27, 24 28, 19 44 
           C 14 60, 21 82, 38 87 
           C 45 89, 48 85, 50 85 
           C 52 85, 55 89, 62 87 
           C 79 82, 86 60, 81 44 
           C 76 28, 58 27, 50 35 Z"
        fill="url(#appleBodyGrad)"
      />

      {/* Secondary Rim light on right */}
      <path
        d="M 50 85 C 55 89 62 87 79 82 C 85 64 80 48 74 38"
        stroke="url(#appleRimGrad)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* 3D Specular Highlight */}
      <ellipse
        cx="33"
        cy="43"
        rx="7"
        ry="12"
        transform="rotate(-26 33 43)"
        fill="url(#appleHighlight)"
      />
      {/* Secondary Micro Sparkle */}
      <circle cx="28" cy="38" r="1.8" fill="#ffffff" opacity="0.9" />

      {/* Top Cleft Depth Crease */}
      <path
        d="M 46 34 C 48 37 52 37 54 34"
        stroke="#4a0000"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

function CuratedCoatVector({ className = "w-16 h-20" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="큐레이티드 울 코트 일러스트"
      role="img"
    >
      <defs>
        {/* Soft Ambient Ground Shadow */}
        <radialGradient id="coatShadowGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#202124" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#202124" stopOpacity="0" />
        </radialGradient>

        {/* Brass Hanger Metallic Gradient */}
        <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffe082" />
          <stop offset="30%" stopColor="#ffb300" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8d6e1f" />
        </linearGradient>

        {/* Classic Navy Wool Gradient */}
        <linearGradient id="coatNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#253554" />
          <stop offset="40%" stopColor="#1a2744" />
          <stop offset="80%" stopColor="#131c33" />
          <stop offset="100%" stopColor="#0c1322" />
        </linearGradient>

        {/* Lapel Facing Highlight Gradient */}
        <linearGradient id="lapelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#314468" />
          <stop offset="100%" stopColor="#19243d" />
        </linearGradient>

        {/* Horn Button Gradient */}
        <radialGradient id="hornButtonGrad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4e342e" />
          <stop offset="60%" stopColor="#271b17" />
          <stop offset="100%" stopColor="#110c0a" />
        </radialGradient>
      </defs>

      {/* Ambient Ground Shadow */}
      <ellipse cx="50" cy="116" rx="34" ry="4" fill="url(#coatShadowGrad)" />

      {/* Brass Hanger Hook & Shoulder Bar */}
      {/* Hook loop */}
      <path
        d="M 50 14 C 47 14 45 12 45 9 C 45 6 47 4 50 4 C 53 4 55 6 55 9 C 55 13 50 15 50 18"
        stroke="url(#brassGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Top hanger bar */}
      <path
        d="M 33 24 L 50 18 L 67 24"
        stroke="url(#brassGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Inner Collar Shirt/Lining shadow */}
      <path
        d="M 43 23 L 50 33 L 57 23 Z"
        fill="#0b0f19"
      />

      {/* Main Coat Silhouette (Overfit Tailored Wool Single Coat) */}
      <path
        d="M 33 24 
           L 18 36 L 22 55 L 28 53 L 26 108 L 74 108 L 72 53 L 78 55 L 82 36 L 67 24
           C 60 26 40 26 33 24 Z"
        fill="url(#coatNavyGrad)"
      />

      {/* Tailored Center Seam & Placket */}
      <line x1="50" y1="58" x2="50" y2="108" stroke="#0a0f1a" strokeWidth="1.2" />

      {/* Left Lapel (Notch Lapel) */}
      <path
        d="M 37 24 L 43 40 L 40 43 L 50 58 L 50 32 L 40 24 Z"
        fill="url(#lapelGrad)"
        stroke="#101826"
        strokeWidth="0.8"
      />
      {/* Left Lapel Micro-stitch line */}
      <path
        d="M 38 25 L 43 39 L 41 42 L 49 55"
        stroke="#4a6088"
        strokeWidth="0.6"
        strokeDasharray="1.2 1"
        fill="none"
        opacity="0.75"
      />

      {/* Right Lapel (Overlapping front placket) */}
      <path
        d="M 63 24 L 57 40 L 60 43 L 50 58 L 50 32 L 60 24 Z"
        fill="url(#lapelGrad)"
        stroke="#101826"
        strokeWidth="0.8"
      />
      {/* Right Lapel Micro-stitch line */}
      <path
        d="M 62 25 L 57 39 L 59 42 L 51 55"
        stroke="#4a6088"
        strokeWidth="0.6"
        strokeDasharray="1.2 1"
        fill="none"
        opacity="0.75"
      />

      {/* Tailored Chest Welt Pocket on left */}
      <rect x="33" y="47" width="10" height="2" rx="0.5" fill="#131c30" stroke="#253554" strokeWidth="0.5" />

      {/* Waist Flap Pockets (Left & Right) */}
      {/* Left Flap Pocket */}
      <path
        d="M 28 72 L 42 72 L 42 76 L 28 76 Z"
        fill="#121a2d"
        stroke="#273756"
        strokeWidth="0.7"
      />
      {/* Right Flap Pocket */}
      <path
        d="M 58 72 L 72 72 L 72 76 L 58 76 Z"
        fill="#121a2d"
        stroke="#273756"
        strokeWidth="0.7"
      />

      {/* Horn Buttons with Thread Detail */}
      {/* Button 1 */}
      <circle cx="50" cy="64" r="2.4" fill="url(#hornButtonGrad)" stroke="#5d4037" strokeWidth="0.5" />
      <circle cx="49.5" cy="63.5" r="0.5" fill="#ffffff" opacity="0.6" />
      <circle cx="50.5" cy="64.5" r="0.5" fill="#ffffff" opacity="0.6" />

      {/* Button 2 */}
      <circle cx="50" cy="78" r="2.4" fill="url(#hornButtonGrad)" stroke="#5d4037" strokeWidth="0.5" />
      <circle cx="49.5" cy="77.5" r="0.5" fill="#ffffff" opacity="0.6" />
      <circle cx="50.5" cy="78.5" r="0.5" fill="#ffffff" opacity="0.6" />

      {/* Button 3 */}
      <circle cx="50" cy="92" r="2.4" fill="url(#hornButtonGrad)" stroke="#5d4037" strokeWidth="0.5" />
      <circle cx="49.5" cy="91.5" r="0.5" fill="#ffffff" opacity="0.6" />
      <circle cx="50.5" cy="92.5" r="0.5" fill="#ffffff" opacity="0.6" />

      {/* Hem micro-stitch detail */}
      <line x1="28" y1="105" x2="72" y2="105" stroke="#314468" strokeWidth="0.5" strokeDasharray="1.5 1" opacity="0.6" />
    </svg>
  );
}

export default function DualIndustryShowcase({
  initialIndustry = "food",
}: DualIndustryShowcaseProps) {
  const [prevInitialIndustry, setPrevInitialIndustry] = useState(initialIndustry);
  const [activeIndustry, setActiveIndustry] = useState<"food" | "fashion">(initialIndustry);

  if (initialIndustry && initialIndustry !== prevInitialIndustry) {
    setPrevInitialIndustry(initialIndustry);
    setActiveIndustry(initialIndustry);
  }

  return (
    <section id="showcase" className="py-24 sm:py-32 lg:py-36 bg-[#f8f9fa] border-b border-[#e8eaed] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Section Header with Numerological Storytelling (The Dyad of Commerce) */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-6 shadow-xs">
            <Store className="w-4 h-4 text-[#1a73e8]" />
            <span className="font-medium text-[#202124]">The Dyad of D2C · 2대 특화 영역</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            내 업종에 꼭 맞는 특화 기능과 테마 디자인
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            대지의 신선도를 전하는 <strong>식품(01)</strong>과 핏과 감각을 표현하는 <strong>패션(02)</strong>. 
            획일화된 템플릿 대신 각 산업의 본질에 맞추어 설계된 2대 라이브 데모 쇼핑몰을 직접 경험해 보세요.
          </p>

          {/* Industry Dual Switcher Pills */}
          <div className="flex flex-col sm:inline-flex sm:flex-row p-1.5 rounded-3xl sm:rounded-full bg-white border border-[#dadce0] shadow-xs mt-8 sm:mt-10 max-w-full">
            <button
              type="button"
              onClick={() => setActiveIndustry("food")}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-all duration-200 cursor-pointer ${
                activeIndustry === "food"
                  ? "bg-[#1a73e8] text-white shadow-xs"
                  : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
              }`}
            >
              <Wheat
                className={`w-4.5 h-4.5 transition-colors ${
                  activeIndustry === "food" ? "text-white" : "text-[#137333]"
                }`}
              />
              <span>식품 · 농가 솔루션 (&apos;제철곳간&apos;)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIndustry("fashion")}
              className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-all duration-200 cursor-pointer ${
                activeIndustry === "fashion"
                  ? "bg-[#1a73e8] text-white shadow-xs"
                  : "text-[#5f6368] hover:text-[#202124] hover:bg-[#f8f9fa]"
              }`}
            >
              <Shirt
                className={`w-4.5 h-4.5 transition-colors ${
                  activeIndustry === "fashion" ? "text-white" : "text-[#1a73e8]"
                }`}
              />
              <span>패션 · 디자이너 솔루션 (&apos;온결&apos;)</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Food & Agriculture Solution */}
        {activeIndustry === "food" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Explanation (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3.5 py-1 rounded-full border border-[#ceead6]">
                  농산물 · 신선식품 · 과수원 D2C
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-[#202124]">
                  산지직송의 신선함을 전하는 &apos;제철곳간&apos;
                </h3>
                <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                  일반 공산품 쇼핑몰로는 해결할 수 없는 농식품만의 중량 규격, 당일 출고 마감, 신선 안심 포장 가이드를 기본 탑재했습니다.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#e6f4ea] text-[#137333] shrink-0 mt-0.5">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">중량(kg) 및 규격 옵션 분기</h4>
                    <p className="text-xs text-[#5f6368]">3kg 가정용 실속형, 5kg 선물용 등 용도별 규격과 옵션가격을 직관적으로 분리</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#fef7e0] text-[#b06000] shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">당일 수확 출고 마감 타이머</h4>
                    <p className="text-xs text-[#5f6368]">“오늘 14시 주문 건까지 당일 수확 산지 출발” 실시간 카운트다운으로 당일 결제 유도</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] shrink-0 mt-0.5">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">냉장·신선 배송 &amp; 보관법 가이드</h4>
                    <p className="text-xs text-[#5f6368]">완충 포장 방식과 보관 팁을 구매 전 상세히 안내하여 고객 문의와 오배송 혼선을 줄입니다</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 sm:px-8 py-4 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base shadow-xs transition-all w-full sm:w-auto text-center justify-center"
                >
                  <span>&apos;제철곳간&apos; 라이브 데모 쇼핑몰 직접 들어가 보기</span>
                  <ExternalLink className="w-4.5 h-4.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Right Mock Card (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#dadce0]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="text-xs sm:text-sm text-[#5f6368] ml-2 font-mono">
                    shop-demo-food-store.asia-northeast3.run.app
                  </span>
                </div>
                <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3.5 py-1 rounded-full border border-[#ceead6]">
                  식품 데모
                </span>
              </div>

              <div className="space-y-6 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
                <div className="flex gap-5 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#fef7e0] border border-[#feefc3] flex items-center justify-center shrink-0 p-2 shadow-xs">
                    <FreshAppleVector className="w-16 h-16" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full">
                      경북 청송 산지직송
                    </span>
                    <h4 className="font-medium text-[#202124] text-xl mt-1.5">
                      2026 햇 부사 사과 (고당도 선별)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">당일 아침 수확분 한정 출고</p>
                  </div>
                </div>

                <div className="bg-white border border-[#dadce0] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#202124] text-xs sm:text-sm">
                        오늘 산지 출고 마감
                      </div>
                      <div className="text-xs text-[#5f6368]">
                        오후 2시 이전 주문 시 당일 산지 수확 발송
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-medium text-lg text-[#202124] bg-[#f8f9fa] px-3.5 py-1.5 rounded-full border border-[#dadce0]">
                    03:42:18
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl border-2 border-[#1e8e3e] bg-[#e6f4ea]/30">
                    <div className="font-medium text-[#202124]">3kg 실속형 (10~12과)</div>
                    <div className="text-[#137333] font-medium text-base mt-1.5">28,000원</div>
                  </div>
                  <div className="p-4 rounded-2xl border border-[#dadce0] bg-white">
                    <div className="font-medium text-[#202124]">5kg 선물용 (14~16과)</div>
                    <div className="text-[#5f6368] font-medium text-base mt-1.5">45,000원</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fashion & Designer Solution */}
        {activeIndustry === "fashion" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Explanation (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-3.5 py-1 rounded-full border border-[#d2e3fc]">
                  디자이너 브랜드 · 자체제작 의류
                </span>
                <h3 className="text-2xl sm:text-3xl font-medium text-[#202124]">
                  핏과 감성을 온전히 담아내는 &apos;온결&apos;
                </h3>
                <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
                  에이블리나 지그재그의 가격 비교 알고리즘에 묻히지 않도록, 브랜드 고유의 감성을 표현하는 세로형 룩북과 체형별 사이즈 가이드를 기본 탑재했습니다.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#e8f0fe] text-[#1a73e8] shrink-0 mt-0.5">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">세로형 고화질 룩북 테마</h4>
                    <p className="text-xs text-[#5f6368]">의류 실물 핏감과 디테일한 봉제선까지 온전히 살려내는 모바일 최적화 세로 비율</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#fef7e0] text-[#b06000] shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">모델 착용컷 인터랙션</h4>
                    <p className="text-xs text-[#5f6368]">호버 및 클릭 시 모델 착용 전신 컷으로 자연스럽게 전환되어 높은 몰입감 선사</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] flex items-start gap-4">
                  <div className="p-2.5 rounded-full bg-[#fce8e6] text-[#d93025] shrink-0 mt-0.5">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-[#202124] text-base mb-1">실측 사이즈표 &amp; 소재 가이드</h4>
                    <p className="text-xs text-[#5f6368]">어깨/가슴/소매 단면 실측표와 신축성·두께감 지수를 제공하여 사이즈 착오로 인한 교환을 방지합니다</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://shop-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 sm:px-8 py-4 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base shadow-xs transition-all w-full sm:w-auto text-center justify-center"
                >
                  <span>패션 &apos;온결&apos; 라이브 데모 쇼핑몰 직접 들어가 보기</span>
                  <ExternalLink className="w-4.5 h-4.5 opacity-80" />
                </a>
              </div>
            </div>

            {/* Right Mock Card (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#dadce0]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                  <span className="text-xs sm:text-sm text-[#5f6368] ml-2 font-mono">
                    shop-store.asia-northeast3.run.app
                  </span>
                </div>
                <span className="text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-3.5 py-1 rounded-full border border-[#d2e3fc]">
                  패션 데모
                </span>
              </div>

              <div className="space-y-6 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
                <div className="flex gap-5 items-center">
                  <div className="w-20 h-24 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center shrink-0 p-2 shadow-xs">
                    <CuratedCoatVector className="w-16 h-20" />
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full">
                      2026 S/S 시그니처
                    </span>
                    <h4 className="font-medium text-[#202124] text-xl mt-1.5">
                      오버핏 울 블렌드 싱글 코트 (클래식 네이비)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">자체제작 프리미엄 패브릭</p>
                  </div>
                </div>

                <div className="bg-white border border-[#dadce0] rounded-2xl p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs font-medium text-[#202124]">
                    <span>소재 특성 가이드</span>
                    <span className="text-[#1a73e8]">사이즈 가이드 보기</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#f8f9fa]">신축성: 보통</div>
                    <div className="p-2.5 rounded-xl bg-[#f8f9fa]">두께감: 도톰함</div>
                    <div className="p-2.5 rounded-xl bg-[#f8f9fa]">비침: 없음</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-2xl border-2 border-[#1a73e8] bg-[#e8f0fe]/30 text-center">
                    <div className="font-medium text-[#202124]">S (90~95)</div>
                    <div className="text-xs text-[#1a73e8] mt-0.5">재고 있음</div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[#dadce0] bg-white text-center">
                    <div className="font-medium text-[#202124]">M (95~100)</div>
                    <div className="text-xs text-[#5f6368] mt-0.5">재고 있음</div>
                  </div>
                  <div className="p-3.5 rounded-2xl border border-[#dadce0] bg-white text-center">
                    <div className="font-medium text-[#202124]">L (100~105)</div>
                    <div className="text-xs text-[#5f6368] mt-0.5">품절 임박</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contextual Transition Bridge to Section 03 (Infrastructure) */}
        <div className="pt-6 sm:pt-10">
          <a
            href="#infrastructure"
            className="group block w-full max-w-7xl mx-auto bg-gradient-to-r from-white via-[#f8f9fa] to-white border border-[#dadce0] rounded-3xl p-6 sm:p-8 text-left shadow-xs hover:border-[#1a73e8]/50 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-medium text-[#1a73e8] bg-[#e8f0fe] px-2.5 py-0.5 rounded-full">
                    Next Chapter · 03
                  </span>
                  <span className="text-xs font-medium text-[#5f6368]">
                    4대 인프라 기반 &amp; 7단계 완성 주기
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-medium text-[#202124] group-hover:text-[#1a73e8] transition-colors flex items-center gap-1.5">
                  <span>예쁜 디자인 뒤에 숨겨진 안정적인 기술 기반은 무엇일까요?</span>
                </h4>
                <p className="text-xs sm:text-sm text-[#5f6368]">
                  독립 데이터베이스 소유, 토스 간편결제 직가맹, 3중 모니터링 레이더와 7단계 런칭 아키텍처
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-medium text-[#1a73e8] bg-white border border-[#dadce0] px-5 py-2.5 rounded-full group-hover:bg-[#1a73e8] group-hover:text-white transition-all shadow-xs inline-flex items-center gap-2">
                  <span>03 기술 인프라 확인</span>
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
