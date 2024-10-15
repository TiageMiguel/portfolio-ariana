import Link from "next/link";
import { FC, HTMLAttributes } from "react";

import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { cn } from "@/lib/utils";

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  title: string;
  description?: string;
  badge?: string;
  link?: string;
  link_whatsapp?: string;
  lang?: string;
}

export const ListItem: FC<ListItemProps> = ({
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
  let wrapperClasses = "";
  let finalLink = link ? link : link_whatsapp ? link_whatsapp : "/";

  if (description) {
    wrapperClasses += "py-4 bg-neutral-100 dark:bg-neutral-950 mb-2 rounded-lg";
  }

  if (!link && link_whatsapp) {
    finalLink = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_ID}?text=${encodeURIComponent(
      link_whatsapp
    )}`;
  }

  return (
    <li className={cn("group px-4", wrapperClasses, className)} {...props}>
      <Link
        href={finalLink}
        target={!finalLink.startsWith("/") ? "_blank" : "_self"}
        rel={!finalLink.startsWith("/") ? "external" : ""}
        lang={lang}
      >
        <div className="flex flex-row items-center justify-between">
          <p className="flex flex-col-reverse items-start justify-start text-xl font-medium text-neutral-900 transition-all duration-300 group-hover:text-blue-600 dark:text-neutral-100 dark:group-hover:text-blue-400 md:flex-row">
            {title}
            {badge && (
              <span className="mb-1 rounded-full border-2 border-blue-600 px-2.5 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400 dark:text-blue-400 md:ml-2">
                {badge}
              </span>
            )}
          </p>
          <ArrowUpRight
            size={20}
            weight="bold"
            className="text-neutral-900 transition-all duration-500 group-hover:text-blue-600 dark:text-neutral-100"
          />
        </div>
        {description && (
          <div className="w-11/12">
            <p className="text-sm leading-snug text-neutral-600 dark:text-neutral-400">
              {description}
            </p>
          </div>
        )}
      </Link>
    </li>
  );
};
