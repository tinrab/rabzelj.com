import type React from "react";

import { cn } from "~/lib/utility";

type LayoutRootProps = React.HTMLAttributes<HTMLDivElement>;

export function LayoutRoot({ className, ...restProps }: LayoutRootProps) {
	return (
		<div
			className={cn("relative flex h-svh flex-col", className)}
			{...restProps}
		/>
	);
}
