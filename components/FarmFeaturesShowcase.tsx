"use client";

import { useState } from "react";
import { Store, ExternalLink, Clock, Package, Scale, Check, ArrowRight } from "lucide-react";

export default function FarmFeaturesShowcase() {
  const [activeFeature, setActiveFeature] = useState<"weight" | "timer" | "coldchain">("weight");

  return (
    <section className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <Store className="w-3.5 h-3.5" />
            <span>실제 작동하는 농가 전용 쇼핑몰 체험</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight mb-3">
            농가 전문 쇼핑몰 '제철곳간' 라이브 데모 분석
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            농산물 구매 고객의 전환율을 결정하는 핵심 기능들이 실제로 어떻게 구현되어 있는지 확인해 보세요.
          </p>
        </div>

        {/* Feature Tabs & Interactive Mock Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Feature Switchers (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {[
              {
                id: "weight",
                title: "중량(kg) 및 규격 옵션 체계",
                desc: "3kg 가정용, 5kg 선물용 등 용도별 규격과 옵션가격을 직관적으로 설정",
                icon: <Scale className="w-4 h-4 text-emerald-700" />,
              },
              {
                id: "timer",
                title: "당일 수확 출고 마감 타이머",
                desc: "14시 마감 카운트다운으로 산지직송의 신선함 강조 및 당일 결제 유도",
                icon: <Clock className="w-4 h-4 text-amber-700" />,
              },
              {
                id: "coldchain",
                title: "냉장·신선 배송 & 보관법 가이드",
                desc: "아이스박스 완충 포장 안내와 후숙 꿀팁을 제공하여 반품·CS 사전 방지",
                icon: <Package className="w-4 h-4 text-teal-700" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFeature(tab.id as "weight" | "timer" | "coldchain")}
                className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer flex items-start gap-3.5 ${
                  activeFeature === tab.id
                    ? "bg-white border-emerald-600 shadow-md ring-2 ring-emerald-500/20"
                    : "bg-white/60 border-stone-200 hover:bg-white hover:border-stone-300"
                }`}
              >
                <div className="p-2.5 rounded-xl bg-stone-100 shrink-0 mt-0.5">
                  {tab.icon}
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm mb-1">{tab.title}</h3>
                  <p className="text-xs text-stone-500 leading-relaxed">{tab.desc}</p>
                </div>
              </button>
            ))}

            <div className="pt-3">
              <a
                href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <span>실제 '제철곳간' 데모 쇼핑몰 직접 들어가 보기</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Mock UI Preview (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-md relative">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-400" />
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-stone-500 ml-2">
                  shop-demo-food-store.asia-northeast3.run.app
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                제철곳간 라이브 테마
              </span>
            </div>

            {/* Simulated Store Product Card */}
            {activeFeature === "weight" && (
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl shrink-0">
                    🍎
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      경북 청송 산지직송
                    </span>
                    <h4 className="font-black text-stone-900 text-base sm:text-lg mt-1">
                      2026 햇 부사 사과 (고당도 선별)
                    </h4>
                    <p className="text-xs text-stone-500">당일 아침 수확분 한정 출고</p>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-stone-700">중량 및 규격 선택</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl border-2 border-emerald-600 bg-emerald-50/40">
                      <div className="font-bold text-stone-900">3kg 가정용 실속형 (10~12과)</div>
                      <div className="text-emerald-700 font-extrabold mt-1">28,000원</div>
                    </div>
                    <div className="p-3 rounded-xl border border-stone-200 hover:border-stone-300">
                      <div className="font-bold text-stone-900">5kg 선물용 특과 (14~16과)</div>
                      <div className="text-stone-700 font-extrabold mt-1">45,000원</div>
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded-xl text-xs text-stone-600 flex items-center justify-between">
                  <span>총 주문 금액</span>
                  <span className="font-black text-lg text-emerald-700">28,000원 (무료배송)</span>
                </div>
              </div>
            )}

            {activeFeature === "timer" && (
              <div className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-stone-900 text-xs sm:text-sm">
                        오늘 산지 출고 마감까지
                      </div>
                      <div className="text-[11px] text-amber-900">
                        오후 2시 이전 주문 시 당일 산지 수확 발송!
                      </div>
                    </div>
                  </div>
                  <div className="font-mono font-black text-xl text-amber-700 bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs">
                    03:42:18
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1.5">
                  <div className="font-bold text-stone-900">신선 출고 원칙:</div>
                  <p className="text-[11px] leading-relaxed">
                    미리 따서 창고에 쌓아둔 사과가 아닌, 매일 아침 나무에서 직접 딴 신선한 사과만 선별하여 당일 오후 우체국 택배로 발송합니다.
                  </p>
                </div>
              </div>
            )}

            {activeFeature === "coldchain" && (
              <div className="space-y-4">
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-teal-900 text-xs sm:text-sm">
                    <Package className="w-4 h-4 text-teal-700" />
                    <span>산지직송 3중 안심 완충 포장 안내</span>
                  </div>
                  <p className="text-xs text-teal-800 leading-relaxed">
                    과일 한 알 한 알 난좌 포장 + 상·하단 두꺼운 에어캡 패드로 배송 충격을 완벽히 차단합니다. 수령 즉시 직사광선을 피해 냉장 보관하시면 3주간 아삭함이 유지됩니다.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-base mb-1">📦</div>
                    <div className="font-bold text-[11px] text-stone-800">전용 강화박스</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-base mb-1">🛡️</div>
                    <div className="font-bold text-[11px] text-stone-800">에어캡 완충</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="text-base mb-1">❄️</div>
                    <div className="font-bold text-[11px] text-stone-800">수령 후 냉장보관</div>
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
