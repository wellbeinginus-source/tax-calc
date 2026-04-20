import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "종합부동산세 계산 방법과 절세 팁 (2026년)",
  description:
    "종합부동산세 대상, 세율, 공제 방법을 쉽게 정리했습니다. 1세대 1주택 공제, 고령자·장기보유 공제까지.",
  keywords: ["종부세", "종합부동산세", "종부세 계산", "종부세 세율", "종부세 공제"],
};

export default function PropertyTaxGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        종합부동산세 계산 방법과 절세 팁
      </h1>
      <p className="text-muted mb-8">
        매년 12월에 내는 종부세. 누가 내야 하고 얼마나 나오는지 쉽게 정리합니다.
      </p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">종합부동산세란?</h2>
          <p>
            보유 중인 주택·토지의 공시가격 합산액이 일정 금액을 초과하면 내는 국세입니다.
            재산세와 별도로 매년 6월 1일 기준으로 부과됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">과세 대상 기준</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">구분</th>
                  <th className="py-2 text-left">공제금액</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">1세대 1주택</td><td>12억원</td></tr>
                <tr><td className="py-2">일반 (2주택 이상)</td><td>9억원</td></tr>
                <tr><td className="py-2">법인</td><td>공제 없음</td></tr>
              </tbody>
            </table>
          </div>
          <p>공시가격 합산에서 공제금액을 뺀 나머지가 과세표준이 됩니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">종부세 세율표 (일반)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">과세표준</th>
                  <th className="py-2 text-left">세율 (일반)</th>
                  <th className="py-2 text-left">세율 (3주택+)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">3억 이하</td><td>0.5%</td><td>1.2%</td></tr>
                <tr><td className="py-2">3~6억</td><td>0.7%</td><td>1.6%</td></tr>
                <tr><td className="py-2">6~12억</td><td>1.0%</td><td>2.2%</td></tr>
                <tr><td className="py-2">12~25억</td><td>1.3%</td><td>3.6%</td></tr>
                <tr><td className="py-2">25~50억</td><td>1.5%</td><td>5.0%</td></tr>
                <tr><td className="py-2">50억 초과</td><td>2.7%</td><td>6.0%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted mt-2">농어촌특별세 20%가 추가됩니다.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">1세대 1주택 세액 공제</h2>
          <p>만 60세 이상이거나 장기 보유한 1세대 1주택자는 추가 공제를 받습니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>고령자 공제</strong>: 60~65세 10%, 65~70세 20%, 70세 이상 30%</li>
            <li><strong>장기보유 공제</strong>: 5~10년 20%, 10~15년 40%, 15년 이상 50%</li>
            <li><strong>합산 한도</strong>: 최대 80%까지</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">종부세 절세 전략</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>부부 공동명의로 공제 2배 활용 (각각 9억 공제)</li>
            <li>1세대 1주택 요건 충족 시 12억 공제 + 고령·장기보유 공제</li>
            <li>임대사업자 등록 시 합산배제 가능 (조건 확인 필요)</li>
            <li>6월 1일 전에 처분하면 해당 연도 종부세 면제</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold">납부 시기와 분납</h2>
          <p>
            매년 <strong>12월 1일~15일</strong>에 납부합니다.
            세액이 250만원을 초과하면 6개월 분납이 가능합니다.
          </p>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">종부세 직접 계산해보세요</p>
            <p className="text-sm text-muted mb-4">공시가격과 보유 유형만 입력하면 바로 확인됩니다.</p>
            <Link
              href="/property-tax"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              종합부동산세 계산기 바로가기
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
            headline: "종합부동산세 계산 방법과 절세 팁 (2026년)",
            description: "종부세 대상, 세율, 공제 방법을 정리합니다.",
            author: { "@type": "Organization", name: "온기획(ON)" },
            datePublished: "2026-04-17",
          }),
        }}
      />
    </>
  );
}
