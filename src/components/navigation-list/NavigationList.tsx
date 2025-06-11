import type React from "react";

type NavigationListProps = React.ComponentProps<"div">;

export function NavigationList({
  children,
  ...restProps
}: NavigationListProps) {
  return <div {...restProps}>{children}</div>;
}
