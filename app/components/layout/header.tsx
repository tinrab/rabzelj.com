import { Slot } from "@radix-ui/react-slot";
import React, { useState } from "react";
import { RxSlash } from "react-icons/rx";

import { DashedLine } from "~/components/DashedLine";
import {
	HeaderContextProvider,
	useHeaderContext,
} from "~/components/layout/header-context";
import { cn } from "~/lib/utility";

export type HeaderProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export function Header({ children, className, ...restProps }: HeaderProps) {
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<HeaderContextProvider menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
			<header
				className={cn("w-full bg-background/95", className)}
				{...restProps}
			>
				<div className="flex flex-col items-center px-4">{children}</div>

				<DashedLine />
			</header>
		</HeaderContextProvider>
	);
}

type HeaderRowProps = {
	desktopOnly?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function HeaderRow({
	desktopOnly,
	className,
	...restProps
}: HeaderRowProps) {
	return (
		<div
			className={cn(
				"min-h-14 w-full items-center gap-3",
				desktopOnly ? "hidden md:flex" : "flex",
				className,
			)}
			{...restProps}
		/>
	);
}

type HeaderTitleProps = {
	asChild?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export const HeaderTitle = React.forwardRef<HTMLDivElement, HeaderTitleProps>(
	({ asChild, className, ...restProps }, ref) => {
		const { onMenuOpenChange } = useHeaderContext();
		const Comp = asChild ? Slot : "div";
		return (
			<Comp
				ref={ref}
				className={cn("relative", className)}
				onClick={() => onMenuOpenChange(false)}
				{...restProps}
			>
				<div className="inline-block h-[24px] w-auto font-bold text-foreground">
					Tin Rabzelj
				</div>
				<span className="sr-only">Tin Rabzelj</span>
			</Comp>
		);
	},
);
HeaderTitle.displayName = "HeaderTitle";

type HeaderDividerProps = {
	desktopOnly?: boolean;
} & React.SVGAttributes<SVGElement>;

export function HeaderDivider({
	desktopOnly,
	className,
	...restProps
}: HeaderDividerProps) {
	return (
		<RxSlash
			className={cn(
				"size-5 shrink-0 text-border",
				desktopOnly ? "hidden md:inline-flex" : "",
				className,
			)}
			{...restProps}
		/>
	);
}
