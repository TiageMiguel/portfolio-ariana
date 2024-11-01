import Link from "next/link";
import { FC, HTMLAttributes } from "react";

import { ArrowUpRight, Plus } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-neutral-100 p-8 dark:bg-neutral-950">
      {children}
    </div>
  );
};

export const CardTitle = ({ title }: { title: String }) => {
  return (
    <h3 className="text-2xl font-semibold leading-snug tracking-tight">
      {title}
    </h3>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <ul className="flex flex-col gap-4">{children}</ul>;
};

export interface CardItemProps extends HTMLAttributes<HTMLLIElement> {
  key?: string;
  title: string;
  description?: string;
  badge?: string;
  link?: string;
  link_whatsapp?: string;
  lang?: string;
  external?: boolean;
}

export const CardItem: FC<CardItemProps> = ({
  children,
  className,
  title,
  description,
  badge,
  link,
  link_whatsapp,
  lang,
  ...props
}) => {
  let linkAttributes = {};
  let finalLink = link ? link : link_whatsapp ? link_whatsapp : "/";

  if (finalLink.startsWith("/")) {
    finalLink = `/${lang}${finalLink}`;
  }

  if (!link && link_whatsapp) {
    finalLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_ID}?text=${encodeURIComponent(
      link_whatsapp
    )}`;
  }

  const isExternalLink = !finalLink.startsWith("/");

  if (isExternalLink) {
    linkAttributes = {
      rel: "noopener noreferrer",
      target: "_blank",
    };
  }

  return (
    <li className={cn("group list-none", className)} {...props}>
      <Link href={finalLink} hrefLang={lang} {...linkAttributes}>
        <ItemContent
          title={title}
          description={description}
          badge={badge}
          external={isExternalLink}
        />
      </Link>
    </li>
  );
};

function ItemContent({ title, description, badge, external }: CardItemProps) {
  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <p className="font-base flex flex-col-reverse items-start justify-start text-lg text-neutral-900 transition-all duration-300 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-blue-400 md:flex-row">
          {title}
          {badge && (
            <span className="mb-1 mt-2 rounded-full border-2 border-blue-600 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400 md:ml-2 md:mt-0">
              {badge}
            </span>
          )}
        </p>
        {external ? (
          <ArrowUpRight
            size={18}
            weight="bold"
            className="text-neutral-900 transition-all duration-500 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-blue-400"
          />
        ) : (
          <Plus
            size={18}
            weight="bold"
            className="text-neutral-900 transition-all duration-500 group-hover:text-blue-600 dark:text-neutral-300 dark:group-hover:text-blue-400"
          />
        )}
      </div>
      {description && (
        <div className="w-11/12">
          <p className="text-sm leading-snug text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      )}
    </>
  );
}
