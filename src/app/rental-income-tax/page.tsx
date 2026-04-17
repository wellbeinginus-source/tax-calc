"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";

// 종합소득세 누진세율
const BRACKETS = [
  { limit: 1400, rate: 6, cumDeduct: 0 },
  { limit: 5000, rate: 15, cumDeduct: 126 },
  { limit: 8800, rate: 24, cumDeduct: 576 },
  { limit: 15000, rate: 35, cumDeduct: 1544 },
  { limit: 30000, rate: 38, cumDeduct: 1994 },
  { limit: 50000, rate: 40, cumDeduct: 2594 },
  { limit: 100000, rate: 42, cumDeduct: 3594 },
  { limit: Infinity, rate: 45, cumDeduct: 6594 },
];

function calcProgressiveTax(income: number): { tax: number; rate: number } {
  if (income <= 0) return { tax: 0, rate: 0 };
  for (const b of BRACKETS) {
    if (income <= b.limit) {
      return {
        tax: Math.max(Math.round(income * (b.rate / 100) - b.cumDeduct), 0),
        rate: b.rate,
      };
    }
  }
  return { tax: 0, rate: 0 };
}

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

export default function RentalIncomeTaxPage() {
  const [rentalIncome, setRentalIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const result = useMemo(() => {
    const rental = Number(rentalIncome) || 0;
    const other = Number(otherIncome) || 0;
    const exp = Number(expenses) || 0;

    // 분리과세 (2,000만원 이하만 가능)
    const canSeparate = rental <= 2000;
    let separateTax = 0;
    if (canSeparate) {
      const deductionRate = isRegistered ? 0.6 : 0.5; // 등록 60%, 미등록 50%
      const basicDeduction = isRegistered ? 400 : 200;
      const taxableRental = Math.max(rental * (1 - deductionRate) - basicDeduction, 0);
      separateTax = Math.round(taxableRental * 0.14); // 14% 분리과세
    }

    // 종합과세
    const rentalNet = Math.max(rental - exp, 0);
    const totalIncome = rentalNet + other;
    const comprehensiveResult = calcProgressiveTax(totalIncome);
    const baseResult = calcProgressiveTax(other); // 임대소득 없을 때
    const comprehensiveTax = comprehensiveResult.tax - baseResult.tax; // 임대소득으로 인한 추가 세금

    // 지방소득세
    const separateLocal = Math.round(separateTax * 0.1);
    const comprehensiveLocal = Math.round(comprehensiveTax * 0.1);

    return {
      canSeparate,
      separateTax,
      separateLocal,
      separateTotal: separateTax + separateLocal,
      comprehensiveTax: Math.max(comprehensiveTax, 0),
      comprehensiveLocal: Math.max(comprehensiveLocal, 0),
      comprehensiveTotal: Math.max(comprehensiveTax, 0) + Math.max(comprehensiveLocal, 0),
      comprehensiveRate: comprehensiveResult.rate,
      recommended: canSeparate && separateTax + separateLocal <= comprehensiveTax + comprehensiveLocal
        ? "분리과세"
        : "종합과세",
    };
  }, [rentalIncome, otherIncome, expenses, isRegistered]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">임대소득세 계산기</h1>
      <p className="text-muted mb-8">
        연간 임대 수입을 입력하면 분리과세와 종합과세를 비교해 유리한 방법을 알려드립니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">소득 정보</h2>
          <CalcInput label="연간 주택 임대 수입" value={rentalIncome} onChange={setRentalIncome} />
          <CalcInput label="다른 종합소득 (근로·사업 등)" value={otherIncome} onChange={setOtherIncome} />
          <CalcInput label="임대 필요경비 (수선비, 이자 등)" value={expenses} onChange={setExpenses} />

          <label className="flex items-center gap-3 p-3 rounded-lg border border-card-border cursor-pointer">
            <input
              type="checkbox"
              checked={isRegistered}
              onChange={(e) => setIsRegistered(e.target.checked)}
              className="w-4 h-4"
            />
            <div>
              <p className="font-medium text-sm">임대사업자 등록</p>
              <p className="text-xs text-muted">등록 시 필요경비율 60%, 기본공제 400만원</p>
            </div>
          </label>
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>

            {result.canSeparate && (
              <>
                <h3 className="text-sm font-medium text-muted mb-2">분리과세 (14%)</h3>
                <div className="space-y-1 mb-4">
                  <ResultRow label="임대소득세" value={`${fmt(result.separateTax)} 만원`} />
                  <ResultRow label="지방소득세" value={`${fmt(result.separateLocal)} 만원`} sub />
                  <ResultRow label="분리과세 합계" value={`${fmt(result.separateTotal)} 만원`} highlight />
                </div>
              </>
            )}

            <h3 className="text-sm font-medium text-muted mb-2">종합과세 ({result.comprehensiveRate}%)</h3>
            <div className="space-y-1 mb-4">
              <ResultRow label="임대분 추가 소득세" value={`${fmt(result.comprehensiveTax)} 만원`} />
              <ResultRow label="지방소득세" value={`${fmt(result.comprehensiveLocal)} 만원`} sub />
              <ResultRow label="종합과세 합계" value={`${fmt(result.comprehensiveTotal)} 만원`} highlight />
            </div>

            {result.canSeparate && (
              <div className={`p-3 rounded-lg text-sm font-medium ${
                result.recommended === "분리과세"
                  ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
                  : "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
              }`}>
                {result.recommended === "분리과세"
                  ? `분리과세가 ${fmt(result.comprehensiveTotal - result.separateTotal)}만원 유리합니다`
                  : `종합과세가 ${fmt(result.separateTotal - result.comprehensiveTotal)}만원 유리합니다`}
              </div>
            )}

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">참고</p>
              <p>
                분리과세는 연간 임대 수입 2,000만원 이하일 때만 선택 가능합니다.
                실제 세금은 각종 공제에 따라 달라질 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <KakaoAdFit />
      <AdBanner />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">임대소득세 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">임대사업자 등록하면 뭐가 좋은가요?</summary>
            <p className="mt-2 text-sm text-muted">
              필요경비율 60%(미등록 50%), 기본공제 400만원(미등록 200만원)으로 세금이 줄어듭니다.
              다만 의무 임대 기간, 임대료 인상 제한 등 의무 사항이 있습니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">전세도 임대소득세 대상인가요?</summary>
            <p className="mt-2 text-sm text-muted">
              2주택 이하는 전세 임대소득 비과세입니다. 3주택 이상이면 전세보증금의 간주임대료에 대해 과세됩니다.
            </p>
          </details>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "임대소득세 계산기",
            description: "주택 임대소득에 대한 분리과세·종합과세를 비교 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
