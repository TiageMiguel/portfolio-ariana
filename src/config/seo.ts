import { Metadata, Viewport } from "next/types";

export const defaultViewport: Viewport = {
  colorScheme: "light",
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  themeColor: "#ffffff",
  userScalable: true,
  viewportFit: "cover",
  height: "100%",
  width: "100%",
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
  title: {
    template: "%s | Ariana Soares",
    default: "Ariana Soares",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
    languages: {
      en: `${process.env.NEXT_PUBLIC_APP_URL}/en`,
      pt: `${process.env.NEXT_PUBLIC_APP_URL}/pt`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome",
        url: "/favicons/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome",
        url: "/favicons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
};
