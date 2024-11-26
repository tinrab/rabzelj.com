import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

export const typographyVariants = cva("", {
	variants: {
		variant: {
			h1: "scroll-m-20 font-light text-5xl tracking-tight lg:text-8xl md:text-7xl",
			h2: "scroll-m-20 font-light text-4xl tracking-tight lg:text-6xl md:text-5xl",
			h3: "scroll-m-20 font-normal text-3xl tracking-tight",
			h4: "scroll-m-20 font-medium text-2xl tracking-tight",
			h5: "scroll-m-20 font-medium text-xl tracking-tight",
			h6: "scroll-m-20 font-medium text-lg tracking-tight",

			lead: "font-normal text-muted-foreground text-xl",
			large: "font-semibold text-lg",
			// small: 'text-sm font-medium leading-none',
			// muted: 'text-sm text-muted-foreground',

			body1: "leading-7",
			body2: "leading-5",

			a: "cursor-pointer text-link no-underline hover:underline",
		},
	},
	defaultVariants: { variant: "body1" },
});

const topGutters: Record<string, string> = {
	h1: "mt-10 lg:mt-12",
	h2: "mt-8 lg:mt-10",
	h3: "mt-8",
	h4: "mt-6",
	// h5: 'mt-3',
	// h6: 'mt-3',
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
			asVariant,
			className,
			...restProps
		},
		ref,
	) => {
		// const Comp = asChild ? Slot : 'span';
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
					gutterTop ? ((variant && topGutters[variant]) ?? "") : "",
					gutterBottom ? ((variant && bottomGutters[variant]) ?? "") : "",
					gutterTop || gutterBottom ? "block" : "",
					className,
				)}
				{...restProps}
			/>
		);
	},
);
Typography.displayName = "Typography";
