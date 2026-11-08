"use client";

import { useState } from "react";
import { Store, ExternalLink, Clock, Package, Scale } from "lucide-react";

export default function StoreShowcase() {
  const [activeFeature, setActiveFeature] = useState<"weight" | "timer" | "coldchain">("weight");

  return (
    <section id="showcase" className="py-24 sm:py-32 lg:py-36 bg-[#f8f9fa] border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-6">
            <Store className="w-4 h-4 text-[#1e8e3e]" />
            <span>실제 작동하는 농가 쇼핑몰</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#202124] tracking-tight mb-6 leading-tight">
            농부의 진심을 담아내는 공간, '제철곳간'
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed">
            일반 공산품 쇼핑몰과 다릅니다. 
            산지직송의 신선함과 농산물 특화 옵션이 갖춰진 실제 작동 쇼핑몰을 직접 확인해 보세요.
          </p>
        </div>

        {/* Feature Showcase Grid spanning 1280px */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Toggles (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {[
              {
                id: "weight",
                title: "중량(kg) 및 규격 옵션 체계",
                desc: "3kg 실속형, 5kg 선물용 등 용도별 규격과 옵션가격을 직관적으로 설정",
                icon: <Scale className="w-5 h-5 text-[#137333]" />,
              },
              {
                id: "timer",
                title: "당일 수확 출고 마감 안내",
                desc: "14시 마감 카운트다운으로 산지직송의 신선함을 강조하고 당일 결제를 안내",
                icon: <Clock className="w-5 h-5 text-[#b06000]" />,
              },
              {
                id: "coldchain",
                title: "산지 안심 배송 & 보관법 안내",
                desc: "완충 포장 안내와 후숙 팁을 제공하여 고객 신뢰를 높이고 CS 사전 예방",
                icon: <Package className="w-5 h-5 text-[#1a73e8]" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFeature(tab.id as "weight" | "timer" | "coldchain")}
                className={`w-full p-6 sm:p-7 rounded-[28px] text-left border transition-all cursor-pointer flex items-start gap-5 ${
                  activeFeature === tab.id
                    ? "bg-white border-[#202124] shadow-xs ring-1 ring-[#202124]/10"
                    : "bg-white/60 border-[#dadce0] hover:border-[#5f6368]"
                }`}
              >
                <div className="p-3 rounded-full bg-[#f1f3f4] shrink-0 mt-0.5">
                  {tab.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[#202124] text-base sm:text-lg mb-1.5">{tab.title}</h3>
                  <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">{tab.desc}</p>
                </div>
              </button>
            ))}

            <div className="pt-4">
              <a
                href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm sm:text-base transition-all cursor-pointer shadow-xs"
              >
                <span>'제철곳간' 데모 쇼핑몰 직접 들어가 보기</span>
                <ExternalLink className="w-4.5 h-4.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Right Mock UI Preview (7 cols) in Spacious 1280px Card */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[36px] border border-[#dadce0] shadow-xs relative">
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-[#dadce0]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                <span className="w-3 h-3 rounded-full bg-[#dadce0]" />
                <span className="text-xs sm:text-sm text-[#5f6368] ml-2 font-mono">
                  shop-demo-food-store.run.app
                </span>
              </div>
              <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3.5 py-1 rounded-full border border-[#ceead6]">
                제철곳간 테마
              </span>
            </div>

            {/* Feature Mock Views */}
            {activeFeature === "weight" && (
              <div className="space-y-6 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
                <div className="flex gap-5 items-center">
                  <div className="w-20 h-20 rounded-2xl bg-[#fef7e0] border border-[#feefc3] flex items-center justify-center text-4xl shrink-0">
                    🍎
                  </div>
                  <div>
                    <span className="text-xs font-medium text-[#137333] bg-[#e6f4ea] px-3 py-1 rounded-full">
                      경북 청송 산지직송
                    </span>
                    <h4 className="font-medium text-[#202124] text-lg sm:text-xl mt-1.5">
                      2026 햇 부사 사과 (고당도 선별)
                    </h4>
                    <p className="text-xs sm:text-sm text-[#5f6368] mt-0.5">당일 아침 수확분 한정 출고</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-xs sm:text-sm font-medium text-[#202124]">중량 및 규격 선택</label>
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

                <div className="bg-white p-4 rounded-2xl text-xs sm:text-sm text-[#5f6368] flex items-center justify-between border border-[#dadce0]">
                  <span>총 결제 금액</span>
                  <span className="font-normal text-lg sm:text-xl text-[#202124]">28,000원 (무료배송)</span>
                </div>
              </div>
            )}

            {activeFeature === "timer" && (
              <div className="space-y-6 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
                <div className="bg-white border border-[#dadce0] rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium text-[#202124] text-sm sm:text-base">
                        오늘 산지 출고 마감까지
                      </div>
                      <div className="text-xs sm:text-sm text-[#5f6368] mt-0.5">
                        오후 2시 이전 주문 시 당일 산지 수확 발송
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-medium text-xl text-[#202124] bg-[#f8f9fa] px-4 py-2 rounded-full border border-[#dadce0]">
                    03:42:18
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#dadce0] text-xs sm:text-sm text-[#5f6368] space-y-1.5">
                  <div className="font-medium text-[#202124]">신선 출고 원칙:</div>
                  <p className="leading-relaxed">
                    창고에 미리 쌓아두지 않고, 매일 아침 수확한 농산물만 선별하여 당일 오후 우체국 택배로 산지에서 바로 발송합니다.
                  </p>
                </div>
              </div>
            )}

            {activeFeature === "coldchain" && (
              <div className="space-y-6 bg-[#f8f9fa] p-8 rounded-3xl border border-[#dadce0]">
                <div className="bg-white border border-[#dadce0] rounded-2xl p-5 space-y-2.5">
                  <div className="flex items-center gap-2 font-medium text-[#137333] text-sm sm:text-base">
                    <Package className="w-5 h-5 text-[#1e8e3e]" />
                    <span>산지직송 안심 완충 포장 안내</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#5f6368] leading-relaxed">
                    과일 한 알마다 개별 난좌 포장과 두꺼운 에어캡 패드로 배송 충격을 완벽히 차단합니다. 수령 후 보관 팁을 구매 전 미리 안내합니다.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs sm:text-sm">
                  <div className="p-4 rounded-2xl bg-white border border-[#dadce0]">
                    <div className="text-2xl mb-1.5">📦</div>
                    <div className="font-medium text-[#202124]">강화박스</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#dadce0]">
                    <div className="text-2xl mb-1.5">🛡️</div>
                    <div className="font-medium text-[#202124]">에어캡 완충</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#dadce0]">
                    <div className="text-2xl mb-1.5">❄️</div>
                    <div className="font-medium text-[#202124]">냉장보관 팁</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
