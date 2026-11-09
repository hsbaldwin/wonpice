"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { usePartnerModal } from "./PartnerModalContext";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "오픈까지 쇼핑몰 제작 기간은 얼마나 걸리나요?",
    a: "계약일로부터 보통 3~5주가 소요됩니다. 가장 시간이 오래 걸리는 토스페이먼츠 전자결제(PG) 가맹 심사(1~2주)를 계약 직후 우선 접수 대행해 드리므로, 디자인 및 상품 등록과 병행하여 오픈 일정을 최대한 단축해 드립니다.",
  },
  {
    q: "스마트스토어나 카페24에서 기존 상품을 옮길 수 있나요?",
    a: "네, 얼마든지 가능합니다. 기존 운영 중이신 쇼핑몰의 상품 목록을 엑셀로 내려받아 전달해 주시면, 비즈니스 요금제 기준 최대 100개까지 상품명, 옵션, 대표 이미지, 상세페이지를 일괄 등록 대행해 드립니다.",
  },
  {
    q: "결제 수수료는 어떻게 부과되고 정산되나요?",
    a: "고객사 명의로 토스페이먼츠와 직접 가맹 계약을 체결합니다. 매출 정산과 카드사 결제 수수료(약 2~3%대)는 고객사와 PG사 간에 직접 투명하게 이뤄지며, 당사는 어떠한 추가 판매 수수료나 중개 수수료도 부과하지 않습니다.",
  },
  {
    q: "서버가 멈추거나 접속 장애가 생기면 어떻게 대응하나요?",
    a: "10분마다 서울, 미국, 유럽 3개 거점에서 쇼핑몰 정상 접속 여부를 자동 감시합니다. 만에 하나 장애 발생 시 전담 기술팀이 실시간 알림을 받아 즉시 조치하며, 데이터베이스는 매일 새벽 자동 백업되어 특정 시점으로 언제든 안전하게 복구할 수 있습니다.",
  },
  {
    q: "만약 서비스를 종료하게 되면 내 쇼핑몰 데이터는 어떻게 되나요?",
    a: "주문 내역, 회원 정보, 상품 데이터를 모두 엑셀 파일로 온전히 반환해 드립니다. 반환 완료 후 서버 내의 모든 데이터는 개인정보보호법에 의거하여 안전하게 영구 파기됩니다.",
  },
  {
    q: "오픈 후 직접 디자인 색상이나 문구를 변경할 수 있나요?",
    a: "네, 관리자 화면에서 로고, 대표 색상, 메인 문구, 배너 이미지를 코딩 없이 직접 변경하실 수 있습니다. 레이아웃 구조를 대대적으로 변경하거나 새로운 맞춤 기능을 추가하고자 하실 경우 별도 견적으로 지원해 드립니다.",
  },
];

export default function SolutionFaq() {
  const { openPartnerModal } = usePartnerModal();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 lg:py-36 bg-white border-b border-[#e8eaed]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs sm:text-sm font-semibold mb-6">
            <HelpCircle className="w-4 h-4 text-[#1a73e8]" />
            <span>자주 묻는 질문</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#202124] tracking-tight mb-6 leading-tight break-keep">
            자사몰 제작 및 운영 실무 FAQ
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5f6368] leading-relaxed break-keep font-normal">
            자사몰 오픈을 준비하시는 대표님들이 가장 많이 질문하시는 내용을 모았습니다.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-[28px] overflow-hidden border transition-all duration-200 ${
                  isOpen
                    ? "border border-[#1a73e8] bg-white shadow-xs"
                    : "border border-[#dadce0] bg-[#f8f9fa] hover:bg-[#f1f3f4]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  id={`faq-question-${idx}`}
                  className="w-full p-6 sm:p-8 text-left flex items-center justify-between gap-5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2 transition-colors"
                >
                  <span className="font-semibold text-[#202124] text-base sm:text-lg flex items-center gap-3.5 tracking-tight break-keep">
                    <span className="text-[#1a73e8] font-bold text-base sm:text-lg shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#5f6368] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#202124]" : ""
                    }`}
                  />
                </button>

                {/* Pre-rendered content for crawler SEO */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={`px-6 sm:px-8 pb-8 pt-2 text-sm sm:text-base text-[#5f6368] leading-relaxed border-t border-[#f1f3f4] ${
                    isOpen ? "block bg-white" : "hidden"
                  }`}
                >
                  <p className="break-keep">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Support Card */}
        <div className="p-9 sm:p-12 rounded-[36px] bg-[#f8f9fa] border border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <div className="font-semibold text-[#202124] text-lg sm:text-xl mb-1.5 tracking-tight break-keep">
              내 브랜드 맞춤 제작 견적이나 상담이 필요하신가요?
            </div>
            <div className="text-sm text-[#5f6368] break-keep font-normal">
              전문 기술 상담팀이 업종과 취급 상품에 맞추어 가장 알맞은 구축 방식을 안내해 드립니다.
            </div>
          </div>
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_faq_bottom"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openPartnerModal({ plan: "custom" });
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white font-semibold text-sm sm:text-base shrink-0 shadow-xs hover:shadow transition-all cursor-pointer tracking-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
          >
            <span>1:1 상담 신청서 작성 ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
