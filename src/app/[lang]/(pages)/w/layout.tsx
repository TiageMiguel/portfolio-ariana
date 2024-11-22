import { getTranslation, locales } from "@/locales/translations";
import { PageParams } from "@/types/page-types";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params = [];

  for await (const locale of locales) {
    const translation = await getTranslation(locale);
    const { w } = translation.pages;

    for (const slug of Object.keys(w)) {
      params.push({
        lang: locale,
        slug: slug,
      });
    }
  }

  return params;
}

interface LayoutProps extends PageParams {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  return <div className="flex flex-col gap-12 px-4">{children}</div>;
}
