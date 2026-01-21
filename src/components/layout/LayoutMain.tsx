import type React from "react";

import { cn } from "~/lib/utility";

type LayoutMainProps = React.ComponentProps<"div">;

export function LayoutMain({ className, ...props }: LayoutMainProps) {
  return <main className={cn("mb-auto", className)} {...props} />;
}
