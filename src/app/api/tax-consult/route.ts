import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `당신은 한국 부동산 세금 전문 AI 상담사입니다.
양도소득세, 취득세, 종합부동산세, 임대소득세에 대해 답변합니다.

규칙:
1. 질문에 대해 구체적이고 실용적인 답변을 제공하세요.
2. 관련 세율, 공제, 비과세 조건을 포함하세요.
3. 2~3문장 단위로 문단을 나누고, 핵심은 굵게(**) 표시하세요.
4. 의료/법률(소송) 조언은 하지 마세요.
5. 답변 마지막에 반드시 다음 문구를 포함하세요:

⚠️ 본 상담은 AI가 제공하는 참고용 정보입니다. 정확한 세금 신고와 절세 전략은 반드시 세무사와 상담하세요.`;

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
