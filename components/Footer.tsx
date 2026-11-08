import { Store, ExternalLink, ShieldCheck, Server, RefreshCw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-[#5f6368] text-xs sm:text-sm py-20 sm:py-24 border-t border-[#dadce0]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* 4-Column Google Store Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-[#dadce0]">
          {/* Col 1: Brand & Mission (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1a73e8] text-white flex items-center justify-center font-medium text-base shrink-0 shadow-xs">
                <Store className="w-4.5 h-4.5 text-white" />
              </div>
              <span className="font-semibold text-xl text-[#202124] tracking-tight">WonPice</span>
              <span className="text-xs text-[#1a73e8] bg-[#e8f0fe] px-3 py-1 rounded-full border border-[#d2e3fc] font-medium shrink-0">
                업종 맞춤 자사몰 솔루션
              </span>
            </div>

            <p className="text-[#5f6368] text-sm leading-relaxed max-w-sm">
              WonPice는 플랫폼의 과도한 중개 수수료와 알고리즘 종속에서 벗어나, 
              내 브랜드만의 독립된 자사몰을 통해 고객을 직접 소유하고 성장할 수 있도록 돕는 <strong>업종 맞춤형 쇼핑몰 제작 및 운영 관리 솔루션</strong>입니다.
            </p>

            <div className="text-xs text-[#5f6368] pt-1">
              공식 솔루션 파트너십: 몰스튜디오(가게지기) 2026 자사몰 구축비 50% 프로모션 공식 연계
            </div>
          </div>

          {/* Col 2: Solution Navigation (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-3">
            <div className="font-medium text-[#202124] text-sm tracking-wider uppercase">
              솔루션 안내
            </div>
            <ul className="space-y-2.5 text-[#5f6368] text-sm">
              <li>
                <a href="#features" className="hover:text-[#202124] transition-colors">
                  솔루션 핵심 강점
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-[#202124] transition-colors">
                  업종별 라이브 데모 (식품/패션)
                </a>
              </li>
              <li>
                <a href="#infrastructure" className="hover:text-[#202124] transition-colors">
                  제공 기술 인프라 4선
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#202124] transition-colors">
                  2026 구축비 50% 요금제
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#202124] transition-colors">
                  자주 묻는 질문 (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Live Demos & Outbound (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-medium text-[#202124] text-sm tracking-wider uppercase">
              라이브 데모 쇼핑몰
            </div>
            <ul className="space-y-2.5 text-[#5f6368] text-sm">
              <li>
                <a
                  href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#202124] transition-colors flex items-center gap-1.5"
                >
                  <span>식품 · 농가 &apos;제철곳간&apos; 데모</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://shop-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#202124] transition-colors flex items-center gap-1.5"
                >
                  <span>패션 · 브랜드 &apos;온결&apos; 데모</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#202124] transition-colors flex items-center gap-1.5 text-[#1a73e8]"
                >
                  <span>가게지기 공식 50% 신청서</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Trust (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="font-medium text-[#202124] text-sm tracking-wider uppercase">
              기술 지원 &amp; 보안
            </div>
            <ul className="space-y-2.5 text-[#5f6368] text-sm">
              <li className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#1a73e8] shrink-0" />
                <span>3개 거점 실시간 가동률 모니터링</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1e8e3e] shrink-0" />
                <span>토스페이먼츠 직계약 (판매 수수료 0%)</span>
              </li>
              <li className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#1a73e8] shrink-0" />
                <span>매일 새벽 자동 DB 백업 &amp; 시점 복구</span>
              </li>
              <li className="text-xs text-[#5f6368] pt-1 leading-relaxed">
                안정적 기술 지원 및 계약 종료 시 고객 데이터 엑셀 파일 안전 반환
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row: Legal & Copyright & Trust Marks */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-4 text-[#5f6368] text-xs sm:text-sm">
          <div>
            © 2026 WonPice &amp; MallStudio. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
            <span>업종 맞춤 자사몰 솔루션</span>
            <span>•</span>
            <span className="font-medium text-[#137333]">판매 수수료 0%</span>
            <span>•</span>
            <span className="font-medium text-[#1a73e8]">50% 구축비 프로모션</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
