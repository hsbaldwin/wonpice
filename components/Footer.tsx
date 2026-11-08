import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-base mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs">
              W
            </span>
            <span>WonPice (원피스)</span>
          </div>
          <p className="text-slate-400 text-xs max-w-md leading-relaxed">
            WonPice는 소상공인과 생산자가 플랫폼의 가격 출혈 경쟁에 매몰되지 않고,
            자신의 가치와 단골을 온전히 지켜내는 <strong>&apos;올바른 선택에 의한 승리(Victory by the Right Choice)&apos;</strong>를 응원하는 가이드 서비스입니다.
          </p>
          <div className="text-slate-400 text-[11px] mt-4">
            © 2026 WonPice. All rights reserved.
          </div>
        </div>

        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="text-[11px] font-semibold text-slate-300">
            소상공인 자사몰 전문 파트너
          </div>
          <a
            href="https://shop-site-950864605215.asia-northeast3.run.app?ref=wonpice_footer"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>가게지기 공식 사이트 방문하기</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
