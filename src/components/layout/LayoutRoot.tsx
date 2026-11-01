import type React from "react";

import { SpineRules } from "~/components/layout/Spine";
import { cn } from "~/lib/utility";

type LayoutRootProps = React.ComponentProps<"div">;

export function LayoutRoot({ className, children, ...props }: LayoutRootProps) {
  return (
    <div className={cn("relative flex min-h-svh flex-col", className)} {...props}>
      <SpineRules />
      {children}
    </div>
  );
}
