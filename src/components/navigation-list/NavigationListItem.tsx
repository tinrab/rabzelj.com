import { Slot as SlotPrimitive } from "radix-ui";
import type React from "react";

import { cn } from "~/lib/utility";

export type NavigationListItemProps = {
  asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export function NavigationListItem({
  asChild,
  className,
  ...props
}: NavigationListItemProps) {
  const Comp = asChild ? SlotPrimitive.Slot : "div";
  return (
    <Comp
      className={cn("relative flex w-full items-center px-2 py-2", className)}
      {...props}
    />
  );
}
