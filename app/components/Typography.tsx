import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

export const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 text-balance font-light text-4xl md:text-6xl lg:text-7xl",
			h2: "scroll-m-20 text-balance font-light text-3xl md:text-5xl lg:text-6xl",
			h3: "scroll-m-20 text-balance font-normal text-3xl",
			h4: "scroll-m-20 text-balance font-medium text-2xl",
			h5: "scroll-m-20 text-balance font-medium text-xl",
			h6: "scroll-m-20 text-balance font-medium text-lg",

			lead: "font-normal text-muted-foreground text-xl",
			large: "font-semibold text-lg",
			// small: 'text-sm font-medium leading-none',
			// muted: 'text-sm text-muted-foreground',

			body1: "text-base leading-7",
			body2: "text-base leading-5",

			a: "text-link no-underline hover:underline",
		},
	},
	defaultVariants: { variant: "body1" },
});

const topGutters: Record<string, string> = {
	h1: "mt-10 lg:mt-12",
	h2: "mt-10 lg:mt-12",
	h3: "mt-10",
	h4: "mt-9",
	h5: "mt-4",
	h6: "mt-4",
	// body1: 'mt-3',
	// body2: 'mt-3',
};

const bottomGutters: Record<string, string> = {
	h1: "mb-6 lg:mb-8",
	h2: "mb-5 lg:mb-6",
	h3: "mb-4 lg:mb-5",
	h4: "mb-4",
	h5: "mb-4",
	h6: "mb-4",
	body1: "mb-4",
	body2: "mb-4",
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
			variant = "body1",
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
				? variant === "body1" ||
					variant === "body2" ||
					variant === "lead" ||
					variant === "large"
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
