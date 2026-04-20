import type { Metadata } from "next";
import Link from "next/link";
import AdBanner from "@/components/AdBanner";
import KakaoAdFit from "@/components/KakaoAdFit";
import { CoupangBanner } from "@/components/CoupangBanner";

export const metadata: Metadata = {
  title: "취득세 세율표 2026년 최신 | 주택·상가·토지별 정리",
  description:
    "2026년 최신 취득세 세율을 주택, 다주택, 상가, 토지별로 정리했습니다. 생애최초 감면, 신고 기한까지 한눈에.",
  keywords: ["취득세", "취득세 세율", "취득세 계산", "다주택 취득세", "생애최초 취득세 감면"],
};

export default function AcquisitionTaxGuidePage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">
        취득세 세율표 2026년 최신 정리
      </h1>
      <p className="text-muted mb-8">
        부동산을 살 때 가장 먼저 내는 세금, 취득세. 유형별 세율과 절세 포인트를 정리합니다.
      </p>

      <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-xl font-bold">취득세란?</h2>
          <p>
            부동산을 취득(매매, 상속, 증여 등)할 때 내는 지방세입니다.
            취득세 본세에 지방교육세와 농어촌특별세가 추가되어 실제 부담이 커집니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">2026년 취득세 세율표</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-card-border">
                  <th className="py-2 text-left">유형</th>
                  <th className="py-2 text-left">취득세</th>
                  <th className="py-2 text-left">지방교육세</th>
                  <th className="py-2 text-left">농특세</th>
                  <th className="py-2 text-left">합계</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-card-border">
                <tr><td className="py-2">주택 (6억 이하, 1주택)</td><td>1%</td><td>0.1%</td><td>-</td><td>1.1%</td></tr>
                <tr><td className="py-2">주택 (6~9억, 1주택)</td><td>1~3%</td><td>0.1~0.3%</td><td>-</td><td>1.1~3.3%</td></tr>
                <tr><td className="py-2">주택 (9억 초과, 1주택)</td><td>3%</td><td>0.3%</td><td>0.2%</td><td>3.5%</td></tr>
                <tr><td className="py-2">다주택 (조정지역)</td><td>8%</td><td>0.4%</td><td>0.6%</td><td>9%</td></tr>
                <tr><td className="py-2">3주택 이상 (조정지역)</td><td>12%</td><td>0.4%</td><td>1%</td><td>13.4%</td></tr>
                <tr><td className="py-2">상가·오피스텔</td><td>4%</td><td>0.4%</td><td>0.2%</td><td>4.6%</td></tr>
                <tr><td className="py-2">토지</td><td>4%</td><td>0.4%</td><td>0.2%</td><td>4.6%</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold">6억~9억 구간 계산법</h2>
          <p>
            1주택 기준으로 6억~9억 구간은 세율이 점진적으로 올라갑니다.
            공식은 다음과 같습니다.
          </p>
          <p className="bg-accent p-3 rounded-lg text-sm">
            <strong>취득세율 = 1% + (취득가 - 6억) / 3억 × 2%</strong>
          </p>
          <p>
            예를 들어 7.5억짜리 주택은: 1% + (7.5억 - 6억) / 3억 × 2% = 2%가 됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold">생애최초 주택 취득세 감면</h2>
          <p>생애 최초로 주택을 구입하는 경우 취득세를 감면받을 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>감면 한도: 최대 <strong>200만원</strong></li>
            <li>대상 주택가: 수도권 4억, 비수도권 3억 이하</li>
            <li>소득 요건: 부부 합산 연소득 7,000만원 이하</li>
            <li>조건: 취득일부터 3년 내 전입 + 3년 거주</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold">취득세 신고·납부 기한</h2>
          <p>
            잔금 납부일(취득일)로부터 <strong>60일 이내</strong>에 관할 시·군·구청에
            신고·납부해야 합니다. 상속은 6개월, 증여는 3개월입니다.
          </p>
          <p>기한을 넘기면 가산세가 부과되니 주의하세요.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold">취득세 절세 팁</h2>
          <ol className="list-decimal pl-5 space-y-1">
            <li>생애최초 감면 대상이면 반드시 신청하기</li>
            <li>다주택 중과 전에 기존 주택 처분 검토</li>
            <li>법인 취득 시 추가 중과 주의 (법인은 별도 세율)</li>
            <li>증여 시 시가 vs 공시가격 비교 후 유리한 쪽 선택</li>
          </ol>
        </section>

        <div className="not-prose">
          <div className="my-8 p-5 bg-primary/5 border border-primary/20 rounded-xl text-center">
            <p className="font-bold text-lg mb-2">취득세 직접 계산해보세요</p>
            <p className="text-sm text-muted mb-4">매매가와 물건 유형만 선택하면 바로 계산됩니다.</p>
            <Link
              href="/acquisition-tax"
              className="inline-block px-6 py-3 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              취득세 계산기 바로가기
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
            headline: "취득세 세율표 2026년 최신 정리",
            description: "주택, 다주택, 상가, 토지별 취득세 세율과 감면 조건을 정리합니다.",
            author: { "@type": "Organization", name: "온기획(ON)" },
            datePublished: "2026-04-17",
          }),
        }}
      />
    </>
  );
}
