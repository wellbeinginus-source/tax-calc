"use client";

import { useState } from "react";
import { requestPayment } from "@/lib/payment";

const EXAMPLES = [
  "1세대 1주택 양도세 비과세 조건이 뭔가요?",
  "2주택자 취득세율은 얼마인가요?",
  "종부세 절세 방법이 있나요?",
  "임대소득 분리과세가 유리한 경우는?",
];

export default function TaxConsultPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"input" | "paying" | "generating" | "done">("input");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);

  async function handleSubmit() {
    if (question.trim().length < 5) {
      setError("질문을 5자 이상 입력해주세요.");
      return;
    }
    if (!agreed) {
      setError("면책 안내에 동의해주세요.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. 결제
      setStep("paying");
      const paymentId = await requestPayment();

      // 2. AI 상담
      setStep("generating");
      const res = await fetch("/api/tax-consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, question: question.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "상담 요청에 실패했습니다.");
      }

      const data = await res.json();
      setAnswer(data.answer);
      setStep("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
      setStep("input");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setQuestion("");
    setAnswer("");
    setError("");
    setStep("input");
  }

  return (
    <>
      <section className="text-center mb-8">
        <div className="text-4xl mb-3">🤖</div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">AI 세금 Q&A</h1>
        <p className="text-muted text-base max-w-md mx-auto">
          부동산 세금 궁금한 점을 AI에게 물어보세요
        </p>
        <p className="mt-2 text-sm font-medium text-primary">건당 1,900원 · 카카오페이</p>
      </section>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* 면책 배너 */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 space-y-2">
          <p>⚠️ AI가 제공하는 <strong>일반적인 세금 정보 안내</strong>이며, 세무 상담이 아닙니다.</p>
          <ul className="list-disc list-inside text-xs space-y-1">
            <li>구체적 세금 금액을 확정하지 않습니다</li>
            <li>개별 상황에 따라 실제 세금은 달라질 수 있습니다</li>
            <li>정확한 세금 신고는 반드시 세무사와 상담하세요</li>
          </ul>
        </div>

        {step !== "done" && (
          <>
            {/* 질문 입력 */}
            <div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="예: 아파트를 3년 보유 후 매도하면 양도세가 얼마나 나오나요?"
                className="w-full h-32 p-4 rounded-xl border border-card-border bg-card-bg text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={loading}
              />
              <p className="text-xs text-muted mt-1 text-right">
                {question.length}자
              </p>
            </div>

            {/* 예시 질문 */}
            {!loading && (
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setQuestion(ex)}
                    className="text-xs px-3 py-1.5 rounded-full border border-card-border bg-card-bg hover:border-primary hover:text-primary transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            )}

            {/* 에러 */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* 상태 표시 */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                <p className="text-muted">
                  {step === "paying" && "결제 진행 중..."}
                  {step === "generating" && "AI가 답변을 작성 중입니다..."}
                </p>
              </div>
            )}

            {/* 면책 동의 */}
            {!loading && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-primary"
                />
                <span className="text-xs text-muted">
                  AI가 제공하는 일반적인 세금 정보 안내이며, 개별 세무 상담이 아님을 이해합니다. 정확한 세금 계산과 신고는 세무사와 상담하겠습니다.
                </span>
              </label>
            )}

            {/* 결제 버튼 */}
            {!loading && (
              <button
                onClick={handleSubmit}
                disabled={!agreed}
                className="w-full py-4 rounded-xl bg-primary text-white font-semibold text-base hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                AI 세금 Q&A (1,900원)
              </button>
            )}
          </>
        )}

        {/* 결과 */}
        {step === "done" && answer && (
          <div className="space-y-4 animate-fade-in">
            <div className="rounded-xl border border-card-border bg-card-bg p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🤖</span>
                <h2 className="font-semibold">AI 상담 결과</h2>
              </div>
              <div className="text-sm text-muted mb-3 p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">질문:</span> {question}
              </div>
              <div className="prose prose-sm max-w-none leading-7 whitespace-pre-wrap">
                {answer}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-4 rounded-xl border border-card-border bg-card-bg font-medium text-muted hover:text-foreground transition-colors"
            >
              새 질문하기
            </button>
          </div>
        )}
      </div>
    </>
  );
}
