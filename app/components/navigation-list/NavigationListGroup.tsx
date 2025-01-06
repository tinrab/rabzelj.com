import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { useId } from "react";

import { cn } from "~/lib/utility";

const navigationListGroupHeadingVariants = cva("mb-1 px-2 py-2 font-medium", {
	variants: {
		variant: {
			default: "text-foreground",
			solid: "text-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type NavigationListGroupProps = {
	heading?: React.ReactNode;
	gutterBottom?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof navigationListGroupHeadingVariants>;

export function NavigationListGroup({
	heading,
	gutterBottom,
	variant,
	className,
	children,
	...restProps
}: NavigationListGroupProps) {
	const headingId = useId();

	return (
		<div
			role="presentation"
			className={cn(gutterBottom ? "mb-4" : "", className)}
			{...restProps}
		>
			{heading && (
				<div
					className={cn(navigationListGroupHeadingVariants({ variant }))}
					aria-hidden="true"
					id={headingId}
				>
					{heading}
				</div>
			)}
			<fieldset aria-labelledby={headingId}>{children}</fieldset>
		</div>
	);
}
