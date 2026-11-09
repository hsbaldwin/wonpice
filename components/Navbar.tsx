"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-xl border-b border-slate-200/80 transition-colors">
      {/* Top Announcement Banner */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-6 text-center border-b border-cyan-900/40 flex items-center justify-center gap-2 sm:gap-2.5 relative overflow-hidden">
        <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-pulse" />
        <span className="inline-flex items-center gap-1.5 bg-cyan-950/80 text-cyan-300 px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-medium border border-cyan-500/40 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          2026 프로모션
        </span>
        <span className="font-normal truncate sm:overflow-visible text-slate-200">
          mord 업종 맞춤 자사몰 제작 구축비 50% 프로모션 접수 중
        </span>
        <a
          href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_topbanner"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-1 ml-1.5 hidden sm:inline-flex shrink-0 font-mono text-xs neon-text-cyan transition-all"
        >
          <span>자세히 보기</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          aria-label="mord (WonPice) 홈으로 이동"
          className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-slate-950 text-cyan-300 flex items-center justify-center rounded-xl group-hover:scale-105 transition-all shrink-0 font-mono font-bold text-sm tracking-tighter shadow-[0_0_15px_rgba(6,182,212,0.4)] ring-1 ring-cyan-500/50 group-hover:shadow-[0_0_22px_rgba(6,182,212,0.7)]">
            m
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight font-sans group-hover:text-cyan-600 transition-colors">
              mord
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase border-l border-slate-200 pl-2.5 hidden sm:inline font-mono">
              WonPice
            </span>
            <span className="text-xs font-medium text-slate-500 border-l border-slate-200 pl-2.5 hidden lg:inline">
              업종 맞춤 자사몰 솔루션
            </span>
          </div>
        </Link>

        {/* Desktop GNB Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 tracking-tight"
          >
            솔루션
          </a>
          <a
            href="#showcase"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 tracking-tight"
          >
            라이브 데모
          </a>
          <a
            href="#infrastructure"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 tracking-tight"
          >
            인프라
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 tracking-tight"
          >
            요금제
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 tracking-tight"
          >
            FAQ
          </a>
        </nav>

        {/* Navigation CTA & Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_nav"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-all cursor-pointer shadow-xs hover:shadow text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap tracking-tight ring-1 ring-slate-800"
          >
            <span>50% 프로모션 신청</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="메뉴 열기"
            className="md:hidden p-2 rounded-full hover:bg-[#f1f3f4] text-[#202124] transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Navigation Drawer */}
    {isMobileMenuOpen && (
      <div
          data-testid="mobile-drawer"
          role="dialog"
          aria-label="모바일 메뉴"
          aria-modal="true"
          className="fixed inset-0 z-50 md:hidden"
        >
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-in panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[290px] sm:w-[320px] max-w-[85vw] bg-white shadow-2xl flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-200">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#dadce0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#202124] text-white flex items-center justify-center font-bold text-sm tracking-tighter shadow-xs">
                    m
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-[#202124] tracking-tight font-sans">mord</span>
                    <span className="text-[11px] font-semibold text-[#5f6368] uppercase border-l border-[#dadce0] pl-2">WonPice</span>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="닫기"
                  data-testid="partner-modal-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-[#f1f3f4] text-[#5f6368] hover:text-[#202124] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Anchor Links */}
              <nav className="flex flex-col py-6 space-y-4">
                <a
                  href="#features"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#3c4043] hover:text-[#1a73e8] transition-colors py-1.5"
                >
                  솔루션
                </a>
                <a
                  href="#showcase"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#3c4043] hover:text-[#1a73e8] transition-colors py-1.5"
                >
                  라이브 데모
                </a>
                <a
                  href="#infrastructure"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#3c4043] hover:text-[#1a73e8] transition-colors py-1.5"
                >
                  인프라
                </a>
                <a
                  href="#pricing"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#3c4043] hover:text-[#1a73e8] transition-colors py-1.5"
                >
                  요금제
                </a>
                <a
                  href="#faq"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-[#3c4043] hover:text-[#1a73e8] transition-colors py-1.5"
                >
                  FAQ
                </a>
              </nav>
            </div>

            {/* Drawer Footer CTA */}
            <div className="pt-6 border-t border-[#dadce0]">
              <a
                href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_nav"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#1a73e8] hover:bg-[#1557b0] active:bg-[#174ea6] text-white py-3 px-4 rounded-full font-medium text-sm transition-all shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-2"
              >
                <span>50% 프로모션 신청</span>
                <ExternalLink className="w-4 h-4 opacity-90" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
