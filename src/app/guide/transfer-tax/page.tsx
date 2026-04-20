import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "양도소득세 계산 방법 완벽 정리 (2026년 최신)",
  description:
    "부동산 양도소득세 계산 방법을 쉽게 정리했습니다. 세율표, 장기보유특별공제, 1세대 1주택 비과세 조건까지. 2026년 최신 기준.",
  keywords: ["양도소득세", "양도세 계산", "양도세 세율", "장기보유특별공제", "1세대 1주택 비과세"],
};

export default function TransferTaxGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        양도소득세 계산 방법 완벽 정리 (2026년 최신)
      </h1>
      <p className="text-muted mb-8">
        부동산을 팔 때 내야 하는 양도소득세. 복잡해 보이지만 구조를 알면 간단합니다.
      </p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">양도소득세란?</h2>
          <p>
            부동산을 팔아서 생긴 이익(양도차익)에 대해 내는 세금입니다.
            매도가에서 취득가와 필요경비를 빼면 양도차익이 나오고,
            여기에 세율을 적용하면 양도소득세가 계산됩니다.
          </p>
          <p>
            쉽게 말하면 <strong>&quot;판 가격 - 산 가격 - 비용 = 이익 → 세금&quot;</strong> 구조입니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">양도소득세 계산 순서</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong>양도차익 계산</strong>: 매도가 - 취득가 - 필요경비(중개수수료, 수리비 등)</li>
            <li><strong>장기보유특별공제 적용</strong>: 3년 이상 보유 시 양도차익에서 공제</li>
            <li><strong>기본공제</strong>: 연 250만원 공제</li>
            <li><strong>세율 적용</strong>: 과세표준에 따라 6~45% 누진세율</li>
            <li><strong>지방소득세 추가</strong>: 양도세의 10%</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold">2026년 양도소득세 세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">과세표준</th>
                  <th className="py-2 text-left">세율</th>
                  <th className="py-2 text-left">누진공제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">1,400만원 이하</td><td>6%</td><td>-</td></tr>
                <tr><td className="py-2">1,400~5,000만원</td><td>15%</td><td>126만원</td></tr>
                <tr><td className="py-2">5,000~8,800만원</td><td>24%</td><td>576만원</td></tr>
                <tr><td className="py-2">8,800~1.5억원</td><td>35%</td><td>1,544만원</td></tr>
                <tr><td className="py-2">1.5~3억원</td><td>38%</td><td>1,994만원</td></tr>
                <tr><td className="py-2">3~5억원</td><td>40%</td><td>2,594만원</td></tr>
                <tr><td className="py-2">5~10억원</td><td>42%</td><td>3,594만원</td></tr>
                <tr><td className="py-2">10억원 초과</td><td>45%</td><td>6,594만원</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">
            1년 미만 보유: 70%, 1~2년 보유: 60% 단일세율이 적용됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">장기보유특별공제</h2>
          <p>3년 이상 보유하면 양도차익에서 일정 비율을 공제받을 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>일반 부동산</strong>: 연 2%, 최대 30% (15년 이상)</li>
            <li><strong>1세대 1주택</strong>: 보유 연 4% + 거주 연 4%, 최대 80%</li>
          </ul>
          <p>
            예를 들어 1세대 1주택으로 10년 보유 + 10년 거주하면 80% 공제를 받아
            양도차익의 20%에만 세금이 부과됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">1세대 1주택 비과세 조건</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>2년 이상 보유 (조정대상지역은 2년 거주 포함)</li>
            <li>양도가액 12억원 이하: 전액 비과세</li>
            <li>양도가액 12억원 초과: 초과분만 비율 과세</li>
          </ul>
          <p>
            12억원을 넘더라도 전체가 과세되는 것이 아니라,
            (매도가 - 12억) / 매도가 비율만큼만 과세됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">양도소득세 신고 기한</h2>
          <p>
            매도일이 속하는 달의 말일부터 <strong>2개월 이내</strong>에 예정신고해야 합니다.
            기한을 넘기면 무신고 가산세(20%)와 납부불성실 가산세가 부과됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">필요경비로 인정되는 항목</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>취득 시 중개수수료</li>
            <li>취득세, 등록세</li>
            <li>법무사 비용</li>
            <li>자본적 지출 (베란다 확장, 보일러 교체 등)</li>
            <li>매도 시 중개수수료</li>
          </ul>
          <p className="text-sm text-muted">
            단순 수리비(도배, 장판)는 필요경비로 인정되지 않습니다.
            영수증을 꼭 보관하세요.
          </p>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">양도소득세 직접 계산해보세요</p>
            <p className="text-sm text-muted mb-4">매도가, 취득가, 보유기간만 입력하면 바로 결과가 나옵니다.</p>
            <Link
              href="/transfer-tax"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              양도소득세 계산기 바로가기
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
            headline: "양도소득세 계산 방법 완벽 정리 (2026년 최신)",
            description: "부동산 양도소득세 세율, 장기보유특별공제, 비과세 조건을 정리합니다.",
            author: { "@type": "Organization", name: "온기획(ON)" },
            datePublished: "2026-04-17",
          }),
        }}
      />
    </>
  );
}
