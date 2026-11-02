import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utility";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      span: "",
      h1: "scroll-m-20 text-balance text-4xl font-normal leading-[1.1] tracking-tight md:text-5xl",
      h2: "scroll-m-20 text-balance text-3xl font-medium leading-tight tracking-tight",
      h3: "scroll-m-20 text-balance text-xl font-medium leading-snug tracking-normal",
      h4: "scroll-m-20 text-balance text-lg font-medium leading-snug",
      body: "leading-[1.75]",
      quote: "mt-6 border-l-2 border-link pl-6 text-muted-foreground",
      lead: "text-muted-foreground text-xl leading-normal",
      large: "font-medium text-lg",
      small: "font-medium text-sm leading-none",
      muted: "text-muted-foreground",
      a: "text-foreground underline decoration-link decoration-2 underline-offset-4 transition-colors hover:decoration-foreground",
      mutedLink: "text-muted-foreground transition-colors hover:text-foreground",
    },
  },
  defaultVariants: { variant: "body" },
});

const topGutters: Partial<Record<TypographyVariant, string>> = {
  h1: "mt-12 lg:mt-14",
  h2: "mt-10 lg:mt-12",
  h3: "mt-8",
  h4: "mt-8",
  body: "mt-6",
  quote: "mt-6",
  lead: "mt-6",
  large: "mt-6",
  small: "mt-6",
  muted: "mt-6",
};

const bottomGutters: Partial<Record<TypographyVariant, string>> = {
  h1: "mb-4",
  h2: "mb-3",
  h3: "mb-3",
  h4: "mb-2",
  body: "mb-3",
  quote: "mb-4",
  lead: "mb-4",
  large: "mb-4",
  small: "mb-4",
  muted: "mb-4",
};

const variantElementMap = {
  span: "span",
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

type VariantElementMap = typeof variantElementMap;

type TypographyVariant = keyof VariantElementMap;

type TypographyOwnProps = Omit<VariantProps<typeof typographyVariants>, "variant"> & {
  gutterTop?: boolean;
  gutterBottom?: boolean;
  gutter?: boolean;
};

export type TypographyProps<V extends TypographyVariant> = {
  variant?: V;
} & TypographyOwnProps &
  useRender.ComponentProps<VariantElementMap[V]>;

export function Typography<V extends TypographyVariant = "span">({
  render,
  variant,
  gutterTop,
  gutterBottom,
  gutter,
  className,
  ...props
}: TypographyProps<V>) {
  const safeVariant: TypographyVariant = variant ?? "span";
  const defaultTagName = variantElementMap[safeVariant];

  return useRender({
    defaultTagName,
    props: mergeProps(
      {
        className: cn(
          typographyVariants({ variant: safeVariant }),
          (gutterTop || gutter) && topGutters[safeVariant],
          (gutterBottom || gutter) && bottomGutters[safeVariant],
          (gutterTop || gutterBottom || gutter) && "block",
          className,
        ),
      },
      props,
    ),
    render,
    state: {
      slot: "typography",
      variant: safeVariant,
    },
  });
}
