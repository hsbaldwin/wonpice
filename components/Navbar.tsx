"use client";

import Link from "next/link";
import { Wheat, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#dadce0]">
      {/* Top Banner Notice */}
      <div className="bg-[#f8f9fa] text-[#3c4043] text-xs py-2 px-4 text-center border-b border-[#e8eaed] flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-[#e6f4ea] text-[#137333] px-2.5 py-0.5 rounded-full text-[11px] font-medium border border-[#ceead6]">
          2026 지원 사업
        </span>
        <span>농가 맞춤형 직거래 쇼핑몰 선착순 구축비 50% 지원 접수 중</span>
        <a
          href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_topbanner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a73e8] hover:text-[#174ea6] font-medium inline-flex items-center gap-0.5 ml-1 hidden sm:inline-flex"
        >
          <span>신청 안내</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#202124] text-white flex items-center justify-center font-medium text-sm group-hover:scale-105 transition-transform">
            <Wheat className="w-4 h-4 text-[#ceead6]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg text-[#202124] tracking-tight">WonPice</span>
            <span className="text-[11px] font-medium text-[#5f6368] hidden sm:inline">
              농가 직거래 판로 가이드
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-2 text-xs font-medium text-[#5f6368]">
          <a
            href="#philosophy"
            className="px-3.5 py-1.5 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            가치와 철학
          </a>
          <a
            href="#connection"
            className="px-3.5 py-1.5 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            단골 연결 공식
          </a>
          <a
            href="#showcase"
            className="px-3.5 py-1.5 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            쇼핑몰 쇼케이스
          </a>
          <a
            href="#support"
            className="px-3.5 py-1.5 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            50% 지원 혜택
          </a>
          <a
            href="#faq"
            className="px-3.5 py-1.5 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_nav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#202124] hover:bg-[#3c4043] text-white px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-xs"
          >
            <span>50% 지원 신청</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  );
}
