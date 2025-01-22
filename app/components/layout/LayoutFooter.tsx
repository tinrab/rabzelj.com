import type React from "react";

import { DashedLine } from "~/components/DashedLine";
import { cn } from "~/lib/utility";

interface LayoutFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	slotProps?: {
		content?: React.HTMLAttributes<HTMLDivElement>;
	};
}

export function LayoutFooter({
	slotProps = {},
	className,
	children,
	...restProps
}: LayoutFooterProps) {
	return (
		<footer
			className={cn("w-full", className)}
			aria-labelledby="footer-heading"
			{...restProps}
		>
			<h2 id="footer-heading" className="sr-only">
				Footer
			</h2>

			<DashedLine orientation="horizontal" />

			<div
				{...(slotProps.content ?? {})}
				className={cn(
					"mx-auto flex max-w-3xl px-4",
					slotProps.content?.className,
				)}
			>
				<DashedLine className="hidden h-full md:block" orientation="vertical" />

				<div className="px-0 py-4 pb-8 md:px-4">{children}</div>

				<DashedLine
					className="ml-auto hidden h-full md:block"
					orientation="vertical"
				/>
			</div>
		</footer>
	);
}
