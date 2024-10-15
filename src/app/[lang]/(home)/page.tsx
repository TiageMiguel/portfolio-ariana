import { List } from "@/components/list";
import { ListItem } from "@/components/list-item";
import { HeroSection } from "@/components/sections/hero";
import { Socials } from "@/components/socials";
import { getTranslation } from "@/locales/translations";
import { PageParams } from "@/types/page-types";

export async function generateMetadata({ params: { lang } }: PageParams) {
  const translation = await getTranslation(lang);

  return {
    title: translation.pages.homepage.title,
    description: translation.pages.homepage.description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
      languages: {
        en: `${process.env.NEXT_PUBLIC_APP_URL}/en`,
        pt: `${process.env.NEXT_PUBLIC_APP_URL}/pt`,
      },
    },
  };
}

export default async function PageHome({ params: { lang } }: PageParams) {
  const translation = await getTranslation(lang);

  return (
    <main
      id="main-content"
      className="relative flex min-h-screen flex-col items-center justify-center py-12"
    >
      <h1 className="sr-only">
        Ariana Soares | {translation.pages.homepage.title}
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="col-span-1">
            <HeroSection translation={translation} lang={lang} />
          </div>
          <div className="col-span-1">
            <List>
              {Object.entries(translation.pages.homepage.highlighted_links).map(
                ([key, value]) => (
                  <ListItem key={key} lang={lang} {...value} />
                )
              )}
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
