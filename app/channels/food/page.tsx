import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import DualIndustryShowcase from "@/components/DualIndustryShowcase";
import SolutionInfrastructure from "@/components/SolutionInfrastructure";
import SolutionPricing from "@/components/SolutionPricing";
import SolutionFaq from "@/components/SolutionFaq";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수제 식품·신선식품 자사몰 솔루션 — 2026 선착순 구축비 50% 프로모션 | WonPice",
  description:
    "오픈마켓 수수료 없이 전국 단골을 확보하는 식품 전용 자사몰 솔루션. 중량 옵션, 오늘 출고 마감, 냉장 배송 안내. 50% 프로모션 안내.",
};

export default function FoodChannelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
      <Navbar />
      <main className="flex-1">
        <SolutionHero />
        <DualIndustryShowcase />
        <SolutionInfrastructure />
        <SolutionPricing />
        <SolutionFaq />
      </main>
      <Footer />
    </div>
  );
}
