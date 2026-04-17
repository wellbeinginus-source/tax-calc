"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";

type HoldingType = "under1y" | "1to2y" | "over2y" | "exempt";

const HOLDING_OPTIONS: { value: HoldingType; label: string; desc: string }[] = [
  { value: "under1y", label: "1년 미만 보유", desc: "세율 70% (투기 억제)" },
  { value: "1to2y", label: "1~2년 보유", desc: "세율 60%" },
  { value: "over2y", label: "2년 이상 보유", desc: "기본세율 6~45% (누진)" },
  { value: "exempt", label: "1세대 1주택 비과세", desc: "12억 초과분만 과세" },
];

const BASIC_DEDUCTION = 250; // 기본공제 250만원

// 2026 기준 종합소득세 누진세율
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

function calcProgressiveTax(taxableIncome: number): { tax: number; rate: number } {
  if (taxableIncome <= 0) return { tax: 0, rate: 0 };
  for (const b of BRACKETS) {
    if (taxableIncome <= b.limit) {
      const tax = Math.round(taxableIncome * (b.rate / 100) - b.cumDeduct);
      return { tax: Math.max(tax, 0), rate: b.rate };
    }
  }
  return { tax: 0, rate: 0 };
}

// 장기보유특별공제 (2년 이상, 최대 30% / 1세대1주택 최대 80%)
function longTermDeductionRate(holdingYears: number, isExempt: boolean): number {
  if (holdingYears < 3) return 0;
  if (isExempt) {
    // 1세대 1주택: 보유 연 4% + 거주 연 4% (간소화: 보유만 적용)
    return Math.min(holdingYears * 4, 80);
  }
  // 일반: 연 2%, 최대 30%
  return Math.min((holdingYears - 2) * 2, 30);
}

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

