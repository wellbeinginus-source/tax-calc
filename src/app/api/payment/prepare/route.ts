import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();
    const orderId = `TAX_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    return NextResponse.json({
      orderId,
      amount: amount || 1900,
      storeId: process.env.PORTONE_STORE_ID,
      channelKey: process.env.PORTONE_CHANNEL_KEY,
    });
  } catch {
    return NextResponse.json(
      { error: "결제 준비 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
