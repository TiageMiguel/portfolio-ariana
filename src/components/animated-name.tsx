import type { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface AnimatedNameProps extends HTMLAttributes<HTMLHeadingElement> {
  pageTitle?: string;
  name?: string;
  animatedName?: string;
  className?: string;
}

export const AnimatedName: FC<AnimatedNameProps> = ({
  className,
  pageTitle,
  name = "Ariana Soares",
  animatedName = "MarkyKay Beauty Consultant & Image Consultant",
  ...props
}) => {
  return (
    <h1
      className={cn(
        "text-2xl font-medium leading-tight text-foreground/60",
        className
      )}
      {...props}
    >
      <span className="sr-only">{name}</span>
      {pageTitle && <span className="block text-foreground">{pageTitle}</span>}
      <span aria-hidden="true" className="group relative block overflow-hidden">
        <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-full">
          {name.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 48}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
        <span className="absolute left-0 top-0 inline-block translate-y-full transition-all duration-300 ease-in-out group-hover:translate-y-0">
          {animatedName.split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block"
              style={{ transitionDelay: `${index * 48}ms` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </span>
    </h1>
  );
};
