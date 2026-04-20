import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "취득세 계산기 — 부동산 취득세·지방교육세 무료 계산 | 부동산 세금 계산기",
  description: "부동산 매매·경매 취득 시 취득세를 무료로 계산하세요. 주택 수·조정대상지역 여부에 따른 세율, 지방교육세·농어촌특별세까지 자동 계산합니다.",
  keywords: ["취득세 계산기", "부동산 취득세", "취득세율", "경매 취득세", "취득세 계산"],
  openGraph: {
    title: "취득세 계산기 — 매매가 기준 취득세 자동 계산",
    description: "주택 수·조정지역 선택하면 취득세 자동 계산. 무료.",
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
