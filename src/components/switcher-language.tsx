"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import type { FC } from "react";

import { Translate } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Locale } from "@/locales/translations";

interface LanguageSwitcherProps {
  lang: Locale;
  align?: "start" | "center" | "end";
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  lang,
  align = "end",
}) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Translate className="text-xl" />
          <span className="sr-only">Change Website Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44" align={align}>
        <LanguageSwitcherGroup pathname={pathname} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const LanguageSwitcherGroup = ({ pathname }: { pathname: string }) => {
  const getLocalizedPath = (newLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale;
    return `/${segments.join("/")}`;
  };

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Link href={getLocalizedPath("en")} hrefLang="en">
          <span className="mr-2 text-lg">🇺🇸</span>
          English
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={getLocalizedPath("pt")} hrefLang="pt">
          <span className="mr-2 text-lg">🇵🇹</span>
          Português
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href={getLocalizedPath("pt-BR")} hrefLang="pt-BR">
          <span className="mr-2 text-lg">🇧🇷</span>
          Português (Brasil)
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
};
