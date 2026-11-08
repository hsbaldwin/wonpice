"use client";

import { useState } from "react";
import { Store, Shirt, Wheat, ExternalLink, Clock, Package, Scale, Ruler, Sparkles, Layers } from "lucide-react";

export default function DualIndustryShowcase() {
  const [activeIndustry, setActiveIndustry] = useState<"food" | "fashion">("food");

  return (
    <section id="showcase" className="py-24 sm:py-32 lg:py-36 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <Store className="w-4 h-4 text-[#1a73e8]" />
            <span>업종별 라이브 데모 쇼케이스</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            내 업종에 꼭 맞는 특화 기능과 테마 디자인
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            모든 업종에 똑같은 획일적인 템플릿이 아닙니다. 
            식품·농가의 신선도부터 패션의 핏감까지, 실제 제작되어 운영 중인 업종별 라이브 데모를 직접 확인해 보세요.
          </p>

          {/* Industry Dual Switcher Pills */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-[#dadce0] shadow-xs mt-10">
            <button
              type="button"
              onClick={() => setActiveIndustry("food")}
              className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer ${
                activeIndustry === "food"
                  ? "bg-[#202124] text-white shadow-xs"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              <Wheat className="w-4.5 h-4.5 text-[#81c995]" />
              <span>식품 · 농가 솔루션 ('제철곳간')</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveIndustry("fashion")}
              className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm sm:text-base font-medium transition-all cursor-pointer ${
                activeIndustry === "fashion"
                  ? "bg-[#202124] text-white shadow-xs"
                  : "text-[#5f6368] hover:text-[#202124]"
              }`}
            >
              <Shirt className="w-4.5 h-4.5 text-[#8ab4f8]" />
              <span>패션 · 디자이너 솔루션 ('온결')</span>
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
                  산지직송의 신선함을 전하는 '제철곳간'
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
                    <p className="text-xs text-[#5f6368]">완충 에어캡 포장과 후숙/보관 팁을 구매 전 미리 제공하여 반품 및 CS 80% 예방</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base shadow-xs transition-all"
                >
                  <span>'제철곳간' 라이브 데모 쇼핑몰 직접 들어가 보기</span>
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
                  <div className="w-20 h-20 rounded-2xl bg-[#fef7e0] border border-[#feefc3] flex items-center justify-center text-4xl shrink-0">
                    🍎
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
                  핏과 감성을 온전히 담아내는 '온결'
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
                    <p className="text-xs text-[#5f6368]">어깨/가슴/소매 단면 실측표와 신축성·두께감·비침 지수를 제공해 교환율 대폭 감소</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://shop-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base shadow-xs transition-all"
                >
                  <span>패션 '온결' 라이브 데모 쇼핑몰 직접 들어가 보기</span>
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
                  <div className="w-20 h-24 rounded-2xl bg-[#e8f0fe] border border-[#d2e3fc] flex items-center justify-center text-4xl shrink-0">
                    🧥
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
      </div>
    </section>
  );
}
