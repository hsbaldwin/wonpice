import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Shirt, ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "패션 브랜드 온라인 판로 개척 & 자사몰 가이드 | WonPice",
  description:
    "에이블리·지그재그의 최저가 출혈 경쟁을 넘어, 내 브랜드 고유의 감성과 핏을 온전히 제값 받는 패션 자사몰 독립 가이드.",
};

export default function FashionChannelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans">
      <Navbar />
      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
            <Shirt className="w-3.5 h-3.5" />
            <span>패션 브랜드 자사몰 독립 가이드</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-snug">
            에이블리·지그재그 최저가 경쟁을 넘어,
            <br />
            <span className="text-indigo-600">내 브랜드의 가치를 지키는 독립 자사몰</span>
          </h1>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            가격 비교 알고리즘에 핏과 감성이 묻히지 않도록, 세로형 착용컷과 사이즈 가이드가 최적화된 패션 전문 자사몰을 구축하세요.
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-xs text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="font-bold text-stone-900 text-sm">패션 특화 쇼핑몰 '온결' 라이브 데모</span>
              <span className="text-xs text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded">
                세로형 룩북 테마
              </span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              가게지기(몰스튜디오)가 지원하는 패션 전용 테마를 통해 고화질 모델 착용컷 전환, 체형별 실측 사이즈표, 신축성·비침 가이드가 완비된 쇼핑몰을 미리 체험해 보실 수 있습니다.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="https://shop-store-950864605215.asia-northeast3.run.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
              >
                <span>패션 '온결' 데모 쇼핑몰 체험 ↗</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs sm:text-sm transition-all"
              >
                <span>농가·식품 50% 지원 메인 가이드 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
