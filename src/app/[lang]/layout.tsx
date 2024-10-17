import Link from "next/link";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import { ViewTransitions } from "next-view-transitions";

import { defaultMetadata, defaultViewport } from "@/config/seo";
import "@/globals.css";
import { defaultLocale, getTranslation, locales } from "@/locales/translations";
import { ThemeProvider } from "@/providers/theme-provider";
import { PageParams } from "@/types/page-types";

export const dynamic = "force-static";
export const viewport = defaultViewport;
export const metadata = defaultMetadata;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps extends PageParams {
  children: React.ReactNode;
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const lang = params.lang ?? defaultLocale;
  const translation = await getTranslation(lang);

  return (
    <ViewTransitions>
      <html lang={lang} suppressHydrationWarning>
        <body
          className={`${GeistSans.variable} scroll-smooth bg-background font-sans text-foreground antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <Link href="#main-content" className="sr-only focus:not-sr-only">
              {translation.acessibility.skip_content}
            </Link>
            {children}
          </ThemeProvider>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  );
}
