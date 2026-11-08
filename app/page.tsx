import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValueStory from "@/components/ValueStory";
import ConnectionMethod from "@/components/ConnectionMethod";
import StoreShowcase from "@/components/StoreShowcase";
import SupportProgram from "@/components/SupportProgram";
import FarmFaq from "@/components/FarmFaq";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "농산물 직거래 쇼핑몰 제작 — 공판장 헐값과 수수료를 넘는 농가의 올바른 선택 | WonPice",
  description:
    "최저가 가격 경쟁에서 벗어나 내 농산물의 제값을 받는 가장 올바른 선택. 농산물 직거래 쇼핑몰 제작, 스마트스토어 병행 및 D2C 단골 전환 실전 가이드. 2026 농가 맞춤 자사몰 구축비 50% 지원 혜택 안내.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124] font-sans selection:bg-[#e8f0fe] selection:text-[#1a73e8]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ValueStory />
        <ConnectionMethod />
        <StoreShowcase />
        <SupportProgram />
        <FarmFaq />
      </main>
      <Footer />
    </div>
  );
}
