import type React from "react";

import { cn } from "~/lib/utility";

interface PulseDecorationProps extends React.HTMLAttributes<HTMLDivElement> {
	mainCircleSize?: number;
	mainCircleOpacity?: number;
	numCircles?: number;
}

export function PulseDecoration({
	className,
	...restProps
}: PulseDecorationProps) {
	const n = 6;

	return (
		<div
			className={cn(
				"hidden items-center justify-center opacity-65 md:flex",
				className,
			)}
			{...restProps}
		>
			{Array.from({ length: n }, (_, i) => {
				const size = 600 + i * 100;
				return (
					<div
						key={i}
						className="absolute animate-pulse rounded-md border bg-foreground/20"
						style={
							{
								"--index": i,
								width: `${size}px`,
								height: `${size * 0.35}px`,
								opacity: 0.2 - i * 0.05,
								animationDelay: `${i * 2}s`,
								top: "50%",
								left: "50%",
								transform: "translate(-50%, -50%) scale(1)",
								rotate: `${i * 13 - 7}deg`,
							} as React.CSSProperties
						}
					/>
				);
			})}
		</div>
	);
}
