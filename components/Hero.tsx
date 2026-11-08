import { ArrowDown, ExternalLink, Heart, Users, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-20 pb-20 sm:pt-28 sm:pb-28 border-b border-[#e8eaed]">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f1f3f4] border border-[#dadce0] text-[#3c4043] text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#1e8e3e]" />
          <span>농가 온라인 판로 독립 가이드</span>
        </div>

        {/* Primary SEO Heading (H1) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal text-[#202124] tracking-tight leading-[1.2] mb-6">
          농산물의 가치를 온전히 지키는,
          <br className="hidden sm:inline" />
          <span className="text-[#137333] font-medium">
            {" "}가장 정직하고 올바른 선택
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5f6368] leading-relaxed mb-10 sm:mb-12 font-normal">
          최저가 가격 경쟁에 땀방울을 던지지 마세요.
          <br className="hidden sm:inline" />
          정성껏 기른 농산물의 진정한 가치를 알고 정가를 지불하는 단골을 만납니다.
          <br className="hidden sm:inline" />
          스마트스토어로 신규 고객을 만나고, 자사몰로 평생 단골을 지키는 현실적인 직거래 솔루션입니다.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <a
            href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#202124] hover:bg-[#3c4043] text-white font-medium text-sm transition-all cursor-pointer shadow-xs"
          >
            <span>농가 전용 쇼핑몰 '제철곳간' 데모 체험</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>

          <a
            href="#philosophy"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-[#f8f9fa] text-[#202124] font-medium text-sm border border-[#dadce0] transition-all cursor-pointer"
          >
            <span>직거래 가이드 읽어보기</span>
            <ArrowDown className="w-4 h-4 opacity-60" />
          </a>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-10 h-10 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center mb-4">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">농부의 이름이 남는 공간</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              최저가 알고리즘의 익명 판매가 아닌, 내 농장의 스토리와 진심을 온전히 담아내는 독립 쇼핑몰을 소유합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-10 h-10 rounded-full bg-[#fef7e0] text-[#b06000] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">매년 다시 찾는 평생 단골</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              플랫폼에 가려졌던 고객 연락처를 농가가 직접 소유하여, 매년 제철 수확 때마다 광고비 없이 선주문 완판을 달성합니다.
            </p>
          </div>

          <div className="bg-[#f8f9fa] p-7 rounded-3xl border border-[#e8eaed] transition-all hover:border-[#dadce0]">
            <div className="w-10 h-10 rounded-full bg-[#e8f0fe] text-[#1a73e8] flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-[#202124] text-base mb-1.5">2026 농가 구축비 50% 지원</h3>
            <p className="text-xs text-[#5f6368] leading-relaxed">
              상품 등록 대행부터 토스 결제 연동, 도메인 연결까지 원스톱으로 지원하며 선착순 50% 구축비 감면 혜택이 적용됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
