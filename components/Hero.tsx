import { ArrowDown, ExternalLink, Heart, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-28 sm:pt-36 sm:pb-36 border-b border-[#e8eaed]">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#f1f3f4] border border-[#dadce0] text-[#3c4043] text-xs sm:text-sm font-medium mb-10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1e8e3e]" />
          <span>농가 온라인 판로 독립 가이드 — Google Store 스케일 에디션</span>
        </div>

        {/* Primary SEO Heading (H1) with Big Google Headline Scale */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal text-[#202124] tracking-tight leading-[1.12] mb-8">
          농산물의 가치를 온전히 지키는,
          <br className="hidden sm:inline" />
          <span className="text-[#137333] font-medium">
            {" "}가장 정직하고 올바른 선택
          </span>
        </h1>

        {/* Subtitle with Generous Scale */}
        <p className="max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-[#5f6368] leading-relaxed mb-12 sm:mb-16 font-normal">
          최저가 가격 경쟁에 땀방울을 던지지 마세요.
          <br className="hidden md:inline" />
          정성껏 기른 농산물의 진정한 가치를 알고 제값을 지불하는 평생 단골을 만납니다.
          <br className="hidden md:inline" />
          스마트스토어로 신규 고객을 만나고, 자사몰로 평생 단골을 지키는 현실적인 직거래 솔루션입니다.
        </p>

        {/* Actions with Large Google Store Pill Sizing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 sm:mb-24">
          <a
            href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-base transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>농가 전용 쇼핑몰 '제철곳간' 데모 체험</span>
            <ExternalLink className="w-4.5 h-4.5 opacity-80" />
          </a>

          <a
            href="#philosophy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#202124] font-medium text-base border border-[#dadce0] transition-all cursor-pointer"
          >
            <span>직거래 가이드 읽어보기</span>
            <ArrowDown className="w-4.5 h-4.5 opacity-60" />
          </a>
        </div>

        {/* 3 Core Pillars in 1280px Scale */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto text-left">
          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mb-6">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">농부의 이름이 남는 공간</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              최저가 알고리즘의 익명 판매가 아닌, 내 농장의 스토리와 진심을 온전히 담아내는 독립 쇼핑몰을 소유합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">매년 다시 찾는 평생 단골</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              플랫폼에 가려졌던 고객 연락처를 농가가 직접 소유하여, 매년 제철 수확 때마다 광고비 없이 선주문 완판을 달성합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-9 sm:p-11 rounded-[36px] border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-12 h-12 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-[#202124] text-xl sm:text-2xl mb-3">2026 농가 구축비 50% 지원</h3>
            <p className="text-sm sm:text-base text-[#5f6368] leading-relaxed">
              상품 등록 대행부터 토스 결제 연동, 도메인 연결까지 원스톱으로 지원하며 선착순 50% 구축비 감면 혜택이 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
