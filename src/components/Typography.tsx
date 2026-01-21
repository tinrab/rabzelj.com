import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utility";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      span: "",
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

const bottomGutters: Record<string, string> = {
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

type TypographyOwnProps = Omit<
  VariantProps<typeof typographyVariants>,
  "variant"
> & {
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
  const safeVariant = (variant ?? "span") as TypographyVariant;
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
