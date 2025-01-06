import type React from "react";

import { DashedLine } from "~/components/DashedLine";
import { cn } from "~/lib/utility";

interface LayoutFooterProps extends React.HTMLAttributes<HTMLDivElement> {
	slotProps?: {
		content?: React.HTMLAttributes<HTMLDivElement>;
	};
}

export function LayoutFooter({
	className,
	children,
	slotProps = {},
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

			{/* <DashedLine className="absolute top-0" /> */}
			<DashedLine />

			<div
				{...(slotProps.content ?? {})}
				className={cn("mx-auto flex max-w-3xl", slotProps.content?.className)}
			>
				<DashedLine className="h-full" orientation="vertical" />

				<div className="p-4 pb-8">{children}</div>

				<DashedLine
					className="ml-auto h-[calc(100%+8rem)]"
					orientation="vertical"
				/>
			</div>

			{/* <div className="">
				<div className="px-4 pt-4 pb-8">
					<div
						{...(slotProps.content ?? {})}
						className={cn(
							"mx-auto flex max-w-3xl",
							slotProps.content?.className,
						)}
					>
						<DashedLine className="-mt-4 h-full" orientation="vertical" />

						{children}

						<DashedLine
							className="-mt-4 ml-auto h-[calc(100%+8rem)]"
							orientation="vertical"
						/>

					</div>
				</div>
			</div> */}
		</footer>
	);
}
