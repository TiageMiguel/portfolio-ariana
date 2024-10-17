import Link from "next/link";

import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

import { List } from "@/components/list";
import { ListItem } from "@/components/list-item";
import { HeroSection } from "@/components/sections/hero";
import { Socials } from "@/components/socials";
import { getTranslation } from "@/locales/translations";
import { PageParams } from "@/types/page-types";

export async function generateMetadata({ params: { lang } }: PageParams) {
  const translation = await getTranslation(lang);

  return {
    title: translation.pages.image_consultancy.title,
    description: translation.pages.image_consultancy.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}/image-consultancy`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_APP_URL}/en/image-consultancy`,
        pt: `${process.env.NEXT_PUBLIC_APP_URL}/pt/image-consultancy`,
      },
    },
  };
}

export default async function PageImageConsulting({
  params: { lang },
}: PageParams) {
  const translation = await getTranslation(lang);

  return (
    <main
      id="main-content"
      className="relative flex min-h-screen flex-col items-center justify-center py-12"
    >
      <h1 className="sr-only">
        Ariana Soares | {translation.pages.image_consultancy.title}
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="col-span-1">
            <HeroSection translation={translation} lang={lang} />
            <Link
              href={`/${lang}`}
              hrefLang={lang}
              className="mt-4 flex flex-nowrap items-center gap-1 px-4 text-sm text-neutral-600 dark:text-neutral-400"
            >
              <ArrowLeft className="text-base" />
              <span>{translation.acessibility.back_homepage}</span>
            </Link>
          </div>
          <div className="col-span-1">
            <List>
              {Object.entries(
                translation.pages.image_consultancy.highlighted_links
              ).map(([key, value]) => (
                <ListItem key={key} lang={lang} {...value} />
              ))}
            </List>
            <div className="mt-12 px-4 md:col-start-2">
              <Socials translation={translation} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
