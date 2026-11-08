import WebAppContainer from "@/components/WebAppContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WonPice (원피스) — 소상공인·농가 온라인 판로 개척 웹앱 가이드",
  description:
    "최저가 출혈 경쟁에서 벗어나 내 브랜드를 지키는 올바른 선택. 스마트스토어·쿠팡 셀러를 위한 자사몰 독립 적합도 및 수수료 절감 실시간 웹앱 진단기.",
};

export default function Home() {
  return <WebAppContainer initialTab="diagnostic" />;
}
