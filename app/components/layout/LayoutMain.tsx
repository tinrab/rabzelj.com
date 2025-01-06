import type React from "react";

import { cn } from "~/lib/utility";

type LayoutMainProps = React.HTMLAttributes<HTMLDivElement>;

export function LayoutMain({ className, ...restProps }: LayoutMainProps) {
	return <main className={cn("mb-auto", className)} {...restProps} />;
}
