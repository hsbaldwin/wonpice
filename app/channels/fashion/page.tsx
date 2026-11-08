import WebAppContainer from "@/components/WebAppContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "디자이너 패션·자체제작 온라인 판로 개척 가이드 — 브랜드 독립 자사몰 구축법 | WonPice",
  description:
    "에이블리·지그재그의 최저가 출혈 경쟁과 카피를 넘어, 내 브랜드 고유의 감성과 핏을 온전히 제값 받는 패션 온라인 자사몰 판로 개척 가이드.",
  keywords: [
    "패션 온라인 판로 개척",
    "디자이너 브랜드 자사몰 제작",
    "자체제작 의류 쇼핑몰 만들기",
    "에이블리 지그재그 수수료 절감",
    "의류 룩북 쇼핑몰",
    "가게지기",
  ],
};

export default function FashionChannelPage() {
  return <WebAppContainer initialTab="fashion" />;
}
