"use client";

import Link from "next/link";
import { Wheat, Sparkles, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-800 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-emerald-700/80 px-2 py-0.5 rounded text-[11px] font-bold text-emerald-100">
          <Sparkles className="w-3 h-3 text-amber-300" /> 2026 특별 지원
        </span>
        <span>농산물·식품 생산 농가 자사몰 선착순 구축비 50% 감면 지원 접수 중</span>
        <a
          href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_topbanner"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-emerald-300 font-bold hover:text-amber-200 transition-colors hidden sm:inline"
        >
          상세 확인 ↗
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-emerald-700 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            <Wheat className="w-5 h-5 text-amber-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-stone-900 tracking-tight">WonPice</span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300/60 px-1.5 py-0.5 rounded">
                농가 판로개척 센터
              </span>
            </div>
            <span className="text-[11px] text-stone-500 font-medium hidden sm:block">
              농산물 직거래 쇼핑몰 제작 &amp; D2C 실전 가이드
            </span>
          </div>
        </Link>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold text-stone-600">
          <a
            href="#calculator"
            className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            수수료·순익 계산기
          </a>
          <a
            href="#roadmap"
            className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            직거래 4단계 로드맵
          </a>
          <a
            href="#features"
            className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            농가 쇼핑몰 3대 필수 기능
          </a>
          <a
            href="#diagnostic"
            className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            1분 판로 진단기
          </a>
          <a
            href="#faq"
            className="px-3 py-1.5 rounded-lg hover:text-emerald-800 hover:bg-emerald-50 transition-colors"
          >
            실무 FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_nav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl shadow-xs transition-all hover:shadow-md cursor-pointer"
          >
            <span>50% 지원 혜택 신청</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  );
}
