import type React from "react";

import { Typography } from "~/components/Typography";

export function MdxContentHeading({
  lowerHeadings,
  variant,
  id,
  children,
  ...props
}: {
  lowerHeadings?: boolean;
} & React.ComponentProps<typeof Typography>) {
  const effectiveVariant = lowerHeadings
    ? variant === "h1"
      ? "h2"
      : variant === "h2"
        ? "h3"
        : variant === "h3"
          ? "h4"
          : variant
    : variant;
  const VariantComponent = effectiveVariant as React.ElementType;

  if (id) {
    return (
      <Typography id={id} gutter variant={effectiveVariant} asChild {...props}>
        <a href={`#${id}`} className="no-underline">
          <VariantComponent>{children}</VariantComponent>
        </a>
      </Typography>
    );
  }
  return (
    <Typography id={id} gutter variant={effectiveVariant} {...props}>
      {children}
    </Typography>
  );
}
