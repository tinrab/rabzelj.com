import { Slot } from "@radix-ui/react-slot";
import React from "react";

import { cn } from "~/lib/utility";

export type NavigationListItemProps = {
	asChild?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export const NavigationListItem = React.forwardRef<
	HTMLDivElement,
	NavigationListItemProps
>(({ asChild, className, ...restProps }, ref) => {
	const Comp = asChild ? Slot : "div";
	return (
		<Comp
			ref={ref}
			className={cn("relative flex w-full items-center px-2 py-2", className)}
			{...restProps}
		/>
	);
});
NavigationListItem.displayName = "NavigationListItem";
