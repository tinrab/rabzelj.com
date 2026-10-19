import type React from "react";

import { Typography } from "~/components/Typography";

export function MdxContentHeading({
  lowerHeadings,
  variant,
  id,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  lowerHeadings?: boolean;
  variant: "h1" | "h2" | "h3";
}) {
  const effectiveVariant = lowerHeadings
    ? variant === "h1"
      ? "h2"
      : variant === "h2"
        ? "h3"
        : "h4"
    : variant;

  return (
    <Typography id={id} gutter variant={effectiveVariant} {...props}>
      {id ? (
        <a href={`#${id}`} className="no-underline">
          {children}
        </a>
      ) : (
        children
      )}
    </Typography>
  );
}
