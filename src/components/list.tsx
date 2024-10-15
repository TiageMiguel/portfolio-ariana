import { FC, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface ListProps extends HTMLAttributes<HTMLUListElement> {}

export const List: FC<ListProps> = ({ children, className, ...props }) => {
  return (
    <ul className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </ul>
  );
};
