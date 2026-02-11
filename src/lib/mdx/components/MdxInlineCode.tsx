import type React from "react";

import { cn } from "~/lib/utility";

type MdxInlineCodeProps = React.HTMLAttributes<HTMLSpanElement>;

export function MdxInlineCode({ className, ...props }: MdxInlineCodeProps) {
  return (
    <code
      className={cn(
        className,
        "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-normal",
      )}
      {...props}
    />
  );
}
