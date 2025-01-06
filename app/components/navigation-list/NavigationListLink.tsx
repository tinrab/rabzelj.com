import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

const navigationListLinkVariants = cva(
	"relative flex w-full cursor-pointer items-center rounded-sm px-2 py-2 focus:outline-none data-[disabled]:pointer-events-none data-[disabled]:cursor-auto data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				default:
					"text-muted-foreground hover:text-foreground focus:text-foreground",
				solid:
					"hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
			},
		},
		defaultVariants: { variant: "default" },
	},
);

export type NavigationListLinkProps = {
	selected?: boolean;
	disabled?: boolean;
	asChild?: boolean;
} & VariantProps<typeof navigationListLinkVariants> &
	React.HTMLAttributes<HTMLElement>;

export const NavigationListLink = React.forwardRef<
	HTMLButtonElement,
	NavigationListLinkProps
>(({ asChild, selected, disabled, variant, className, ...restProps }, ref) => {
	const Comp = asChild ? Slot : "button";
	return (
		<Comp
			ref={ref}
			aria-selected={selected}
			aria-disabled={disabled}
			data-disabled={disabled}
			className={cn(navigationListLinkVariants({ variant }), className)}
			{...restProps}
		/>
	);
});
NavigationListLink.displayName = "NavigationListLink";
