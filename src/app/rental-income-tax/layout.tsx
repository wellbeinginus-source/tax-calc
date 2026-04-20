import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "임대소득세 계산기 — 분리과세·종합과세 비교 무료 계산 | 부동산 세금 계산기",
  description: "주택 임대소득에 대한 소득세를 분리과세와 종합과세로 비교 계산합니다. 연 2,000만원 이하 임대소득자를 위한 2026년 기준 무료 계산기.",
  keywords: ["임대소득세 계산기", "임대소득세", "분리과세", "종합과세", "주택 임대소득"],
  openGraph: {
    title: "임대소득세 계산기 — 분리과세 vs 종합과세 비교",
    description: "임대 수입 입력하면 분리·종합과세 비교 계산. 무료.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
