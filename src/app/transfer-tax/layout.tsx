import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "양도소득세 계산기 — 2026년 최신 세율 무료 계산 | 부동산 세금 계산기",
  description: "부동산 매도 시 양도소득세를 무료로 계산하세요. 1세대 1주택 비과세, 장기보유특별공제, 다주택 중과세율까지 2026년 기준으로 자동 계산합니다.",
  keywords: ["양도소득세 계산기", "양도세 계산", "부동산 양도세", "1세대1주택 비과세", "장기보유특별공제"],
  openGraph: {
    title: "양도소득세 계산기 — 2026년 최신 세율",
    description: "매도가·취득가·보유기간 입력하면 양도세 자동 계산. 무료.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
