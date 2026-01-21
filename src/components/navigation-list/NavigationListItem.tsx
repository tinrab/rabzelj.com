import { mergeProps, useRender } from "@base-ui/react";

import { cn } from "~/lib/utility";

interface NavigationListItemProps extends useRender.ComponentProps<"div"> {}

export function NavigationListItem({
  render,
  className,
  ...props
}: NavigationListItemProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        className: cn("relative flex w-full items-center px-2 py-2", className),
      },
      props,
    ),
    state: {
      slot: "navigation-list-item",
    },
  });
}
