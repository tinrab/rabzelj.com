import type React from "react";

import { cn } from "~/lib/utility";

type LayoutMainProps = React.ComponentProps<"div">;

// className="mx-auto max-w-3xl py-8 md:py-12"

export function LayoutMain({ className, ...props }: LayoutMainProps) {
  return <main className={cn("mb-auto", className)} {...props} />;
}
