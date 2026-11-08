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
  title: "수제 식품·농산물 온라인 직거래 쇼핑몰 제작 가이드 | WonPice",
  description:
    "배달앱 및 오픈마켓 수수료를 넘어, 전국 단골을 확보하는 수제 식품·산지직송 온라인 판로 개척 실전 가이드. 2026 자사몰 구축비 50% 프로모션 안내.",
  keywords: [
    "수제 식품 온라인 판로 개척",
    "밀키트 쇼핑몰 제작",
    "식품 자사몰 구축 지원",
    "농산물 직거래 쇼핑몰",
    "가게지기",
  ],
};

export default function FoodChannelPage() {
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
