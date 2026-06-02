import type React from "react";

import { GridFadeLine } from "~/components/GridFadeLine";
import { cn } from "~/lib/utility";

interface LayoutFooterProps extends React.ComponentProps<"div"> {
  slotProps?: {
    content?: React.ComponentProps<"div">;
  };
}

export function LayoutFooter({ slotProps = {}, className, children, ...props }: LayoutFooterProps) {
  return (
    <footer
      className={cn("relative w-full overflow-hidden", className)}
      aria-labelledby="footer-heading"
      {...props}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <GridFadeLine fadeDirection="up" className="opacity-60" />

      <div
        {...(slotProps.content ?? {})}
        className={cn(
          // "mx-auto flex max-w-3xl px-4",
          // "relative z-10 mx-auto flex max-w-3xl",
          "relative z-10 mx-auto flex max-w-(--breakpoint-xl)",
          slotProps.content?.className,
        )}
      >
        <div className="relative w-full">
          <div className="px-4 py-8">{children}</div>
        </div>
      </div>
    </footer>
  );
}
