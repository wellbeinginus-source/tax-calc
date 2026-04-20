/**
 * PortOne V2 결제 요청 + 검증 유틸
 */

interface PaymentOptions {
  amount?: number;
  productName?: string;
}

export async function requestPayment({ amount = 1900, productName = "AI 세금 상담" }: PaymentOptions = {}): Promise<string> {
  // 1. 서버에서 주문 준비
  const prepRes = await fetch("/api/payment/prepare", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  if (!prepRes.ok) throw new Error("결제 준비에 실패했습니다.");
  const { orderId, storeId, channelKey } = await prepRes.json();

  if (!storeId || !channelKey) {
    throw new Error("결제 설정이 완료되지 않았습니다.");
  }

  // 2. PortOne SDK 결제 요청
  const PortOne = await import("@portone/browser-sdk/v2");

  const response = await PortOne.requestPayment({
    storeId,
    channelKey,
    paymentId: orderId,
    orderName: productName,
    totalAmount: amount,
    currency: "CURRENCY_KRW" as const,
    payMethod: "EASY_PAY" as const,
    easyPay: { easyPayProvider: "KAKAOPAY" as const },
  } as Parameters<typeof PortOne.requestPayment>[0]);

  if (!response || response.code) {
    if (response?.code === "FAILURE_TYPE_PG" || response?.message?.includes("취소")) {
      throw new Error("결제가 취소되었습니다.");
    }
    throw new Error(response?.message || "결제에 실패했습니다.");
  }

  // 3. 서버에서 결제 검증
  const verifyRes = await fetch("/api/payment/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ paymentId: orderId, orderId, amount }),
  });

  if (!verifyRes.ok) {
    const err = await verifyRes.json();
    throw new Error(err.error || "결제 검증에 실패했습니다.");
  }

  return orderId;
}
