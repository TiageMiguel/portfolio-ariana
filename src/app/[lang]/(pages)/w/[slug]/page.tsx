import { Metadata } from "next";
import { notFound } from "next/navigation";

import { AnimatedName } from "@/components/animated-name";
import { Paragraph, ParagraphProps } from "@/components/paragraph";
import { generateSEOMetadata } from "@/lib/seo";
import { Locale, getTranslation } from "@/locales/translations";
import { PageParams } from "@/types/page-types";

async function getTranslatedPageBySlug({
  lang,
  slug,
}: {
  lang: Locale;
  slug: string;
}) {
  const translation = await getTranslation(lang);
  const { w } = translation.pages;

  return w[slug as keyof typeof w];
}

export async function generateMetadata({
  params,
}: PageParams): Promise<Metadata> {
  const slug = (await params).slug!;
  const lang = (await params).lang as Locale;
  const page = await getTranslatedPageBySlug({ lang, slug });

  if (!page) {
    return {};
  }

  return generateSEOMetadata({
    title: page.title,
    description: page.description,
    path: "w",
    slug,
  });
}

export default async function Page({ params }: PageParams) {
  const slug = (await params).slug!;
  const lang = (await params).lang! as Locale;
  const page = await getTranslatedPageBySlug({ lang, slug });

  if (!page) {
    notFound();
  }

  return (
    <>
      <AnimatedName pageTitle={page.title} animatedName={page.animatedName} />
      <div className="flex flex-col gap-8">
        {page.paragraphs.map((paragraph: ParagraphProps, index) => (
          <Paragraph
            key={`paragraph-${lang}-${slug}-${index}`}
            title={paragraph?.title}
            titleLink={paragraph?.titleLink}
            subtitle={paragraph?.subtitle}
            paragraph={paragraph?.paragraph}
            lang={lang}
          />
        ))}
      </div>
    </>
  );
}
