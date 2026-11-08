import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";

const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
  title: "업종 맞춤 자사몰 솔루션 — 오픈마켓 수수료 없이 내 브랜드를 키우는 자사몰 제작 | WonPice",
  description:
    "스마트스토어·오픈마켓 수수료 없이 내 브랜드를 키우는 업종 맞춤형 자사몰 솔루션. 식품·농가('제철곳간')부터 패션('온결')까지. 테마 제작, 상품 100개 등록 대행, 결제 연동 3~5주 완성. 2026 선착순 구축비 50% 할인 프로모션.",
  keywords: [
    "자사몰 솔루션",
    "쇼핑몰 제작 솔루션",
    "업종 맞춤 쇼핑몰",
    "농가 쇼핑몰 제작",
    "식품 자사몰 솔루션",
    "패션 쇼핑몰 제작",
    "스마트스토어 수수료 절감",
    "자사몰 독립",
    "제철곳간",
    "온결",
    "가게지기",
    "몰스튜디오",
    "wonpice",
  ],
  authors: [{ name: "WonPice 자사몰 솔루션 센터" }],
  openGraph: {
    title: "업종 맞춤 자사몰 솔루션 — 2026 선착순 구축비 50% 프로모션",
    description:
      "오픈마켓 수수료 없이 내 브랜드를 키우는 자사몰 솔루션. 식품·농가 및 패션 브랜드 라이브 데모 체험 및 50% 지원 혜택.",
    type: "website",
    locale: "ko_KR",
    siteName: "WonPice (원피스)",
  },
  twitter: {
    card: "summary_large_image",
    title: "업종 맞춤 자사몰 솔루션 — 선착순 구축비 50% 프로모션 | WonPice",
    description:
      "플랫폼 판매 수수료 0%. 내 고객을 직접 소유하는 자사몰 제작부터 운영 관리까지.",
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
    name: "WonPice 업종 맞춤 자사몰 솔루션",
    alternateName: ["원피스", "WonPice", "몰스튜디오 자사몰 솔루션"],
    url: "https://wonpice.com",
    description:
      "오픈마켓 수수료 없이 내 브랜드를 키우는 업종 맞춤 자사몰 솔루션. 농가·식품 및 패션 쇼핑몰 제작, 2026 구축비 50% 프로모션.",
  };

  const jsonLdSoftware = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WonPice / 몰스튜디오 자사몰 솔루션",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Cloud Web",
    offers: {
      "@type": "Offer",
      price: "750000",
      priceCurrency: "KRW",
      description: "2026 농가·식품·패션 자사몰 선착순 구축비 50% 할인 프로모션 (스타터 75만 원, 비즈니스 150만 원)",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "자사몰 오픈까지 제작 기간은 얼마나 걸리나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "계약일로부터 보통 3~5주가 소요됩니다. 가장 시간이 소요되는 토스페이먼츠 전자결제(PG) 가맹 심사(1~2주)를 계약 직후 우선 접수 대행해 드리므로 오픈 지연을 최소화합니다.",
        },
      },
      {
        "@type": "Question",
        name: "스마트스토어나 카페24에서 기존 상품을 옮길 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 가능합니다. 기존 운영 중인 쇼핑몰의 상품 목록을 엑셀로 전달해 주시면 비즈니스 요금제 기준 최대 100개까지 상품명, 옵션, 상세 이미지 일괄 등록을 무상 대행해 드립니다.",
        },
      },
      {
        "@type": "Question",
        name: "결제 수수료는 어떻게 정산되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "고객사 명의로 토스페이먼츠와 직접 가맹 계약을 체결합니다. 매출 정산과 수수료(카드 2~3%대)는 고객사와 PG사 간에 직접 투명하게 이뤄지며, 당사는 일체의 판매 중개 수수료를 받지 않습니다.",
        },
      },
      {
        "@type": "Question",
        name: "서버가 멈추거나 장애가 발생하면 어떻게 대응하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "10분마다 서울, 미국, 유럽 3개 거점에서 쇼핑몰 접속 상태를 자동 감시합니다. 이상 발생 시 전담 기술팀이 실시간 알림을 받아 즉각 조치하며, 데이터베이스는 매일 새벽 자동 백업되어 특정 시점으로 즉시 복구 가능합니다.",
        },
      },
      {
        "@type": "Question",
        name: "계약을 종료할 경우 쇼핑몰 데이터는 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "주문, 회원, 상품 데이터를 엑셀 파일로 온전히 반환해 드리며, 서버 내 데이터는 개인정보보호법에 따라 안전하게 영구 파기됩니다.",
        },
      },
    ],
  };

  return (
    <html lang="ko" className={`h-full antialiased scroll-smooth ${robotoFlex.variable}`}>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftware) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
        {children}
      </body>
    </html>
  );
}
