import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { cn } from "~/lib/utility";

export type NavigationListItemProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export function NavigationListItem({
  asChild,
  className,
  ...restProps
}: NavigationListItemProps) {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp
      className={cn("relative flex w-full items-center px-2 py-2", className)}
      {...restProps}
    />
  );
}
