import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "취득세 계산기 | 부동산 취득세·지방교육세·농어촌특별세 계산",
  description:
    "부동산 취득가액을 입력하면 취득세, 지방교육세, 농어촌특별세를 자동 계산합니다. 1주택·2주택·3주택 이상·상가·토지 세율 모두 지원. 경매 낙찰가 기준 계산 가능.",
  keywords: [
    "취득세 계산기",
    "부동산 취득세",
    "취득세율",
    "다주택 취득세",
    "경매 취득세",
    "지방교육세",
    "농어촌특별세",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
