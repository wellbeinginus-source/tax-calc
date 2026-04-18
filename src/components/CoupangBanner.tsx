const COUPANG_LINKS = {
  goldbox: "https://link.coupang.com/a/ep0BMn",
};

const BOOKS = [
  {
    title: "대한민국 부동산 절세 전략",
    desc: "양도세·취득세·종부세, 합법적으로 줄이는 방법",
    link: COUPANG_LINKS.goldbox,
  },
  {
    title: "나는 부동산 세금이 두렵지 않다",
    desc: "1세대 1주택부터 다주택까지 세금 완전 정복",
    link: COUPANG_LINKS.goldbox,
  },
  {
    title: "부동산 양도소득세 실전 가이드",
    desc: "2026년 최신 세율·공제 기준 반영 실전서",
    link: COUPANG_LINKS.goldbox,
  },
];

export function CoupangBanner() {
  return (
    <div className="my-8 p-4 bg-card-bg border border-card-border rounded-xl text-center">
      <a
        href={COUPANG_LINKS.goldbox}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-[#e52528] text-white font-bold rounded-lg hover:bg-[#c91f22] transition-colors"
      >
        쿠팡 오늘의 특가 보러가기
      </a>
      <p className="mt-2 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
}

export function BookRecommendations() {
  return (
    <section className="my-10">
      <h2 className="text-xl font-bold mb-4">부동산 세금 추천 도서</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {BOOKS.map((book) => (
          <a
            key={book.title}
            href={book.link}
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
      <p className="mt-3 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </section>
  );
}

export function TaxConsultCTA() {
  return (
    <div className="my-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
      <h3 className="font-bold text-lg mb-1">세금 신고, 직접 하기 어려우신가요?</h3>
      <p className="text-sm text-muted mb-3">
        양도소득세 신고는 실수 시 가산세가 붙습니다. 전문가 도움을 받아보세요.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href={COUPANG_LINKS.goldbox}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          세금 관련 도서 보기
        </a>
      </div>
      <p className="mt-2 text-xs text-muted">
        이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를
        제공받습니다.
      </p>
    </div>
  );
}
