import type React from "react";

import { cn } from "~/lib/utility";

interface BlogNoteAlertProps extends React.ComponentProps<"p"> {}

export function BlogNoteAlert({ className, ...props }: BlogNoteAlertProps) {
  return (
    <p className={cn("text-muted-foreground max-w-xl leading-relaxed", className)} {...props}>
      My notes and thoughts, jotted down for future reference. They may be outdated, inaccurate, or
      completely useless.
    </p>
  );
}
