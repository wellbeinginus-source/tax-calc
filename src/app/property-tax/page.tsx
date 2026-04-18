"use client";

import { useState, useMemo } from "react";
import CalcInput from "@/components/CalcInput";
import ResultRow from "@/components/ResultRow";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import LeadCTA from "@/components/LeadCTA";
import { CoupangBanner, TaxConsultCTA } from "@/components/CoupangBanner";

type OwnerType = "single" | "multi2" | "multi3" | "corp";

const OWNER_OPTIONS: { value: OwnerType; label: string; desc: string }[] = [
  { value: "single", label: "1세대 1주택", desc: "공제 12억원, 세율 0.5~2.7%" },
  { value: "multi2", label: "2주택", desc: "공제 9억원, 세율 0.5~2.7%" },
  { value: "multi3", label: "3주택 이상", desc: "공제 9억원, 세율 1.2~6.0%" },
  { value: "corp", label: "법인", desc: "공제 없음, 단일세율 2.7~5.0%" },
];

// 종부세 세율 (2026 기준 간소화)
function calcPropertyTax(
  totalPublicPrice: number,
  ownerType: OwnerType,
): { taxBase: number; tax: number; rate: number; deduction: number } {
  // 공제금액
  let deduction: number;
  if (ownerType === "single") deduction = 120000;
  else if (ownerType === "corp") deduction = 0;
  else deduction = 90000;

  const taxBase = Math.max(totalPublicPrice - deduction, 0);
  if (taxBase <= 0) return { taxBase: 0, tax: 0, rate: 0, deduction };

  // 공정시장가액비율 100%
  const assessed = taxBase;

  let tax: number;
  let rate: number;

  if (ownerType === "multi3") {
    // 3주택 이상 중과
    if (assessed <= 30000) { rate = 1.2; tax = Math.round(assessed * 0.012); }
    else if (assessed <= 60000) { rate = 1.6; tax = Math.round(assessed * 0.016 - 120); }
    else if (assessed <= 120000) { rate = 2.2; tax = Math.round(assessed * 0.022 - 480); }
    else if (assessed <= 250000) { rate = 3.6; tax = Math.round(assessed * 0.036 - 2160); }
    else if (assessed <= 500000) { rate = 5.0; tax = Math.round(assessed * 0.05 - 5660); }
    else { rate = 6.0; tax = Math.round(assessed * 0.06 - 10660); }
  } else if (ownerType === "corp") {
    if (assessed <= 120000) { rate = 2.7; tax = Math.round(assessed * 0.027); }
    else { rate = 5.0; tax = Math.round(assessed * 0.05 - 2760); }
  } else {
    // 1주택, 2주택 일반
    if (assessed <= 30000) { rate = 0.5; tax = Math.round(assessed * 0.005); }
    else if (assessed <= 60000) { rate = 0.7; tax = Math.round(assessed * 0.007 - 60); }
    else if (assessed <= 120000) { rate = 1.0; tax = Math.round(assessed * 0.01 - 240); }
    else if (assessed <= 250000) { rate = 1.3; tax = Math.round(assessed * 0.013 - 600); }
    else if (assessed <= 500000) { rate = 1.5; tax = Math.round(assessed * 0.015 - 1100); }
    else { rate = 2.7; tax = Math.round(assessed * 0.027 - 7100); }
  }

  return { taxBase, tax: Math.max(tax, 0), rate, deduction };
}

function fmt(n: number): string {
  if (!isFinite(n)) return "-";
  return n.toLocaleString("ko-KR");
}

export default function PropertyTaxPage() {
  const [publicPrice, setPublicPrice] = useState("");
  const [ownerType, setOwnerType] = useState<OwnerType>("single");

  const result = useMemo(() => {
    const p = Number(publicPrice) || 0;
    const r = calcPropertyTax(p, ownerType);
    const localTax = Math.round(r.tax * 0.2); // 농어촌특별세 20%
    return { ...r, localTax, totalTax: r.tax + localTax };
  }, [publicPrice, ownerType]);

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">종합부동산세 계산기</h1>
      <p className="text-muted mb-8">
        주택 공시가격 합산액과 보유 유형을 선택하면 종합부동산세를 계산합니다.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="font-semibold text-lg border-b border-card-border pb-2">보유 정보</h2>
          <CalcInput
            label="주택 공시가격 합산액"
            value={publicPrice}
            onChange={setPublicPrice}
            helpText="국토교통부 부동산 공시가격 기준"
          />
          <div>
            <label className="block text-sm font-medium mb-2">보유 유형</label>
            <div className="space-y-2">
              {OWNER_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    ownerType === opt.value
                      ? "border-primary bg-primary/5"
                      : "border-card-border bg-card-bg hover:border-muted"
                  }`}
                >
                  <input
                    type="radio"
                    name="ownerType"
                    value={opt.value}
                    checked={ownerType === opt.value}
                    onChange={(e) => setOwnerType(e.target.value as OwnerType)}
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
              <ResultRow label="공제금액" value={`${fmt(result.deduction)} 만원`} sub />
              <ResultRow label="과세표준" value={`${fmt(result.taxBase)} 만원`} />
              <ResultRow label={`종부세 (${result.rate}%)`} value={`${fmt(result.tax)} 만원`} />
              <ResultRow label="농어촌특별세 (20%)" value={`${fmt(result.localTax)} 만원`} sub />
              <ResultRow label="총 세금" value={`${fmt(result.totalTax)} 만원`} highlight />
            </div>

            <div className="mt-6 p-3 bg-accent rounded-lg text-sm text-muted">
              <p className="font-medium mb-1">참고</p>
              <p>
                실제 종부세는 세부담 상한, 고령자·장기보유 공제 등에 따라 달라질 수 있습니다.
                매년 6월 1일 기준으로 부과됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LeadCTA />

      <KakaoAdFit />
      <AdBanner />

      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">종부세 FAQ</h2>
        <div className="space-y-3">
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">종부세 납부 시기는?</summary>
            <p className="mt-2 text-sm text-muted">
              매년 12월 1일~15일에 납부합니다. 납부 세액이 250만원을 초과하면 분납이 가능합니다.
            </p>
          </details>
          <details className="border border-card-border rounded-lg p-4 bg-card-bg">
            <summary className="font-medium cursor-pointer">1세대 1주택 고령자 공제는?</summary>
            <p className="mt-2 text-sm text-muted">
              만 60세 이상 1세대 1주택자는 연령별로 10~30%, 장기보유 20~50% 공제를 받을 수 있습니다.
              합산 최대 80% 공제 가능합니다.
            </p>
          </details>
        </div>
      </section>

      <TaxConsultCTA />
      <CoupangBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "종합부동산세 계산기",
            description: "주택 공시가격 기준 종합부동산세를 무료로 계산합니다.",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
    </>
  );
}
