import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "종합부동산세 계산기 | 종부세 계산 2026년 최신 세율",
  description:
    "주택 공시가격 합산액으로 종합부동산세를 무료로 계산하세요. 1세대1주택 12억 공제, 2주택, 3주택 이상, 법인 세율 지원. 농어촌특별세 포함. 2026년 기준.",
  keywords: [
    "종합부동산세 계산기",
    "종부세 계산기",
    "종부세 세율",
    "종부세 공제",
    "부동산 보유세",
    "1세대1주택 종부세",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
