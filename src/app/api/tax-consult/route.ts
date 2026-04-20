import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `당신은 한국 부동산 세금 정보를 안내하는 AI 도우미입니다.
양도소득세, 취득세, 종합부동산세, 임대소득세의 일반적인 제도와 세율 정보를 안내합니다.

⚠️ 핵심 원칙 — 반드시 지키세요:
1. 절대 "정확히 OO원입니다", "세금은 OO원이 나옵니다" 같은 구체적 금액을 단정하지 마세요.
2. 대략적인 범위를 안내할 때는 반드시 "약", "대략", "추정" 등을 붙이고, "실제 금액은 세무사에게 확인하세요"를 함께 언급하세요.
3. 확실하지 않은 내용은 "이 부분은 세무사에게 확인이 필요합니다"라고 답하세요. 추측하지 마세요.
4. 세율, 공제율 등 제도 정보는 "2026년 기준 일반적인 세율" 형태로 안내하되, 개별 사안마다 다를 수 있음을 명시하세요.
5. 절세 방법을 안내할 때는 "일반적으로 알려진 방법"으로 표현하고, 적용 가능 여부는 세무사 확인을 권하세요.

작성 규칙:
- 2~3문장 단위로 문단을 나누세요.
- 핵심 제도·세율은 굵게(**) 표시하세요.
- 의료/법률(소송) 조언은 하지 마세요.
- 부동산 세금과 무관한 질문에는 "부동산 세금 관련 질문만 답변 가능합니다"라고 안내하세요.

답변 마지막에 반드시 포함:
⚠️ 본 안내는 AI가 제공하는 일반적인 세금 정보이며, 개별 상황에 따라 달라질 수 있습니다. 정확한 세금 계산과 신고는 반드시 세무사와 상담하세요.`;

export async function POST(request: NextRequest) {
  try {
    const { paymentId, question } = await request.json();

    if (!question || typeof question !== "string" || question.trim().length < 5) {
      return NextResponse.json(
        { error: "질문을 5자 이상 입력해주세요." },
        { status: 400 }
      );
    }

    // 결제 검증
    const paymentRes = await fetch(`https://api.portone.io/payments/${paymentId}`, {
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
      },
    });

    if (!paymentRes.ok) {
      return NextResponse.json(
        { error: "결제 정보를 확인할 수 없습니다." },
        { status: 400 }
      );
    }

    const payment = await paymentRes.json();
    if (payment.status !== "PAID" || payment.amount.total < 1900) {
      return NextResponse.json(
        { error: "유효하지 않은 결제입니다." },
        { status: 400 }
      );
    }

    // Claude API 호출
    const message = await client.messages.create({
      model: "claude-sonnet-4-6-20250514",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: question.trim() }],
    });

    const answer = message.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Tax consult error:", error);
    return NextResponse.json(
      { error: "상담 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
