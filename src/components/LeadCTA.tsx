export default function LeadCTA() {
  return (
    <div className="mt-8 p-5 rounded-xl border border-primary/30 bg-primary/5">
      <p className="font-semibold text-base mb-1">이 물건, 전문가 확인이 필요하신가요?</p>
      <p className="text-sm text-muted mb-4">법무사 검토 · 대출 한도 조회를 무료로 받아보세요.</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="https://forms.kakao.com/placeholder-legal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 px-4 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          법무사 무료 상담 신청
        </a>
        <a
          href="https://forms.kakao.com/placeholder-loan"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-2.5 px-4 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-colors"
        >
          대출 한도 무료 조회
        </a>
      </div>
    </div>
  );
}
