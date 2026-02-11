import { mergeProps, useRender } from "@base-ui/react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utility";

const navigationListLinkVariants = cva(
  "relative flex w-full cursor-pointer items-center px-2 py-2 focus:outline-hidden data-disabled:pointer-events-none data-disabled:cursor-auto data-disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-muted-foreground hover:text-foreground focus:text-foreground",
        solid:
          "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface NavigationListLinkProps
  extends useRender.ComponentProps<"button">, VariantProps<typeof navigationListLinkVariants> {
  selected?: boolean;
  disabled?: boolean;
}

export function NavigationListLink({
  selected,
  disabled,
  variant,
  render,
  className,
  ...props
}: NavigationListLinkProps) {
  return useRender({
    defaultTagName: "button",
    render,
    props: mergeProps<"button">(
      {
        className: cn(navigationListLinkVariants({ variant }), className),
        "aria-selected": selected,
        "aria-disabled": disabled,
      },
      { ["data-disabled" as string]: disabled },
      props,
    ),
    state: {
      slot: "navigation-list-link",
    },
  });
}