export default function TransferTaxPage() {
  const [salePrice, setSalePrice] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [expenses, setExpenses] = useState("");
  const [holdingYears, setHoldingYears] = useState("");
  const [holdingType, setHoldingType] = useState<HoldingType>("over2y");

  const result = useMemo(() => {
    const sale = Number(salePrice) || 0;
    const buy = Number(buyPrice) || 0;
    const exp = Number(expenses) || 0;
    const years = Number(holdingYears) || 0;

    const gain = sale - buy - exp; // 양도차익
    if (gain <= 0) {
      return { gain: 0, deduction: 0, deductionRate: 0, taxableIncome: 0, tax: 0, localTax: 0, totalTax: 0, rate: 0, effectiveRate: "0.00", netProfit: gain };
    }

    const isExempt = holdingType === "exempt";

    // 1세대 1주택 비과세: 12억 초과분만 과세
    let taxableGain = gain;
    if (isExempt && sale <= 120000) {
      return { gain, deduction: 0, deductionRate: 0, taxableIncome: 0, tax: 0, localTax: 0, totalTax: 0, rate: 0, effectiveRate: "0.00", netProfit: gain };
    }
    if (isExempt && sale > 120000) {
      taxableGain = Math.round(gain * ((sale - 120000) / sale));
    }

    // 장기보유특별공제
    const ltRate = longTermDeductionRate(years, isExempt);
    const ltDeduction = Math.round(taxableGain * (ltRate / 100));
    const afterLt = taxableGain - ltDeduction;

    // 기본공제
    const taxableIncome = Math.max(afterLt - BASIC_DEDUCTION, 0);

    let tax: number;
    let rate: number;

    if (holdingType === "under1y") {
      tax = Math.round(taxableIncome * 0.7);
      rate = 70;
    } else if (holdingType === "1to2y") {
      tax = Math.round(taxableIncome * 0.6);
      rate = 60;
    } else {
      const result = calcProgressiveTax(taxableIncome);
      tax = result.tax;
      rate = result.rate;
    }

    // 지방소득세 (양도세의 10%)
    const localTax = Math.round(tax * 0.1);
    const totalTax = tax + localTax;

    return {
      gain,
      deduction: ltDeduction,
      deductionRate: ltRate,
      taxableIncome,
      tax,
      localTax,
      totalTax,
      rate,
      effectiveRate: gain > 0 ? ((totalTax / gain) * 100).toFixed(1) : "0.0",
      netProfit: gain - totalTax,
    };
  }, [salePrice, buyPrice, expenses, holdingYears, holdingType]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">양도소득세 계산기</h1>
      <p className="text-muted mb-8">
        매도가, 취득가, 필요경비, 보유기간을 입력하면 양도소득세를 계산합니다. 2026년 세율 기준.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">
            거래 정보
          </h2>

          <CalcInput label="매도가 (양도가액)" value={salePrice} onChange={setSalePrice} />
          <CalcInput label="취득가 (매입가)" value={buyPrice} onChange={setBuyPrice} />
          <CalcInput label="필요경비 (중개수수료, 수리비 등)" value={expenses} onChange={setExpenses} />
          <CalcInput label="보유기간" value={holdingYears} onChange={setHoldingYears} unit="년" placeholder="0" />

          <div>
            <label className="block text-sm font-medium mb-2">과세 유형</label>
            <div className="space-y-2">
              {HOLDING_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    holdingType === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-card-border bg-card-bg hover:border-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="holdingType"
                    value={opt.value}
                    checked={holdingType === opt.value}
                    onChange={(e) => setHoldingType(e.target.value as HoldingType)}
                    className="mt-0.5"
                  />
                  <div>
                    <p className="font-medium text-sm">{opt.label}</p>
                    <p className="text-xs text-muted">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-card-bg border border-card-border rounded-xl p-6 sticky top-20">
            <h2 className="font-semibold text-lg mb-4">계산 결과</h2>
            <div className="space-y-1">
              <ResultRow label="양도차익" value={`${fmt(result.gain)} 만원`} />
              {result.deduction > 0 && (
                <ResultRow
                  label={`장기보유특별공제 (${result.deductionRate}%)`}
                  value={`-${fmt(result.deduction)} 만원`}
                  sub
                />
              )}
              <ResultRow label="과세표준" value={`${fmt(result.taxableIncome)} 만원`} />
              <ResultRow
                label={`양도소득세 (${result.rate}%)`}
                value={`${fmt(result.tax)} 만원`}
              />
              <ResultRow
                label="지방소득세 (10%)"
                value={`${fmt(result.localTax)} 만원`}
                sub
              />
              <ResultRow
                label="총 세금"
                value={`${fmt(result.totalTax)} 만원`}
                highlight
              />
              <ResultRow label="실효세율" value={`${result.effectiveRate}%`} />
              <ResultRow label="세후 순수익" value={`${fmt(result.netProfit)} 만원`} />
            </div>

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">참고</p>
              <p>
                실제 세금은 비과세 요건, 감면, 다주택 중과 등에 따라 달라질 수 있습니다.
                정확한 계산은 세무사 상담을 권장합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <KakaoAdFit />
      <AdBanner />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">양도소득세 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              1세대 1주택 비과세 조건은?
            </summary>
            <p className="mt-2 text-sm text-muted">
              2년 이상 보유(조정대상지역은 2년 거주 포함)하고, 양도가액 12억원 이하인 경우
              비과세됩니다. 12억 초과분은 비율 과세합니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              장기보유특별공제란?
            </summary>
            <p className="mt-2 text-sm text-muted">
              3년 이상 보유 시 양도차익에서 일정 비율을 공제합니다.
              일반: 연 2%(최대 30%), 1세대 1주택: 연 4%(보유)+연 4%(거주), 최대 80%.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">
              양도소득세 신고 기한은?
            </summary>
            <p className="mt-2 text-sm text-muted">
              매도일이 속하는 달의 말일부터 2개월 이내에 예정신고해야 합니다.
              기한 내 미신고 시 가산세가 부과됩니다.
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
            name: "양도소득세 계산기",
            description: "부동산 양도소득세를 무료로 계산합니다. 2026년 최신 세율 반영.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
