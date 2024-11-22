import { Metadata } from "next";

import {
  Card,
  CardContent,
  CardItem,
  CardItemProps,
  CardTitle,
} from "@/components/card";
import { generateSEOMetadata } from "@/lib/seo";
import { getTranslation } from "@/locales/translations";
import { PageParams } from "@/types/page-types";

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const { lang } = await params;
  const translation = await getTranslation(lang);

  return generateSEOMetadata({
    title: translation.pages.homepage.title,
    description: translation.pages.homepage.description,
  });
}

export default async function PageHome({ params }: PageParams) {
  const { lang } = await params;
  const translation = await getTranslation(lang);

  const cards = Object.entries(translation.pages.homepage.cards);
  const cardsHalfLength = Math.floor(cards.length / 2);
  const cardsFirstHalf = cards.slice(0, cardsHalfLength);
  const cardsSecondHalf = cards.slice(cardsHalfLength, cards.length);

  return (
    <div className="flex flex-col gap-12">
      <h1 className="sr-only">
        Ariana Soares | {translation.pages.homepage.title}
      </h1>
      <div className="px-4">
        <h2 className="text-xl font-normal leading-tight text-foreground/70 lg:text-2xl">
          <span className="font-semibold text-foreground">
            {translation.pages.homepage.about_highlighted}
          </span>
          <br />
          <span className="text-balance">
            {translation.pages.homepage.about_text}
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-2 items-start gap-4">
        <div className="col-span-full flex flex-col gap-4 md:col-span-1">
          {cardsFirstHalf.map(([key, value]) => {
            const { title, items } = value;

            return (
              <Card key={key}>
                {title && <CardTitle title={title} />}
                <CardContent>
                  {items.map((item: CardItemProps, index: number) => (
                    <CardItem key={index.toString()} {...item} lang={lang} />
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
        <div className="col-span-full flex flex-col gap-4 md:col-span-1">
          {cardsSecondHalf.map(([key, value]) => {
            const { title, items } = value;

            return (
              <Card key={key}>
                {title && <CardTitle title={title} />}
                <CardContent>
                  {items.map((item: CardItemProps, index: number) => (
                    <CardItem key={index.toString()} {...item} lang={lang} />
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
