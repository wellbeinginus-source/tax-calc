"use client";

import { useEffect, useRef } from "react";

export default function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    try {
      const adsByGoogle = (window as any).adsbygoogle || [];
      adsByGoogle.push({});
    } catch {
      // AdSense not loaded yet — ok during dev
    }
  }, []);

  return (
    <div ref={containerRef} className="my-8 text-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-3913442122539155"
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
