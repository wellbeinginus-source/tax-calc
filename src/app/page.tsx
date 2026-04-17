import type { Metadata } from "next";
import Link from "next/link";
import KakaoAdFit from "@/components/KakaoAdFit";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
  title: "부동산 세금 계산기 | 양도세·취득세·종부세·임대소득세 무료 계산",
  description:
    "부동산 거래 시 필요한 모든 세금을 한 곳에서 계산하세요. 양도소득세, 취득세, 종합부동산세, 임대소득세 계산기 무료 제공.",
};

const CALCULATORS = [
  {
    href: "/transfer-tax",
    icon: "💸",
    title: "양도소득세 계산기",
    desc: "매도가, 취득가, 보유기간을 입력하면 양도소득세를 바로 확인할 수 있어요.",
  },
  {
    href: "/acquisition-tax",
    icon: "🏛️",
    title: "취득세 계산기",
    desc: "매매가 기준으로 취득세, 지방교육세, 농어촌특별세까지 한번에 계산해요.",
  },
  {
    href: "/property-tax",
    icon: "🏢",
    title: "종합부동산세 계산기",
    desc: "공시가격과 보유 주택 수를 입력하면 종부세를 예상 계산해요.",
  },
  {
    href: "/rental-income-tax",
    icon: "🔑",
    title: "임대소득세 계산기",
    desc: "연간 임대 수입에 대한 소득세를 분리과세·종합과세 비교로 계산해요.",
  },
];

export default function Home() {
  return (
    <>
      <section className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">
          부동산 세금,
          <br className="sm:hidden" /> 미리 계산하세요
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          양도소득세, 취득세, 종합부동산세, 임대소득세까지.
          <br />
          복잡한 부동산 세금을 쉽고 빠르게 계산하세요.
        </p>
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        {CALCULATORS.map((calc) => (
          <Link
            key={calc.href}
            href={calc.href}
            className="group block p-6 rounded-xl border border-card-border bg-card-bg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">{calc.icon}</div>
            <h2 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
              {calc.title}
            </h2>
            <p className="text-sm text-muted">{calc.desc}</p>
          </Link>
        ))}
      </div>

      <KakaoAdFit width={728} height={90} />
      <AdBanner />

      <section className="mt-16">
        <h2 className="text-xl font-bold mb-6">자주 묻는 질문</h2>
        <div className="space-y-4">
          {[
            {
              q: "양도소득세는 언제 내나요?",
              a: "부동산을 매도한 날이 속하는 달의 말일부터 2개월 이내에 양도소득세를 예정 신고·납부해야 합니다.",
            },
            {
              q: "1세대 1주택 비과세 조건은?",
              a: "2년 이상 보유(조정대상지역은 2년 거주 포함)하고 매도가 12억원 이하인 경우 양도소득세가 비과세됩니다.",
            },
            {
              q: "종합부동산세는 누가 내나요?",
              a: "매년 6월 1일 기준 공시가격 합산액이 주택 9억원(1세대 1주택 12억원), 토지 5억원을 초과하면 납부 대상입니다.",
            },
            {
              q: "임대소득세 분리과세가 유리한가요?",
              a: "연간 주택 임대 수입 2,000만원 이하이면 14% 분리과세를 선택할 수 있습니다. 다른 소득이 많으면 분리과세가 유리합니다.",
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="border border-card-border rounded-lg p-4 bg-card-bg"
            >
              <summary className="font-medium cursor-pointer">{faq.q}</summary>
              <p className="mt-2 text-sm text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "부동산 세금 계산기",
            description:
              "양도소득세, 취득세, 종합부동산세, 임대소득세를 무료로 계산하는 웹 애플리케이션",
            applicationCategory: "FinanceApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "양도소득세는 언제 내나요?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "부동산을 매도한 날이 속하는 달의 말일부터 2개월 이내에 양도소득세를 예정 신고·납부해야 합니다.",
                },
              },
              {
                "@type": "Question",
                name: "1세대 1주택 비과세 조건은?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "2년 이상 보유(조정대상지역은 2년 거주 포함)하고 매도가 12억원 이하인 경우 비과세됩니다.",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}
