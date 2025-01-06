import type React from "react";

type NavigationListProps = React.HTMLAttributes<HTMLDivElement>;

export function NavigationList({
	children,
	...restProps
}: NavigationListProps) {
	return <div {...restProps}>{children}</div>;
}
