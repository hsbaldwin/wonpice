"use client";

import { useState } from "react";
import { Store, ExternalLink, Clock, Package, Scale } from "lucide-react";

export default function FarmFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<"weight" | "timer" | "coldchain">("weight");

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-[#e8eaed]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header (Google Store style) */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-medium mb-4">
            <Store className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>실제 작동하는 농가 쇼핑몰 쇼케이스</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4">
            농가 전문 쇼핑몰 '제철곳간' 라이브 데모 분석
          </h2>
          <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
            농산물 구매 고객의 전환율을 결정하는 핵심 기능들이 실제로 어떻게 구현되어 있는지 확인해 보세요.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Switchers (5 cols) in Pill Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                id: "weight",
                title: "중량(kg) 및 규격 옵션 체계",
                desc: "3kg 가정용, 5kg 선물용 등 용도별 규격과 옵션가격을 직관적으로 설정",
                icon: <Scale className="w-4 h-4 text-[#137333]" />,
              },
              {
                id: "timer",
                title: "당일 수확 출고 마감 타이머",
                desc: "14시 마감 카운트다운으로 산지직송의 신선함 강조 및 당일 결제 유도",
                icon: <Clock className="w-4 h-4 text-[#b06000]" />,
              },
              {
                id: "coldchain",
                title: "냉장·신선 배송 & 보관법 가이드",
                desc: "완충 포장 안내와 후숙 팁을 제공하여 반품·CS 사전 방지",
                icon: <Package className="w-4 h-4 text-[#1a73e8]" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFeature(tab.id as "weight" | "timer" | "coldchain")}
                className={`w-full p-5 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-4 ${
                  activeFeature === tab.id
                    ? "bg-[#f8f9fa] border-[#202124] shadow-xs"
                    : "bg-white border-[#dadce0] hover:border-[#5f6368]"
                }`}
              >
                <div className="p-2.5 rounded-full bg-[#f1f3f4] shrink-0 mt-0.5">
                  {tab.icon}
                </div>
                <div>
                  <h3 className="font-medium text-[#202124] text-sm mb-1">{tab.title}</h3>
                  <p className="text-xs text-[#5f6368] leading-relaxed">{tab.desc}</p>
                </div>
              </button>
            ))}

            <div className="pt-3">
              <a
                href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-xs sm:text-sm transition-all cursor-pointer shadow-xs hover:shadow-sm"
              >
                <span>실제 '제철곳간' 데모 쇼핑몰 직접 들어가 보기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Mock UI Preview (7 cols) in Google Device Card */}
          <div className="lg:col-span-7 bg-[#f8f9fa] p-7 sm:p-9 rounded-3xl border border-[#dadce0] relative">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#dadce0]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#dadce0]" />
                <span className="text-xs font-normal text-[#5f6368] ml-2 font-mono">
                  shop-demo-food-store.run.app
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6]">
                제철곳간 테마
              </span>
            </div>

            {/* Simulated Store Product Card */}
            {activeFeature === "weight" && (
              <div className="space-y-5 bg-white p-6 rounded-2xl border border-[#dadce0]">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-2xl bg-[#fef7e0] border border-[#feefc3] flex items-center justify-center text-3xl shrink-0">
                    🍎
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-[#137333] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                      경북 청송 산지직송
                    </span>
                    <h4 className="font-medium text-[#202124] text-base mt-1">
                      2026 햇 부사 사과 (고당도 선별)
                    </h4>
                    <p className="text-xs text-[#5f6368]">당일 아침 수확분 한정 출고</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-medium text-[#202124]">중량 및 규격 선택</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3.5 rounded-xl border-2 border-[#1e8e3e] bg-[#e6f4ea]/30">
                      <div className="font-medium text-[#202124]">3kg 실속형 (10~12과)</div>
                      <div className="text-[#137333] font-medium mt-1">28,000원</div>
                    </div>
                    <div className="p-3.5 rounded-xl border border-[#dadce0] hover:border-[#202124]">
                      <div className="font-medium text-[#202124]">5kg 선물용 (14~16과)</div>
                      <div className="text-[#5f6368] font-medium mt-1">45,000원</div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8f9fa] p-3.5 rounded-xl text-xs text-[#5f6368] flex items-center justify-between">
                  <span>총 주문 금액</span>
                  <span className="font-normal text-base text-[#202124]">28,000원 (무료배송)</span>
                </div>
              </div>
            )}

            {activeFeature === "timer" && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#dadce0]">
                <div className="bg-[#fef7e0]/60 border border-[#feefc3] rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#f9ab00] text-[#202124] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium text-[#202124] text-xs sm:text-sm">
                        오늘 산지 출고 마감까지
                      </div>
                      <div className="text-[11px] text-[#5f6368]">
                        오후 2시 이전 주문 시 당일 산지 수확 발송!
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-medium text-lg text-[#202124] bg-white px-3 py-1.5 rounded-full border border-[#dadce0]">
                    03:42:18
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#dadce0] text-xs text-[#5f6368] space-y-1">
                  <div className="font-medium text-[#202124]">신선 출고 원칙:</div>
                  <p className="text-[11px] leading-relaxed">
                    미리 따서 창고에 쌓아둔 사과가 아닌, 매일 아침 나무에서 직접 딴 신선한 사과만 선별하여 당일 오후 우체국 택배로 발송합니다.
                  </p>
                </div>
              </div>
            )}

            {activeFeature === "coldchain" && (
              <div className="space-y-4 bg-white p-6 rounded-2xl border border-[#dadce0]">
                <div className="bg-[#e8f0fe]/60 border border-[#d2e3fc] rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-medium text-[#1a73e8] text-xs sm:text-sm">
                    <Package className="w-4 h-4 text-[#1a73e8]" />
                    <span>산지직송 3중 안심 완충 포장 안내</span>
                  </div>
                  <p className="text-xs text-[#3c4043] leading-relaxed">
                    과일 한 알 한 알 난좌 포장 + 상·하단 두꺼운 에어캡 패드로 배송 충격을 완벽히 차단합니다. 수령 즉시 직사광선을 피해 냉장 보관하시면 3주간 아삭함이 유지됩니다.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                  <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                    <div className="text-base mb-1">📦</div>
                    <div className="font-medium text-[11px] text-[#202124]">전용 강화박스</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                    <div className="text-base mb-1">🛡️</div>
                    <div className="font-medium text-[11px] text-[#202124]">에어캡 완충</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#f8f9fa] border border-[#dadce0]">
                    <div className="text-base mb-1">❄️</div>
                    <div className="font-medium text-[11px] text-[#202124]">냉장보관 안내</div>
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
