import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DiagnosticSection from "@/components/DiagnosticSection";
import ChannelHubSection from "@/components/ChannelHubSection";
import GuideSection from "@/components/GuideSection";
import GagejigiShowcase from "@/components/GagejigiShowcase";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <DiagnosticSection />
        </div>
        <ChannelHubSection />
        <GuideSection />
        <GagejigiShowcase />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}
