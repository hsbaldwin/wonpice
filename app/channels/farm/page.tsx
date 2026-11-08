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
  title: "농가·산지직송 자사몰 솔루션 — 2026 선착순 구축비 50% 프로모션 | WonPice",
  description:
    "공판장 헐값 경매와 스마트스토어 수수료를 넘어, 내 농산물의 제값을 받는 농가 맞춤형 자사몰 솔루션. 중량 옵션, 당일 출고 마감, 50% 프로모션 안내.",
};

export default function FarmChannelPage() {
  return (
    <PartnerModalProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
        <Navbar />
        <main className="flex-1">
          <SolutionHero />
          <DualIndustryShowcase initialIndustry="food" />
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
