import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LanguageSwitcher } from "@/components/switcher-language";
import { ThemeSwitcher } from "@/components/switcher-theme";
import { defaultMetadata, defaultViewport } from "@/config/seo";
import { defaultLocale, getTranslation, locales } from "@/locales/translations";
import { ThemeProvider } from "@/providers/theme-provider";
import { PageParams } from "@/types/page-types";

import "../../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const dynamic = "force-static";
export const viewport = defaultViewport;
export const metadata = defaultMetadata;

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

interface LayoutProps extends PageParams {
  children: React.ReactNode;
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const { lang } = params;
  const translation = await getTranslation(lang ?? defaultLocale);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} relative scroll-smooth bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Link href="#main-content" className="sr-only focus:not-sr-only">
            {translation.acessibility.skip_content}
          </Link>
          <main
            id="main-content"
            className="flex-start relative flex min-h-screen items-start justify-center py-16"
          >
            <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 h-16 bg-gradient-to-b from-background/0 to-background" />
            <div className="gradient-background z-1 pointer-events-none fixed inset-0"></div>
            <div className="container z-10 mx-auto max-w-5xl">
              <div className="gap- flex flex-col gap-6">
                <div className="flex flex-row justify-between px-4">
                  <div className="size-32 rounded-full lg:size-40">
                    <Link href={`/${lang}`} lang={lang}>
                      <span className="sr-only">Ariana Soares Image</span>
                      <Image
                        src="/assets/pfp.jpg"
                        alt="Ary's face"
                        height={144}
                        width={144}
                        priority
                        fetchPriority="high"
                        loading="eager"
                        className="size-full overflow-hidden rounded-full object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex flex-row">
                    <ThemeSwitcher />
                    <LanguageSwitcher lang={lang} />
                  </div>
                </div>
                {children}
              </div>
            </div>
          </main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
