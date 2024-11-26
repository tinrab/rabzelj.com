import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

export const iconButtonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm shadow-neutral-300 ring-ring ring-offset-2 ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 dark:shadow-neutral-950 focus-visible:outline-none aria-selected:ring-2 focus-visible:ring-2",
	{
		variants: {
			variant: {
				default:
					"border border-border bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				secondary:
					"border border-border bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				error:
					"border border-border bg-error text-error-foreground shadow-sm hover:bg-error/90",
				outline:
					"border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				xs: "h-6 w-6 rounded-sm [&_svg]:size-4",
				sm: "h-8 w-8 rounded-md [&_svg]:size-4",
				md: "h-9 w-9 rounded-md [&_svg]:size-5",
				lg: "h-10 w-10 rounded-md [&_svg]:size-6",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);

export type IconButtonProps = {
	asChild?: boolean;
	selected?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof iconButtonVariants>;

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild,
			selected = false,
			disabled,
			...restProps
		},
		ref,
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(iconButtonVariants({ variant, size }), className)}
				ref={ref}
				aria-selected={selected}
				aria-disabled={disabled}
				disabled={disabled}
				{...restProps}
			/>
		);
	},
);
IconButton.displayName = "IconButton";
