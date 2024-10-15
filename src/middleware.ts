import { NextRequest, NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { defaultLocale, locales } from "@/locales/translations";

function getLocale(request: NextRequest): string {
  const acceptedLanguage =
    request.headers.get("accept-language") ?? "en-US,en;q=0.5";
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasValidLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasValidLocale) {
    const locale = getLocale(request);

    const newUrl = new URL(
      pathname === "/" ? `/${locale}` : `/${locale}${pathname}`,
      request.url
    );

    return NextResponse.rewrite(newUrl);
  }

  // Handle non-existent (404) pages by rewriting to the locale-specific 404 page
  const response = NextResponse.next();

  if (response.status === 404) {
    const locale = getLocale(request);
    return NextResponse.rewrite(new URL(`/${locale}/not-found`, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|assets|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};