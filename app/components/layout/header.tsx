import { Slot } from "@radix-ui/react-slot";
import React, { useState } from "react";
import { RxSlash } from "react-icons/rx";

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
				className={cn(
					// "sticky top-0 z-50 w-full border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
					// "flex flex-col items-center px-4",
					"sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
					// "flex flex-col items-center px-4",
					className,
				)}
				{...restProps}
			>
				<div className="flex flex-col items-center px-4">{children}</div>

				<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
					<title>Dashed Line</title>
					<pattern
						id="pattern-checkers"
						x="0"
						y="0"
						width="100%"
						height="4"
						patternUnits="userSpaceOnUse"
					>
						<line
							x1="0"
							y1="0"
							x2="100%"
							y2="0"
							className="stroke-neutral-300 dark:stroke-neutral-700"
							strokeDasharray="8 8"
							strokeWidth="4"
						/>
					</pattern>
					<rect
						x="0%"
						y="0"
						width="100%"
						height="4"
						fill="url(#pattern-checkers)"
					/>
				</svg>
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
				"size-5 flex-shrink-0 text-border",
				desktopOnly ? "hidden md:inline-flex" : "",
				className,
			)}
			{...restProps}
		/>
	);
}
