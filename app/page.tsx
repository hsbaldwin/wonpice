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
  title: "농산물 직거래 쇼핑몰 제작 — 공판장 헐값과 수수료를 넘는 농가 온라인 판로개척 가이드 | WonPice",
  description:
    "최저가 출혈 경쟁에서 벗어나 내 농산물의 제값을 받는 가장 올바른 선택. 농산물 직거래 쇼핑몰 제작, 스마트스토어 수수료 절감 및 D2C 단골 전환 실전 가이드. 2026 농가 맞춤 자사몰 구축비 50% 지원 혜택 안내.",
};

export default function Home() {
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
