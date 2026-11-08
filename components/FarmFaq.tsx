"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: "농지원부나 사업자등록증, 통신판매업 신고가 아직 없는데도 쇼핑몰 제작이 가능한가요?",
    a: "네, 얼마든지 가능합니다. 쇼핑몰 기본 디자인 세팅과 상품 등록 작업을 먼저 진행하면서 관할 세무서 및 국세청 홈택스를 통해 사업자등록(간이과세자 또는 일반과세자)과 정부24를 통한 통신판매업 신고를 동시에 안내해 드립니다. 직접 농사지으신 농산물(가공되지 않은 곡물·과일·채소)은 부가가치세 면세 대상이므로 세무 상담 팁도 함께 안내받으실 수 있습니다.",
  },
  {
    q: "스마트스토어와 자사몰을 둘 다 운영하면 농사일에 지장이 생기지 않나요?",
    a: "전혀 그렇지 않습니다. 오히려 농업인에게 가장 권장되는 '상생 병행 공식'입니다. 스마트스토어는 신규 고객 발굴용으로 그대로 열어두고, 발송하는 택배 상자 안에 자사몰 전용 혜택 쿠폰을 넣어 단골 고객만 자사몰로 유도합니다. 주문이 들어오면 카카오 알림톡이나 스마트폰으로 즉시 확인 가능하므로 별도의 관리 부담이 늘어나지 않습니다.",
  },
  {
    q: "신용카드 결제(PG) 연동 시 가맹비나 월 고정 관리비가 따로 많이 드나요?",
    a: "가게지기(몰스튜디오) 50% 지원 혜택을 이용하시면 토스페이먼츠 간편결제·신용카드 가맹 심사 및 기술 연동이 기본으로 포함됩니다. 오픈마켓처럼 8~13%의 중개 수수료를 떼지 않고 투명한 PG 결제 수수료(약 2~3%대)만 발생하므로, 직거래 주문이 늘어날수록 농가의 순마진이 획기적으로 개선됩니다.",
  },
  {
    q: "쇼핑몰을 만들어도 홍보(마케팅)를 못 하면 방문자가 없지 않을까요?",
    a: "수백만 원씩 들어가는 포털 키워드 광고를 하실 필요가 없습니다. 핵심은 이미 내 농산물을 맛보고 신뢰를 가진 '기존 구매자'와 '지인 고객'을 자사몰 회원으로 전환하는 것입니다. 택배 박스 내 농부 편지 동봉과 수확 2주 전 단골 카카오톡 예약 발송만으로도 수확량의 30~50%는 충분히 선주문 완판을 달성할 수 있습니다.",
  },
  {
    q: "컴퓨터나 스마트폰 조작이 서툰 고령 농업인도 직접 운영할 수 있나요?",
    a: "누구나 쉽게 다룰 수 있도록 직관적인 관리자 화면이 제공됩니다. 복잡한 코딩이나 웹 지식 없이도 스마트폰 카메라로 찍은 제철 수확 사진을 바로 업로드하고, 판매 상태를 '주문 접수'에서 '배송 출발'로 원클릭 변경할 수 있습니다. 비즈니스 플랜의 경우 1:1 원격 실무 교육(1시간)을 통해 능숙해질 때까지 친절히 가이드해 드립니다.",
  },
  {
    q: "배송 중 과일이 멍들거나 터졌을 때 CS는 어떻게 처리하나요?",
    a: "상세 페이지 내에 '산지직송 3중 안심 완충 포장 안내'와 '배송 중 파손 시 100% 재발송/환불 접수 절차'를 표준 블록으로 미리 안내합니다. 소비자가 불안해하지 않고 사진 한 장만 카카오톡으로 보내면 농가가 즉시 확인하고 재발송할 수 있는 CS 대응 매뉴얼을 함께 제공해 드립니다.",
  },
];

export default function FarmFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white border-b border-[#e8eaed]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1f3f4] text-[#3c4043] text-xs font-medium mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#1e8e3e]" />
            <span>농업인을 위한 실무 FAQ</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#202124] tracking-tight mb-4">
            자주 묻는 질문과 실전 답변
          </h2>
          <p className="text-sm text-[#5f6368] leading-relaxed">
            농가 직거래 쇼핑몰을 준비하시는 대표님들이 가장 많이 궁금해하시는 질문을 모았습니다.
          </p>
        </div>

        {/* FAQ Accordion List (Google Help Center style) */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className={`rounded-2xl border transition-all ${
                  isOpen ? "bg-white border-[#202124] shadow-xs" : "bg-[#f8f9fa] border-[#dadce0]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-medium text-[#202124] text-sm sm:text-base flex items-center gap-3">
                    <span className="text-[#137333] font-medium text-sm sm:text-base shrink-0">
                      Q{idx + 1}.
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#5f6368] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#202124]" : ""
                    }`}
                  />
                </button>

                {/* Pre-rendered content for crawler SEO */}
                <div
                  className={`px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5f6368] leading-relaxed border-t border-[#f1f3f4] ${
                    isOpen ? "block bg-white" : "hidden"
                  }`}
                >
                  <p>{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Bridge (Google Card) */}
        <div className="mt-12 p-7 rounded-3xl bg-[#f8f9fa] border border-[#dadce0] flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <div className="font-medium text-[#202124] text-sm sm:text-base mb-1">
              더 궁금한 점이 있으시거나 내 농장 맞춤 상담이 필요하신가요?
            </div>
            <div className="text-xs text-[#5f6368]">
              가게지기 전문 상담팀이 농장 규모와 출하 품목에 맞추어 친절히 안내해 드립니다.
            </div>
          </div>
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_faq_bottom"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-xs shrink-0 shadow-xs transition-all"
          >
            <span>1:1 상담 신청서 작성 ↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
