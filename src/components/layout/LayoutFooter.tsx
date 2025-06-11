import type React from "react";

import { DashedLine } from "~/components/DashedLine";
import { cn } from "~/lib/utility";

interface LayoutFooterProps extends React.ComponentProps<"div"> {
  slotProps?: {
    content?: React.ComponentProps<"div">;
  };
}

export function LayoutFooter({
  slotProps = {},
  className,
  children,
  ...restProps
}: LayoutFooterProps) {
  return (
    <footer
      className={cn("w-full", className)}
      aria-labelledby="footer-heading"
      {...restProps}
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <DashedLine orientation="horizontal" />

      <div
        {...(slotProps.content ?? {})}
        className={cn(
          // "mx-auto flex max-w-3xl px-4",
          "mx-auto flex max-w-3xl",
          slotProps.content?.className,
        )}
      >
        <div className="relative w-full">
          {/* <DashedLine
						className="-left-[2px] absolute top-0 hidden h-full md:block"
						orientation="vertical"
					/> */}

          <div className="px-4 py-4 pb-8">{children}</div>

          {/* <DashedLine
						className="-right-[2px] absolute top-0 hidden h-full md:block"
						orientation="vertical"
					/> */}
        </div>
      </div>
    </footer>
  );
}
