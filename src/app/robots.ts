import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: process.env.NEXT_PUBLIC_APP_URL,
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
