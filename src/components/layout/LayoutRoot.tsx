import type React from "react";

import { cn } from "~/lib/utility";

type LayoutRootProps = React.ComponentProps<"div">;

export function LayoutRoot({ className, ...props }: LayoutRootProps) {
  return (
    <div className={cn("relative flex h-svh flex-col", className)} {...props} />
  );
}
