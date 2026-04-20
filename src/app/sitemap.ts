import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tax-calc-five.vercel.app";
  const pages = [
    "",
    "/transfer-tax",
    "/acquisition-tax",
    "/property-tax",
    "/rental-income-tax",
    "/guide/transfer-tax",
    "/guide/acquisition-tax",
    "/guide/property-tax",
    "/guide/rental-income-tax",
  ];

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/guide") ? 0.9 : 0.8,
  }));
}
