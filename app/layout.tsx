import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "농산물 직거래 쇼핑몰 제작 — 공판장 헐값과 수수료를 넘는 농가 온라인 판로개척 가이드 | WonPice",
  description:
    "최저가 출혈 경쟁에서 벗어나 내 농산물의 제값을 받는 가장 올바른 선택. 농산물 직거래 쇼핑몰 제작, 스마트스토어 수수료 절감 및 D2C 단골 전환 실전 가이드. 2026 농가 맞춤 자사몰 구축비 50% 지원 혜택 안내.",
  keywords: [
    "농산물 직거래 쇼핑몰 제작",
    "산지직송 쇼핑몰 만들기",
    "농가 온라인 판로개척 지원",
    "농가 스마트스토어 수수료 절감",
    "과일 쇼핑몰 제작",
    "농산물 자사몰 구축",
    "농가 D2C",
    "농산물 직거래 사이트",
    "농가 온라인 판매",
    "제철곳간",
    "가게지기",
    "몰스튜디오",
    "wonpice",
  ],
  authors: [{ name: "WonPice 농가 온라인 판로지원 센터" }],
  openGraph: {
    title: "농산물 직거래 쇼핑몰 제작 — 농가의 올바른 판로 독립 가이드",
    description:
      "공판장 헐값 경매와 플랫폼 수수료에서 벗어나, 30%의 충성 단골을 만드는 정직한 직거래 쇼핑몰 제작법. 2026 구축비 50% 지원 혜택.",
    type: "website",
    locale: "ko_KR",
    siteName: "WonPice (원피스)",
  },
  twitter: {
    card: "summary_large_image",
    title: "농산물 직거래 쇼핑몰 제작 — 농가 온라인 판로개척 가이드 | WonPice",
    description:
      "최저가 경쟁 없는 농가 직거래 쇼핑몰 만들기. 스마트스토어 수수료 절감액 실시간 계산 및 50% 지원 안내.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLdWebsite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WonPice 농가 직거래 쇼핑몰 판로개척 가이드",
    alternateName: ["원피스", "WonPice", "농가 자사몰 가이드"],
    url: "https://wonpice.com",
    description:
      "농산물 직거래 쇼핑몰 제작 및 농가 온라인 판로개척 지원 가이드. 스마트스토어 수수료 절감 계산기 및 2026 구축비 50% 지원 안내.",
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "농지원부나 사업자등록증, 통신판매업 신고가 아직 없는데도 쇼핑몰 제작이 가능한가요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 가능합니다. 자사몰 기획 및 디자인 세팅을 먼저 진행하면서 관할 시·군·구청 및 국세청 홈택스를 통해 사업자등록(간이과세자 또는 일반과세자)과 정부24 통신판매업 신고 절차를 동시에 진행할 수 있습니다. 농업인의 경우 관할 읍·면·동사무소에서 농업경영체등록확인서를 발급받아 비과세 감면 혜택 등을 상담받으실 수 있습니다.",
        },
      },
      {
        "@type": "Question",
        name: "스마트스토어와 자사몰을 둘 다 운영하면 농사일에 지장이 생기지 않나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "전혀 그렇지 않습니다. 오히려 가장 권장되는 '상생 병행 전략'입니다. 스마트스토어는 신규 고객을 처음 발굴하는 진입 통로로 사용하고, 택배 박스 안에 자사몰 첫 구매 혜택 쿠폰을 동봉하여 재구매 고객을 수수료가 저렴한 자사몰로 유도합니다. 주문 알림은 카카오 알림톡이나 스마트폰으로 즉시 확인 가능하므로 별도의 관리 부담이 늘어나지 않습니다.",
        },
      },
      {
        "@type": "Question",
        name: "카드 결제(PG) 연동 시 가맹비나 월 고정 관리비가 많이 드나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "가게지기(몰스튜디오) 지원 혜택을 이용하시면 토스페이먼츠 간편결제·카드결제 연동이 기본으로 포함되어 복잡한 연동 작업을 대행해 드립니다. 플랫폼처럼 8~13%의 과도한 중개 수수료를 떼지 않고, 투명한 결제대행 수수료(약 2~3%대)만 발생하므로 직거래 매출이 늘어날수록 농가의 순마진이 획기적으로 개선됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "컴퓨터나 스마트폰 조작이 서툰 고령 농업인도 직접 운영할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "누구나 쉽게 다룰 수 있도록 직관적인 관리자 화면이 제공됩니다. 복잡한 코딩이나 웹 지식 없이도 스마트폰 카메라로 찍은 제철 수확 사진을 바로 업로드하고, 판매 상태를 '주문 접수'에서 '배송 출발'로 원클릭 변경할 수 있습니다. 또한 초기 상품 100개 등록 대행과 담당자 교육(1시간)이 지원됩니다.",
        },
      },
      {
        "@type": "Question",
        name: "2026 농가 자사몰 선착순 구축비 50% 지원 혜택은 누구나 받을 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "식품·농산물 생산자(과수원, 채소 재배, 쌀·잡곡, 수제 장류·가공식품 등)로서 직거래 판로를 개척하고자 하는 농가라면 신청 가능합니다. 선착순 접수 순서대로 자격 확인 후 스타터 플랜(150만 원→75만 원) 또는 비즈니스 플랜(300만 원→150만 원) 50% 감면 혜택이 적용됩니다.",
        },
      },
    ],
  };

  const jsonLdHowTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "공판장 헐값과 수수료를 극복하는 농가 직거래 쇼핑몰 4단계 구축 로드맵",
    description:
      "스마트스토어로 신규 고객을 모으고, 택배 상자 편지와 자사몰 혜택으로 평생 단골 30%를 전환하여 가격 결정권을 확보하는 실전 공식.",
    step: [
      {
        "@type": "HowToStep",
        name: "1단계: 스마트스토어로 신규 고객 유입",
        text: "네이버 검색 노출을 활용해 전국 소비자에게 첫 농산물 맛을 선보입니다.",
      },
      {
        "@type": "HowToStep",
        name: "2단계: 택배 박스 내 농부의 편지와 자사몰 QR 쿠폰 동봉",
        text: "농부의 땀방울이 담긴 스토리와 함께 '자사몰 첫 구매 3,000원 즉시 할인 QR'을 택배 상자 안에 정성껏 동봉합니다.",
      },
      {
        "@type": "HowToStep",
        name: "3단계: 자사몰 가입 단골 고객 DB(전화번호) 자산화",
        text: "플랫폼에서는 가려졌던 고객 연락처를 농가가 직접 보유하여 재구매 팬덤을 구축합니다.",
      },
      {
        "@type": "HowToStep",
        name: "4단계: 수확 2주 전 사전 예약 알림으로 수확 전 완판 달성",
        text: "출혈 광고비 지출 없이 단골에게 카카오톡 사전 예약 알림을 발송하여 수확기마다 품절을 달성합니다.",
      },
    ],
  };

  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHowTo) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
        {children}
      </body>
    </html>
  );
}
