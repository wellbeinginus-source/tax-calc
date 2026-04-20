import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { paymentId, amount } = await request.json();

    const res = await fetch(`https://api.portone.io/payments/${paymentId}`, {
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "결제 검증에 실패했습니다." },
        { status: 400 }
      );
    }

    const payment = await res.json();

    if (payment.amount.total !== amount) {
      return NextResponse.json(
        { error: "결제 금액이 일치하지 않습니다." },
        { status: 400 }
      );
    }

    if (payment.status !== "PAID") {
      return NextResponse.json(
        { error: "결제가 완료되지 않았습니다." },
        { status: 400 }
      );
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json(
      { error: "결제 검증 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
