import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import DualIndustryShowcase from "@/components/DualIndustryShowcase";
import SolutionInfrastructure from "@/components/SolutionInfrastructure";
import SolutionPricing from "@/components/SolutionPricing";
import SolutionFaq from "@/components/SolutionFaq";
import Footer from "@/components/Footer";
import { PartnerModalProvider } from "@/components/PartnerModalContext";
import PartnerApplicationModal from "@/components/PartnerApplicationModal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "패션 브랜드·자체제작 의류 자사몰 솔루션 mord — 2026 자사몰 구축비 50% 프로모션 | WonPice",
  description:
    "에이블리·지그재그 수수료를 넘어 브랜드의 핏과 감성을 온전히 살리는 패션 전문 자사몰 솔루션 mord. 세로형 룩북, 사이즈 가이드, 50% 프로모션 안내.",
};

export default function FashionChannelPage() {
  return (
    <PartnerModalProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
        <Navbar />
        <main className="flex-1">
          <SolutionHero />
          <DualIndustryShowcase initialIndustry="fashion" />
          <SolutionInfrastructure />
          <SolutionPricing />
          <SolutionFaq />
        </main>
        <Footer />
        <PartnerApplicationModal />
      </div>
    </PartnerModalProvider>
  );
}
