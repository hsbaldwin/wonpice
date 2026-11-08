import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import DualIndustryShowcase from "@/components/DualIndustryShowcase";
import SolutionInfrastructure from "@/components/SolutionInfrastructure";
import SolutionPricing from "@/components/SolutionPricing";
import SolutionFaq from "@/components/SolutionFaq";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "업종 맞춤 자사몰 솔루션 — 오픈마켓 수수료 없이 내 브랜드를 키우는 자사몰 제작 | WonPice",
  description:
    "스마트스토어·오픈마켓 수수료 없이 내 브랜드를 키우는 업종 맞춤형 자사몰 솔루션. 식품·농가('제철곳간')부터 패션('온결')까지. 테마 제작, 상품 100개 등록 대행, 결제 연동 3~5주 완성. 2026 선착순 구축비 50% 할인 프로모션.",
};

export default function Home() {
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
