import type React from "react";

import { cn } from "~/lib/utility";

type StructuralGridProps = React.HTMLAttributes<HTMLDivElement>;

export function StructuralGrid({ className, ...props }: StructuralGridProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      {...props}
    >
      <div className="border-border/70 absolute inset-y-0 left-1/2 w-full max-w-(--breakpoint-xl) -translate-x-1/2 border-x">
        <span className="border-border/50 absolute inset-y-0 left-1/2 border-l" />
        <span className="border-border/35 absolute inset-y-0 left-1/4 hidden border-l md:block" />
        <span className="border-border/35 absolute inset-y-0 left-3/4 hidden border-l md:block" />
      </div>
    </div>
  );
}
