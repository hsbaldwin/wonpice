import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            W
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">WonPice</span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded">
                올바른 선택
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
              소상공인 쇼핑몰 독립 &amp; 자가진단 리포트
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_nav"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 px-3.5 py-2 rounded-lg transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>자사몰 파트너 &apos;가게지기&apos;</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>
      </div>
    </header>
  );
}
