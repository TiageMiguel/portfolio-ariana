import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: process.env.NEXT_PUBLIC_APP_URL!,
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: `${process.env.NEXT_PUBLIC_APP_URL}/pt`,
          en: `${process.env.NEXT_PUBLIC_APP_URL}/en`,
        },
      },
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/image-consultancy`,
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: `${process.env.NEXT_PUBLIC_APP_URL}/pt/image-consultancy`,
          en: `${process.env.NEXT_PUBLIC_APP_URL}/en/image-consultancy`,
        },
      },
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
