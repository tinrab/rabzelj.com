import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

/*
  # lineHeight
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  extraLoose: '2.5',
*/

export const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-balance font-light text-4xl leading-[1.25] md:text-6xl lg:text-7xl",
			h2: "scroll-m-20 text-balance font-light text-3xl leading-[1.25] md:text-5xl lg:text-6xl",
			h3: "scroll-m-20 text-balance font-normal text-3xl leading-[1.25]",
			h4: "scroll-m-20 text-balance font-medium text-2xl leading-[1.25]",
			h5: "scroll-m-20 text-balance font-medium text-xl leading-[1.25]",
			h6: "scroll-m-20 text-balance font-medium text-lg leading-[1.25]",

			lead: "font-normal text-muted-foreground text-xl",
			large: "font-semibold text-lg",

			body: "text-base leading-7",

			a: "text-link no-underline hover:underline",
		},
	},
	defaultVariants: { variant: "body" },
});

const topGutters: Record<string, string> = {
	h1: "mt-14 lg:mt-16",
	h2: "mt-12 lg:mt-14",
	h3: "mt-10",
	h4: "mt-9",
	h5: "mt-4",
	h6: "mt-4",
	// body: 'mt-3',
};

const bottomGutters: Record<string, string> = {
	h1: "mb-10 lg:mb-12",
	h2: "mb-8 lg:mb-10",
	h3: "mb-4 lg:mb-5",
	h4: "mb-4",
	h5: "mb-4",
	h6: "mb-4",
	body: "mb-4",
};

export type TypographyProps = {
	gutterTop?: boolean;
	gutterBottom?: boolean;
	gutter?: boolean;
	asVariant?: boolean;
} & React.HTMLAttributes<HTMLElement> &
	VariantProps<typeof typographyVariants>;

export const Typography = React.forwardRef<
	HTMLElement,
	TypographyProps & { asChild?: boolean }
>(
	(
		{
			asChild,
			variant = "body",
			gutterTop,
			gutterBottom,
			gutter,
			asVariant,
			className,
			...restProps
		},
		ref,
	) => {
		const Comp: React.ElementType = asChild
			? Slot
			: asVariant
				? variant === "body" || variant === "lead" || variant === "large"
					? "p"
					: (variant as React.ElementType)
				: "span";

		return (
			<Comp
				ref={ref}
				className={cn(
					typographyVariants({ variant }),
					gutterTop || gutter ? ((variant && topGutters[variant]) ?? "") : "",
					gutterBottom || gutter
						? ((variant && bottomGutters[variant]) ?? "")
						: "",
					gutterTop || gutterBottom || gutter ? "block" : "",
					className,
				)}
				{...restProps}
			/>
		);
	},
);
Typography.displayName = "Typography";
