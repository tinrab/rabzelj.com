import type React from "react";

import { cn } from "~/lib/utility";

type LinearLoaderProps = {
  square?: boolean;
  slotProps?: {
    bar?: React.ComponentProps<"div">;
  };
} & React.ComponentProps<"div">;

export function LinearLoader({
  square,
  slotProps = {},
  className,
  ...props
}: LinearLoaderProps) {
  return (
    <div
      className={cn("h-1 text-primary", square ? "" : "rounded-sm", className)}
      aria-label={props["aria-label"] ?? "loading"}
      {...props}
    >
      <div
        className={cn(
          slotProps.bar?.className,
          square ? "" : "rounded-sm",
          "h-full animate-linear-loader bg-primary/10 transition-all",
          "bg-[linear-gradient(to_right,transparent_50%,currentColor_50%,currentColor_60%,transparent_60%,transparent_71.5%,currentColor_71.5%,currentColor_84%,transparent_84%)]",
        )}
        {...(slotProps.bar ?? {})}
      />
    </div>
  );
}
