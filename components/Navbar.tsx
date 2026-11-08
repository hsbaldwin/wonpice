"use client";

import Link from "next/link";
import { Store, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#dadce0]">
      {/* Top Banner Notice */}
      <div className="bg-[#f8f9fa] text-[#3c4043] text-xs sm:text-sm py-2.5 px-6 text-center border-b border-[#e8eaed] flex items-center justify-center gap-2.5">
        <span className="inline-flex items-center gap-1.5 bg-[#e6f4ea] text-[#137333] px-3 py-0.5 rounded-full text-xs font-medium border border-[#ceead6]">
          2026 프로모션
        </span>
        <span className="font-normal">업종 맞춤 자사몰 제작 선착순 구축비 50% 프로모션 접수 중</span>
        <a
          href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_topbanner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1a73e8] hover:text-[#174ea6] font-medium inline-flex items-center gap-1 ml-1.5 hidden sm:inline-flex"
        >
          <span>자세히 보기</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#202124] text-white flex items-center justify-center font-medium text-sm group-hover:scale-105 transition-transform">
            <Store className="w-4.5 h-4.5 text-[#ceead6]" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-xl text-[#202124] tracking-tight">WonPice</span>
            <span className="text-xs font-medium text-[#5f6368] border-l border-[#dadce0] pl-2.5 hidden sm:inline">
              업종 맞춤 자사몰 솔루션
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-[#5f6368]">
          <a
            href="#features"
            className="px-4 py-2 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            솔루션 강점
          </a>
          <a
            href="#showcase"
            className="px-4 py-2 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            업종별 라이브 데모
          </a>
          <a
            href="#infrastructure"
            className="px-4 py-2 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            제공 인프라
          </a>
          <a
            href="#pricing"
            className="px-4 py-2 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
          >
            요금제 &amp; 50% 혜택
          </a>
          <a
            href="#faq"
            className="px-4 py-2 rounded-full hover:text-[#202124] hover:bg-[#f1f3f4] transition-colors"
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
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium bg-[#202124] hover:bg-[#3c4043] text-white px-6 py-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:shadow-sm"
          >
            <span>50% 프로모션 신청</span>
            <ExternalLink className="w-4 h-4 opacity-80" />
          </a>
        </div>
      </div>
    </header>
  );
}
