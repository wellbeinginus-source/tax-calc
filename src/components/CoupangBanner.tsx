"use client";

const LINK = "https://link.coupang.com/a/ep0BMn";

const DISCLAIMER = (
  <p className="mt-2 text-xs text-muted">
    이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
  </p>
);

const VARIANTS = {
  "transfer-tax": {
    banner: "양도소득세 절세 필독서 보기 →",
    ctaHeadline: "양도소득세 신고, 실수하면 가산세 붙습니다",
    ctaDesc: "절세 전략을 미리 알면 수백만 원이 달라집니다.",
    ctaBtn: "양도소득세 절세 서적 보기",
    books: [
      { title: "대한민국 부동산 절세 전략", desc: "양도세 합법적으로 줄이는 완전 가이드" },
      { title: "부동산 양도소득세 실전 가이드", desc: "2026년 최신 세율·공제 기준 반영" },
      { title: "나는 부동산 세금이 두렵지 않다", desc: "1세대 1주택 비과세 조건 완전 정복" },
    ],
  },
  "acquisition-tax": {
    banner: "취득세 줄이는 절세 전략 보기 →",
    ctaHeadline: "취득세, 주택 수에 따라 최대 3배 차이 납니다",
    ctaDesc: "합법적으로 취득세를 줄이는 방법이 있습니다.",
    ctaBtn: "취득세 절세 전략 서적 보기",
    books: [
      { title: "부동산 세금 바이블", desc: "취득·보유·양도 단계별 세금 전략 총정리" },
      { title: "대한민국 부동산 절세 전략", desc: "취득세 아끼는 합법적 방법 수록" },
      { title: "나는 부동산 세금이 두렵지 않다", desc: "1주택부터 다주택까지 세금 완전 정복" },
    ],
  },
  "property-tax": {
    banner: "종부세 합법적으로 줄이는 법 보기 →",
    ctaHeadline: "종합부동산세, 공제 항목 알면 달라집니다",
    ctaDesc: "공시가격 산정 방식과 합산 배제 요건을 미리 확인하세요.",
    ctaBtn: "종부세 절세 전략 서적 보기",
    books: [
      { title: "다주택자 세금 절세 전략", desc: "종부세·취득세·양도세 한번에 정복" },
      { title: "대한민국 부동산 절세 전략", desc: "보유세 부담 줄이는 합법적 방법" },
      { title: "부동산 세금 바이블", desc: "2026년 공시가격·종부세율 반영 최신판" },
    ],
  },
  "rental-income-tax": {
    banner: "임대소득세 절세 전략 서적 보기 →",
    ctaHeadline: "임대소득세, 필요경비 빠짐없이 챙기셨나요?",
    ctaDesc: "필요경비·기본공제를 제대로 적용하면 세금이 줄어듭니다.",
    ctaBtn: "임대소득세 절세 서적 보기",
    books: [
      { title: "임대사업자 세금 완전정복", desc: "등록 임대사업자 절세 혜택 완전 가이드" },
      { title: "월세 받는 부동산 절세", desc: "임대소득 신고부터 절세까지 한번에" },
      { title: "대한민국 부동산 절세 전략", desc: "임대소득세·양도세 동시에 줄이는 법" },
    ],
  },
} as const;

type Variant = keyof typeof VARIANTS;

export function CoupangBanner({ variant = "transfer-tax" }: { variant?: Variant }) {
  const cfg = VARIANTS[variant];
  return (
    <div className="my-8 p-4 bg-card-bg border border-card-border rounded-xl text-center">
      <a
        href={LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[#e52528] text-white font-bold rounded-lg hover:bg-[#c91f22] transition-colors"
      >
        {cfg.banner}
      </a>
      {DISCLAIMER}
    </div>
  );
}

export function BookRecommendations({ variant = "transfer-tax" }: { variant?: Variant }) {
  const cfg = VARIANTS[variant];
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-4">부동산 세금 추천 도서</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {cfg.books.map((book) => (
          <a
            key={book.title}
            href={LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-card-border rounded-xl bg-card-bg hover:border-primary hover:shadow-md transition-all"
          >
            <div className="text-2xl mb-2">📘</div>
            <h3 className="font-semibold text-sm mb-1">{book.title}</h3>
            <p className="text-xs text-muted">{book.desc}</p>
            <span className="inline-block mt-2 text-xs text-[#e52528] font-medium">
              쿠팡에서 보기 →
            </span>
          </a>
        ))}
      </div>
      {DISCLAIMER}
    </section>
  );
}

export function TaxConsultCTA({ variant = "transfer-tax" }: { variant?: Variant }) {
  const cfg = VARIANTS[variant];
  return (
    <div className="my-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
      <h3 className="font-bold text-lg mb-1">{cfg.ctaHeadline}</h3>
      <p className="text-sm text-muted mb-3">{cfg.ctaDesc}</p>
      <a
        href={LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
      >
        {cfg.ctaBtn}
      </a>
      {DISCLAIMER}
    </div>
  );
}
