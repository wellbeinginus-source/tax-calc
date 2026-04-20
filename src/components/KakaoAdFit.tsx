export default function KakaoAdFit({
  unit = "DAN-4VuVQbzpRdtgGygI",
  width = 728,
  height = 90,
}: {
  unit?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="my-6 flex justify-center">
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={String(width)}
        data-ad-height={String(height)}
      />
    </div>
  );
}
