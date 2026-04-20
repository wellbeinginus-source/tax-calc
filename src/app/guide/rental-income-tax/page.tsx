import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "임대소득세 분리과세 vs 종합과세 비교 (2026년)",
  description:
    "주택 임대소득세 신고 방법, 분리과세와 종합과세 중 어떤 게 유리한지, 임대사업자 등록 혜택까지 정리합니다.",
  keywords: ["임대소득세", "분리과세", "종합과세", "임대사업자", "주택 임대 세금"],
};

export default function RentalIncomeTaxGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        임대소득세 분리과세 vs 종합과세 비교
      </h1>
      <p className="text-muted mb-8">
        주택을 임대하면 임대소득세를 내야 합니다. 분리과세와 종합과세 중 어떤 게 유리한지 알아봅니다.
      </p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">임대소득세 과세 대상</h2>
          <p>
            주택을 임대하고 받는 월세·전세 보증금에 대해 소득세가 부과됩니다.
            모든 임대가 과세 대상은 아닙니다.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>월세</strong>: 1주택 이상 보유 시 과세 (기준시가 12억 초과 1주택 포함)</li>
            <li><strong>전세(보증금)</strong>: 3주택 이상 보유 시 간주임대료 과세</li>
            <li><strong>2주택 이하 전세</strong>: 비과세</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">분리과세 vs 종합과세</h2>
          <p>연간 임대 수입이 2,000만원 이하이면 두 가지 중 선택할 수 있습니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">구분</th>
                  <th className="py-2 text-left">분리과세</th>
                  <th className="py-2 text-left">종합과세</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">세율</td><td>14% (단일)</td><td>6~45% (누진)</td></tr>
                <tr><td className="py-2">필요경비율 (등록)</td><td>60%</td><td>실제 경비</td></tr>
                <tr><td className="py-2">필요경비율 (미등록)</td><td>50%</td><td>실제 경비</td></tr>
                <tr><td className="py-2">기본공제 (등록)</td><td>400만원</td><td>-</td></tr>
                <tr><td className="py-2">기본공제 (미등록)</td><td>200만원</td><td>-</td></tr>
                <tr><td className="py-2">다른 소득과 합산</td><td>안 함</td><td>합산</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">어떤 게 유리할까?</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>다른 소득이 많으면</strong> → 분리과세 유리 (14% 고정이니까)</li>
            <li><strong>다른 소득이 적거나 없으면</strong> → 종합과세 유리 (6% 구간에 해당)</li>
            <li><strong>임대 수입 2,000만원 초과</strong> → 종합과세만 가능</li>
          </ul>
          <p>
            정확한 비교는 계산기로 직접 확인하는 게 가장 빠릅니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">임대사업자 등록 혜택</h2>
          <p>임대사업자로 등록하면 세금 혜택이 있지만, 의무사항도 있습니다.</p>
          <h3 className="text-lg font-semibold mt-4">혜택</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>필요경비율 60% (미등록 50%)</li>
            <li>기본공제 400만원 (미등록 200만원)</li>
            <li>소형주택 감면 가능</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4">의무</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>의무 임대 기간 준수 (10년)</li>
            <li>임대료 인상 제한 (연 5% 이내)</li>
            <li>위반 시 세금 혜택 환수</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">간주임대료란?</h2>
          <p>
            3주택 이상 보유 시 전세보증금에 대해 &quot;이자 수입이 있는 것으로 간주&quot;하여
            과세합니다. 계산 공식은 다음과 같습니다.
          </p>
          <p className="bg-accent p-3 rounded-lg text-sm">
            <strong>간주임대료 = (보증금 합계 - 3억) × 60% × 이자율(2.9%)</strong>
          </p>
          <p>소형주택(전용 40㎡ 이하, 기준시가 2억 이하)은 보증금 합산에서 제외됩니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">신고 기한</h2>
          <p>
            매년 <strong>5월 종합소득세 신고</strong> 때 함께 신고합니다.
            분리과세를 선택해도 5월에 신고해야 합니다.
          </p>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">분리과세 vs 종합과세 비교해보세요</p>
            <p className="text-sm text-muted mb-4">임대 수입과 다른 소득만 입력하면 어떤 게 유리한지 바로 확인됩니다.</p>
            <Link
              href="/rental-income-tax"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              임대소득세 계산기 바로가기
            </Link>
          </div>
          <CoupangBanner />
          <KakaoAdFit />
          <AdBanner />
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "임대소득세 분리과세 vs 종합과세 비교 (2026년)",
            description: "주택 임대소득세 신고 방법과 절세 전략을 정리합니다.",
            author: { "@type": "Organization", name: "온기획(ON)" },
            datePublished: "2026-04-17",
          }),
        }}
      />
    </>
  );
}
