import { MetadataRoute } from "next";

import { locales } from "@/locales/translations";

interface SitemapEntry {
  url: string;
  lastModified: Date;
  alternates: {
    languages: Record<string, string>;
  };
  changeFrequency: string;
  priority: number;
}

const pages = [
  "",
  "/w/work",
  "/w/marykay",
  "/w/marykay-team",
  "/w/image-consultancy",
  "/w/transform-wardrobe",
];

const createAlternates = (
  page: string,
  baseUrl: string
): Record<string, string> => {
  return locales.reduce(
    (acc, locale) => {
      acc[locale] = `${baseUrl}/${locale}${page}`;
      return acc;
    },
    {} as Record<string, string>
  );
};

const createSitemapEntry = (page: string, baseUrl: string): SitemapEntry => {
  const slashCount = (page.match(/\//g) || []).length;

  return {
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    alternates: {
      languages: createAlternates(page, baseUrl),
    },
    changeFrequency: "monthly",
    priority: slashCount === 1 ? 1 : 0.8,
  };
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const sitemapEntries = pages.map((page) => createSitemapEntry(page, baseUrl));

  return sitemapEntries as MetadataRoute.Sitemap;
}
