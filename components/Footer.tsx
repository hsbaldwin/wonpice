import Link from "next/link";
import { Wheat, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f8f9fa] text-[#5f6368] text-xs py-16 border-t border-[#dadce0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#dadce0]">
          {/* Brand Info (6 cols) */}
          <div className="md:col-span-6 space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#202124] text-white flex items-center justify-center font-medium text-sm">
                <Wheat className="w-4 h-4 text-[#ceead6]" />
              </div>
              <span className="font-semibold text-lg text-[#202124] tracking-tight">WonPice</span>
              <span className="text-[11px] text-[#137333] bg-[#e6f4ea] px-2.5 py-0.5 rounded-full border border-[#ceead6] font-medium">
                농가 온라인 판로개척 센터
              </span>
            </div>

            <p className="text-[#5f6368] text-xs leading-relaxed max-w-md">
              WonPice는 땀 흘려 농사지은 농산물이 최저가 출혈 경쟁이나 공판장 헐값 시세에 휘둘리지 않고, 
              정당한 제값과 평생 단골을 확보할 수 있도록 <strong>‘올바른 선택에 의한 승리’</strong>를 돕는 실전 가이드 센터입니다.
            </p>

            <div className="text-[11px] text-[#5f6368] pt-1">
              파트너십: 가게지기(몰스튜디오) 2026 농가 자사몰 50% 지원 공식 연계
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-medium text-[#202124] text-xs tracking-wider uppercase">
              실전 가이드 목차
            </div>
            <ul className="space-y-2 text-[#5f6368]">
              <li>
                <a href="#calculator" className="hover:text-[#202124] transition-colors">
                  수수료 &amp; 순익 시뮬레이터
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-[#202124] transition-colors">
                  직거래 4단계 로드맵 (상자 편지)
                </a>
              </li>
              <li>
                <a href="#diagnostic" className="hover:text-[#202124] transition-colors">
                  1분 판로 독립 자가진단기
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-[#202124] transition-colors">
                  농가 쇼핑몰 3대 필수 기능
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#202124] transition-colors">
                  농업인 실무 FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* External Partners (3 cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-medium text-[#202124] text-xs tracking-wider uppercase">
              연계 서비스 &amp; 데모
            </div>
            <ul className="space-y-2 text-[#5f6368]">
              <li>
                <a
                  href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_footer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#202124] transition-colors flex items-center gap-1"
                >
                  <span>가게지기(몰스튜디오) 50% 지원</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://shop-demo-food-store-950864605215.asia-northeast3.run.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#202124] transition-colors flex items-center gap-1"
                >
                  <span>'제철곳간' 라이브 데모 쇼핑몰</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#5f6368] text-[11px]">
          <div>
            © 2026 WonPice. All rights reserved. 올바른 선택에 의한 승리를 응원합니다.
          </div>
          <div className="flex items-center gap-3">
            <span>농가 D2C 직거래</span>
            <span>•</span>
            <span>수수료 절감 시뮬레이션</span>
            <span>•</span>
            <span>구글 스토어 에디션</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
