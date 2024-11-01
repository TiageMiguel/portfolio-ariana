import { Locale } from "@/locales/translations";

export interface PageParams {
  params: Promise<{
    lang: Locale;
    slug?: string;
  }>;
}
