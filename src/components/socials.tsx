import Link from "next/link";
import type { FC } from "react";

import { Asterisk } from "@phosphor-icons/react/dist/ssr";

import { Translation } from "@/locales/translations";

interface SocialsProps {
  translation: Translation;
}

export const Socials: FC<SocialsProps> = ({ translation }) => {
  return (
    <div>
      <p className="mb-4 text-balance leading-tight text-neutral-700 dark:text-neutral-400">
        {translation.socials.description}
      </p>
      <ul className="mt-1 flex flex-col gap-2">
        {Object.entries(translation.socials.list).map(([key, value]) => (
          <li key={key} className="flex flex-col items-start justify-start">
            <Link
              href={value.link}
              target="_blank"
              className="text-blue-600 transition-all duration-300 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
            >
              {value.handle}
            </Link>
            <span className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
              <Asterisk /> {value.social}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
