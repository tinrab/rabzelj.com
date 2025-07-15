import { cva } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "~/lib/utility";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-balance font-extrabold text-4xl tracking-tight",
      h2: "scroll-m-20 text-balance font-semibold text-3xl tracking-tight",
      h3: "scroll-m-20 text-balance font-semibold text-2xl tracking-tight",
      h4: "scroll-m-20 text-balance font-semibold text-xl tracking-tight",
      body: "leading-7",
      quote: "mt-6 border-l-2 pl-6 italic",
      lead: "text-muted-foreground text-xl",
      large: "font-semibold text-lg",
      small: "font-medium text-sm leading-none",
      muted: "text-muted-foreground",
      a: "text-link underline underline-offset-4",
      mutedLink:
        "text-muted-foreground transition-colors hover:text-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

const topGutters: Record<string, string> = {
  h1: "mt-14 lg:mt-16",
  h2: "mt-10 lg:mt-12",
  h3: "mt-8",
  h4: "mt-8",
  body: "mt-4",
};

const bottomGutters: Record<string, string> = {
  h1: "mb-2",
  h2: "mb-2",
  h3: "mb-2",
};

const variantElementMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  quote: "blockquote",
  lead: "p",
  large: "div",
  small: "small",
  muted: "span",
  a: "a",
  mutedLink: "a",
} as const;

type TypographyVariant = keyof typeof variantElementMap;

// Define the component's own specific props.
interface TypographyOwnProps {
  asChild?: boolean;
  gutterTop?: boolean;
  gutterBottom?: boolean;
  gutter?: boolean;
  variant?: TypographyVariant;
  className?: string;
  children?: ReactNode;
}

type PolymorphicTypographyProps<
  E extends ElementType | undefined,
  V extends TypographyVariant | undefined,
> = TypographyOwnProps &
  Omit<
    ComponentPropsWithoutRef<
      E extends ElementType
        ? E
        : V extends TypographyVariant
          ? (typeof variantElementMap)[V]
          : (typeof variantElementMap)["body"]
    >,
    keyof TypographyOwnProps
  > & {
    asElement?: E;
    variant?: V;
  };

export function Typography<
  V extends TypographyVariant | undefined = "body",
  E extends ElementType | undefined = undefined,
>({
  asChild,
  variant = "body" as V,
  gutterTop,
  gutterBottom,
  gutter,
  asElement,
  className,
  ...props
}: PolymorphicTypographyProps<E, V>) {
  const Comp = asChild
    ? SlotPrimitive.Slot
    : (asElement ?? (variant ? variantElementMap[variant] : "p"));

  return (
    <Comp
      data-slot="typography"
      className={cn(
        typographyVariants({ variant }),
        (gutterTop || gutter) && variant && topGutters[variant],
        (gutterBottom || gutter) && variant && bottomGutters[variant],
        (gutterTop || gutterBottom || gutter) && "block",
        className,
      )}
      {...props}
    />
  );
}
