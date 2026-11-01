import type React from "react";

import { cn } from "~/lib/utility";

type SpineRowProps = React.ComponentProps<"div">;

export function SpineRow({ className, ...props }: SpineRowProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-(--breakpoint-xl) flex-col xl:grid xl:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

type SpineMarginProps = React.ComponentProps<"div">;

export function SpineMargin({ className, ...props }: SpineMarginProps) {
  return <div className={cn("px-4 md:px-6 xl:col-span-1 xl:text-right", className)} {...props} />;
}

interface SpineBodyProps extends React.ComponentProps<"div"> {
  wide?: boolean;
}

export function SpineBody({ wide, className, ...props }: SpineBodyProps) {
  return (
    <div
      className={cn("min-w-0 px-4 md:px-6", wide ? "xl:col-span-3" : "xl:col-span-2", className)}
      {...props}
    />
  );
}

export function SpineRules() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
      <div className="border-border/60 relative mx-auto h-full max-w-(--breakpoint-xl) border-x">
        <span className="border-border absolute inset-y-0 left-1/4 border-l" />
        <span className="border-border/60 absolute inset-y-0 left-3/4 border-l" />
      </div>
    </div>
  );
}
