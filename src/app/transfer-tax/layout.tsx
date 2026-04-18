import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "양도소득세 계산기 | 부동산 양도세·장기보유공제·1세대1주택 비과세",
  description:
    "부동산 양도소득세를 무료로 계산하세요. 매도가·취득가·보유기간을 입력하면 양도세, 장기보유특별공제, 지방소득세까지 자동 계산. 1세대1주택 비과세·다주택 중과 지원.",
  keywords: [
    "양도소득세 계산기",
    "양도세 계산기",
    "장기보유특별공제",
    "1세대1주택 비과세",
    "부동산 양도세",
    "다주택 양도세",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
