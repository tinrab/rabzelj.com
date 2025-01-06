import type React from "react";
import { useId } from "react";

interface DashedLineProps extends React.SVGAttributes<HTMLOrSVGElement> {
	size?: number;
	orientation?: "horizontal" | "vertical";
}

export function DashedLine({
	size = 2,
	orientation = "horizontal",
	...restProps
}: DashedLineProps) {
	const patternId = useId();

	return (
		<svg
			height={orientation === "horizontal" ? size : "100%"}
			width={orientation === "vertical" ? size : "100%"}
			xmlns="http://www.w3.org/2000/svg"
			{...restProps}
		>
			<title>Dashed Line</title>
			<pattern
				id={patternId}
				x="0"
				y="0"
				width={orientation === "horizontal" ? "100%" : size}
				height={orientation === "vertical" ? "100%" : size}
				patternUnits="userSpaceOnUse"
			>
				<line
					x1="0"
					y1="0"
					x2={orientation === "horizontal" ? "100%" : 0}
					y2={orientation === "vertical" ? "100%" : 0}
					className="stroke-neutral-300 dark:stroke-neutral-700"
					strokeDasharray="8 8"
					strokeWidth={size * 2}
				/>
			</pattern>
			<rect
				x="0"
				y="0"
				width={orientation === "horizontal" ? "100%" : size}
				height={orientation === "vertical" ? "100%" : size}
				fill={`url(#${patternId})`}
			/>
		</svg>
	);
}
