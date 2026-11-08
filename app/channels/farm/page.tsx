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
  title: "농가·산지직송 온라인 직거래 쇼핑몰 제작 가이드 | WonPice",
  description:
    "공판장 헐값 경매와 스마트스토어 수수료를 넘어, 내 농산물의 제값을 받는 농가 직거래 온라인 판로 개척 실전 가이드. 선착순 농가 자사몰 50% 프로모션 안내.",
  keywords: [
    "농가 온라인 판로 개척",
    "농산물 직거래 쇼핑몰 제작",
    "산지직송 쇼핑몰 만들기",
    "농가 자사몰 구축 지원",
    "과일 직거래 사이트",
    "가게지기",
  ],
};

export default function FarmChannelPage() {
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
