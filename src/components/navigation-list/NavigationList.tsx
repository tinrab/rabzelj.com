import type React from "react";

type NavigationListProps = React.ComponentProps<"div">;

export function NavigationList({ children, ...props }: NavigationListProps) {
  return <div {...props}>{children}</div>;
}
