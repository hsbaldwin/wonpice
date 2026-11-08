import { HelpCircle } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "자사몰을 열면 기존 스마트스토어나 쿠팡은 접어야 하나요?",
      a: "전혀 그렇지 않습니다! 가장 검증된 올바른 전략은 스마트스토어와 쿠팡을 '신규 고객이 우리를 처음 발견하는 유입구'로 유지하는 것입니다. 첫 구매 고객의 택배 박스에 소식지와 자사몰 혜택을 동봉하여, 두 번째 구매부터는 수수료 없는 자사몰로 유도하는 병행 방식이 가장 효과적입니다.",
    },
    {
      q: "아직 월 매출이 크지 않은데 자사몰을 열어도 될까요?",
      a: "산지직송 농산물, 가공식품, 자체제작 패션처럼 '고객이 다시 찾는 품목'이라면 단순 매출액보다 '단골의 목소리'가 더 중요합니다. 단 50명의 충성 단골만 있어도 자사몰 유지비용을 상쇄하고 브랜드를 안정적으로 키워갈 수 있습니다.",
    },
    {
      q: "개발자나 디자이너가 없는데 운영이 어렵지 않을까요?",
      a: "가게지기는 소상공인 대표님들이 기술적인 걱정 없이 장사에만 전념하실 수 있도록 만들어졌습니다. 상품 등록 대행부터 토스페이먼츠 결제 연결, 24시간 서버 모니터링과 매일 데이터 백업까지 전문 기술팀이 전담합니다.",
    },
    {
      q: "자사몰의 결제 수수료와 정산은 어떻게 이루어지나요?",
      a: "대표님 명의로 토스페이먼츠(PG사)와 직접 안전하게 계약하며, 가게지기는 결제 수수료를 일체 취하지 않습니다. 신용카드, 카카오페이, 네이버페이, 토스페이 등 모든 간편결제가 지원되며 법정 수수료율(영세/중소 우대 수수료 약 1.5%~2%대)이 그대로 적용됩니다.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>자주 묻는 질문</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          자사몰 독립에 대해 궁금한 점
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-2 flex items-start gap-2.5">
              <span className="text-emerald-700 font-extrabold">Q.</span>
              <span>{faq.q}</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
