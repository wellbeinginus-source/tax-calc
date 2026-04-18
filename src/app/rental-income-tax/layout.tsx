import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "임대소득세 계산기 | 주택 임대소득 종합·분리과세 계산",
  description:
    "연간 임대 수입을 입력하면 임대소득세를 자동 계산합니다. 2천만원 이하 분리과세(14%)·종합과세 선택 비교, 필요경비 공제 지원. 1주택·2주택 임대 소득세 계산.",
  keywords: [
    "임대소득세 계산기",
    "주택 임대소득세",
    "임대소득 분리과세",
    "임대소득 종합과세",
    "월세 소득세",
    "임대사업자 세금",
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
