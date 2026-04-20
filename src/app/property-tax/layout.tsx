import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "종합부동산세 계산기 — 공시가격 기준 종부세 무료 계산 | 부동산 세금 계산기",
  description: "공시가격과 보유 주택 수를 입력하면 종합부동산세를 무료로 계산합니다. 1세대 1주택 특별공제, 세율 적용까지 2026년 기준으로 자동 계산합니다.",
  keywords: ["종합부동산세 계산기", "종부세 계산", "종부세 계산기", "부동산 세금", "공시가격"],
  openGraph: {
    title: "종합부동산세 계산기 — 공시가격 기준 종부세",
    description: "공시가격·주택수 입력하면 종부세 자동 계산. 무료.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
