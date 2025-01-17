import type React from "react";

import { cn } from "~/lib/utility";

type LinearLoaderProps = {
	square?: boolean;
	slotProps?: {
		bar?: React.HTMLAttributes<HTMLDivElement>;
	};
} & React.HTMLAttributes<HTMLDivElement>;

export function LinearLoader({
	square,
	slotProps = {},
	className,
	...restProps
}: LinearLoaderProps) {
	return (
		<div
			className={cn("h-1 text-primary", square ? "" : "rounded-sm", className)}
			aria-label={restProps["aria-label"] ?? "loading"}
			{...restProps}
		>
			<div
				className={cn(
					slotProps.bar?.className,
					square ? "" : "rounded-sm",
					"h-full animate-linear-loader bg-primary/10 transition-all",
					"bg-[linear-gradient(to_right,transparent_50%,currentColor_50%,currentColor_60%,transparent_60%,transparent_71.5%,currentColor_71.5%,currentColor_84%,transparent_84%)]",
				)}
				{...(slotProps.bar ?? {})}
			/>
		</div>
	);
}
