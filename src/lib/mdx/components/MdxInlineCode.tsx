import type React from "react";

import { cn } from "~/lib/utility";

type MdxInlineCodeProps = React.HTMLAttributes<HTMLSpanElement>;

export function MdxInlineCode({ className, ...props }: MdxInlineCodeProps) {
  return (
    <code
      className={cn(
        className,
        "bg-muted relative rounded px-1 py-0.5 font-mono text-sm font-normal",
      )}
      {...props}
    />
  );
}
