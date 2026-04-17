import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tax-calc.vercel.app";
  const pages = [
    "",
    "/transfer-tax",
    "/acquisition-tax",
    "/property-tax",
    "/rental-income-tax",
  ];

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));
}
