import WebAppContainer from "@/components/WebAppContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "수제 식품·밀키트 온라인 판로 개척 가이드 — 전국 택배 직판로 구축법 | WonPice",
  description:
    "동네 매장 한계를 넘어 전국 단골을 확보하는 수제 식품·밀키트 온라인 판로 개척 실전 가이드. 배달앱 수수료에서 벗어나 자사몰로 마진을 지키는 법.",
  keywords: [
    "수제 식품 온라인 판로 개척",
    "밀키트 쇼핑몰 제작",
    "식품 자사몰 구축 지원",
    "반찬 배송 쇼핑몰 만들기",
    "로컬 맛집 택배 판매",
    "가게지기",
  ],
};

export default function FoodChannelPage() {
  return <WebAppContainer initialTab="food" />;
}
