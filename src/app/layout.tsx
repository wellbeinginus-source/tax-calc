import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "부동산 세금 계산기 | 양도세·취득세·종부세·임대소득세 무료 계산",
    template: "%s | 부동산 세금 계산기",
  },
  description:
    "부동산 양도소득세, 취득세, 종합부동산세, 임대소득세를 무료로 계산하세요. 2026년 최신 세율 반영.",
  keywords: [
    "양도세 계산기",
    "취득세 계산기",
    "종부세 계산기",
    "임대소득세 계산기",
    "부동산 세금",
    "양도소득세",
    "종합부동산세",
  ],
  openGraph: {
    title: "부동산 세금 계산기 | 양도세·취득세·종부세·임대소득세",
    description:
      "부동산 세금 한 곳에서 계산. 양도세, 취득세, 종부세, 임대소득세 무료 계산기.",
    type: "website",
    locale: "ko_KR",
  },
  robots: { index: true, follow: true },
};

const NAV_ITEMS = [
  { href: "/transfer-tax", label: "양도세" },
  { href: "/acquisition-tax", label: "취득세" },
  { href: "/property-tax", label: "종부세" },
  { href: "/rental-income-tax", label: "임대소득세" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-6L251D0CYV"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-6L251D0CYV');
            `,
          }}
        />
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3913442122539155"
          crossOrigin="anonymous"
        />
        {/* 카카오 애드핏 */}
        <script async src="//t1.daumcdn.net/kas/static/ba.min.js" />
      </head>
      <body className="min-h-full flex flex-col">
        <header className="border-b border-card-border bg-card-bg sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="text-lg font-bold text-primary">
              부동산 세금 계산기
            </Link>
            <nav className="flex gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-sm rounded-md hover:bg-accent transition-colors text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-card-border py-6 text-center text-sm text-muted">
          <div className="max-w-5xl mx-auto px-4">
            <p>
              본 계산기는 참고용이며, 정확한 세금은 세무사 상담을 권장합니다.
            </p>
            <p className="mt-1">
              운영: 온기획(ON) | &copy; {new Date().getFullYear()} 부동산 세금
              계산기. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
