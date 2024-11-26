import type React from "react";

type LayoutMainProps = React.HTMLAttributes<HTMLDivElement>;

export function LayoutMain({ ...restProps }: LayoutMainProps) {
	return <main {...restProps} />;
}
