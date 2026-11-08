import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WonPice (원피스) — 쇼핑몰 독립 & 올바른 선택 자가진단",
  description:
    "최저가 출혈 경쟁에서 벗어나 내 브랜드를 지키는 올바른 선택. 스마트스토어·쿠팡 셀러를 위한 자사몰 독립 적합도 및 수수료 절감 자가진단 리포트.",
  keywords: [
    "자사몰 스마트스토어 병행",
    "자사몰 오픈 시기",
    "쇼핑몰 독립 자가진단",
    "농가 자사몰",
    "식품 자사몰",
    "패션 자사몰",
    "스마트스토어 수수료 절감",
    "가게지기",
    "원피스",
    "wonpice",
  ],
  openGraph: {
    title: "WonPice — 쇼핑몰 독립 & 올바른 선택 자가진단",
    description: "최저가 경쟁에 휘둘리지 않고, 내 가게의 가치를 지키는 올바른 선택",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">{children}</body>
    </html>
  );
}
