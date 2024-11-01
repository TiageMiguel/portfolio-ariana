import Link from "next/link";
import type { FC, HTMLAttributes } from "react";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { Locale } from "@/locales/translations";

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  title?: string;
  titleLink?: string;
  subtitle?: string;
  paragraph?: string;
  lang?: Locale;
}

export const Paragraph: FC<ParagraphProps> = ({
  title,
  titleLink,
  subtitle,
  paragraph,
  lang,
}) => {
  return (
    <div>
      {(title || subtitle) && (
        <div className="mb-1">
          {title && !titleLink && (
            <span className="block text-lg font-semibold text-foreground">
              {title}
            </span>
          )}
          {titleLink && (
            <Link
              href={`/${lang}${titleLink}`}
              className="flex items-center gap-1 text-lg font-semibold text-foreground/80 transition-all duration-300 hover:text-blue-400"
            >
              {title}
              <ArrowUpRight weight="bold" className="text-sm" />
            </Link>
          )}
          {subtitle && (
            <span className="block font-medium text-foreground/70">
              {subtitle}
            </span>
          )}
        </div>
      )}
      <p className="text-foreground/70">{paragraph}</p>
    </div>
  );
};
