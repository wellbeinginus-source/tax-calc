import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, phone, question, aiAnswer } = await request.json();

    if (!name || !phone || !question) {
      return NextResponse.json(
        { error: "이름, 연락처, 질문을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    // 텔레그램 알림
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const message = [
        "📋 세무사 상담 신청",
        "",
        `이름: ${name}`,
        `연락처: ${phone}`,
        "",
        `질문: ${question}`,
        "",
        `AI 답변 요약: ${aiAnswer?.slice(0, 200) || "없음"}...`,
        "",
        `시간: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
      ].join("\n");

      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consult request error:", error);
    return NextResponse.json(
      { error: "신청 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
