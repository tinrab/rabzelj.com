import type React from "react";
import { MdMenu } from "react-icons/md";

import { useHeaderContext } from "~/components/layout/header-context";
import { IconButton } from "~/components/ui/icon-button";
import { Sheet, SheetContent } from "~/components/ui/sheet";
import { cn } from "~/lib/utility";

type HeaderMobileProps = React.HTMLAttributes<HTMLDivElement>;

export function HeaderMobile({
	className,
	children,
	...restProps
}: HeaderMobileProps) {
	const { menuOpen, onMenuOpenChange } = useHeaderContext();

	return (
		<Sheet open={menuOpen} onOpenChange={onMenuOpenChange}>
			<SheetContent side="left">
				<nav
					className={cn("flex h-full flex-col gap-6", className)}
					{...restProps}
				>
					{children}
				</nav>
			</SheetContent>
		</Sheet>
	);
}

type HeaderMobileTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export function HeaderMobileTrigger({
	className,
	...restProps
}: HeaderMobileTriggerProps) {
	const { onMenuOpenChange } = useHeaderContext();
	return (
		<IconButton
			variant="outline"
			className={cn("shrink-0 md:hidden", className)}
			onClick={() => onMenuOpenChange(true)}
			{...restProps}
		>
			<MdMenu />
			<span className="sr-only">Toggle navigation menu</span>
		</IconButton>
	);
}
