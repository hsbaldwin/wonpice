import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FarmMarginCalculator from "@/components/FarmMarginCalculator";
import FarmD2cGuide from "@/components/FarmD2cGuide";
import FarmFeaturesShowcase from "@/components/FarmFeaturesShowcase";
import FarmReadinessDiagnostic from "@/components/FarmReadinessDiagnostic";
import PromotionBridge from "@/components/PromotionBridge";
import FarmFaq from "@/components/FarmFaq";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "농가·산지직송 온라인 직거래 쇼핑몰 제작 가이드 | WonPice",
  description:
    "공판장 헐값 경매와 스마트스토어 수수료를 넘어, 내 농산물의 제값을 받는 농가 직거래 온라인 판로 개척 실전 가이드. 선착순 농가 자사몰 50% 프로모션 안내.",
  keywords: [
    "농가 온라인 판로 개척",
    "농산물 직거래 쇼핑몰 제작",
    "산지직송 쇼핑몰 만들기",
    "농가 자사몰 구축 지원",
    "과일 직거래 사이트",
    "농가 스마트스토어 수수료",
    "가게지기",
  ],
};

export default function FarmChannelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FarmMarginCalculator />
        <FarmD2cGuide />
        <FarmFeaturesShowcase />
        <FarmReadinessDiagnostic />
        <PromotionBridge />
        <FarmFaq />
      </main>
      <Footer />
    </div>
  );
}
