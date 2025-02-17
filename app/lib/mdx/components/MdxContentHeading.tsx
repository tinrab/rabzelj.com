import type React from "react";

import { Typography, type TypographyProps } from "~/components/Typography";

export function MdxContentHeading({
	lowerHeadings,
	variant,
	id,
	children,
	...restProps
}: {
	lowerHeadings?: boolean;
	variant: TypographyProps["variant"];
} & React.HTMLAttributes<HTMLElement>) {
	const effectiveVariant = lowerHeadings
		? variant === "h1"
			? "h2"
			: variant === "h2"
				? "h3"
				: variant === "h3"
					? "h4"
					: variant === "h4"
						? "h5"
						: variant === "h5"
							? "h6"
							: variant
		: variant;
	const VariantComponent = effectiveVariant as React.ElementType;

	if (id) {
		return (
			<Typography
				id={id}
				gutter
				variant={effectiveVariant}
				asChild
				{...restProps}
			>
				<a href={`#${id}`} className="no-underline">
					<VariantComponent>{children}</VariantComponent>
				</a>
			</Typography>
		);
	}
	return (
		<Typography
			id={id}
			gutter
			variant={effectiveVariant}
			asChild
			{...restProps}
		>
			<VariantComponent>{children}</VariantComponent>
		</Typography>
	);
}
