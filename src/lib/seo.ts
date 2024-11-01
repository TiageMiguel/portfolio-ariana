import { locales } from "@/locales/translations";

export interface SEOMetadataParams {
  title: string;
  description: string;
  path?: string;
  slug?: string;
}

export function generateSEOMetadata(params: SEOMetadataParams) {
  const { title, description, path, slug } = params;
  const fullPath =
    path && slug
      ? `${process.env.NEXT_PUBLIC_APP_URL}/${path}/${slug}`
      : `${process.env.NEXT_PUBLIC_APP_URL}`;

  const languages = locales.reduce(
    (acc, locale) => {
      acc[locale] =
        path && slug
          ? `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/${path}/${slug}`
          : `${process.env.NEXT_PUBLIC_APP_URL}/${locale}`;
      return acc;
    },
    {} as Record<string, string>
  );

  return {
    title,
    description,
    alternates: {
      canonical: fullPath,
      languages,
    },
  };
}
