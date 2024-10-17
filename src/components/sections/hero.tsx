import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

import { LanguageSwitcher } from "@/components/switcher-language";
import { ThemeSwitcher } from "@/components/switcher-theme";
import { Locale, Translation } from "@/locales/translations";

interface HeroSectionProps {
  translation: Translation;
  lang: Locale;
}

export const HeroSection: FC<HeroSectionProps> = ({ translation, lang }) => {
  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="flex flex-row justify-between gap-4">
        <div className="size-28 rounded-full">
          <Link href={`/${lang}`} lang={lang}>
            <span className="sr-only">Ariana Soares Face</span>
            <Image
              src="/assets/pfp.jpg"
              alt="Ary's face"
              height={112}
              width={112}
              priority
              fetchPriority="high"
              loading="eager"
              className="size-full overflow-hidden rounded-full object-cover"
            />
          </Link>
        </div>
        <div className="flex flex-row gap-2 md:hidden">
          <ThemeSwitcher />
          <LanguageSwitcher lang={lang} />
        </div>
      </div>
      <p className="text-xl font-medium leading-tight text-neutral-600 dark:text-neutral-500 md:text-2xl">
        <span className="text-neutral-950 dark:text-neutral-100">
          {translation.pages.homepage.about_highlighted}
        </span>
        <br />
        {translation.pages.homepage.about_text}
      </p>
      <div className="hidden flex-row gap-2 md:flex">
        <LanguageSwitcher lang={lang} />
        <ThemeSwitcher />
      </div>
    </div>
  );
};
