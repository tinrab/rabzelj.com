import type { NavigationMenuViewportProps } from "@radix-ui/react-navigation-menu";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { cn } from "~/lib/utility";

type NavigationMenuProps = {
	slotProps?: { viewport?: NavigationMenuViewportProps };
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>;

const NavigationMenu = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Root>,
	NavigationMenuProps
>(({ className, children, slotProps = {}, ...restProps }, ref) => (
	<NavigationMenuPrimitive.Root
		ref={ref}
		className={cn(
			"relative z-10 flex max-w-max flex-1 items-center justify-center",
			className,
		)}
		{...restProps}
	>
		{children}
		<NavigationMenuViewport {...(slotProps.viewport ?? {})} />
	</NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

type NavigationMenuListProps = {
	condensed?: boolean;
} & React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>;

const NavigationMenuList = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.List>,
	NavigationMenuListProps
>(({ condensed, className, ...restProps }, ref) => (
	<NavigationMenuPrimitive.List
		ref={ref}
		className={cn(
			"group flex flex-1 list-none items-center justify-center",
			condensed ? "space-x-1" : "space-x-4",
			className,
		)}
		{...restProps}
	/>
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerVariants = cva(
	"group inline-flex h-9 w-max items-center justify-center rounded-md font-medium text-sm transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline-none",
	{
		variants: {
			variant: {
				default:
					"text-muted-foreground focus:text-foreground hover:text-foreground",
				solid:
					"bg-background px-4 py-2 focus:bg-accent hover:bg-accent focus:text-accent-foreground hover:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type NavigationMenuTriggerProps = React.ComponentPropsWithoutRef<
	typeof NavigationMenuPrimitive.Trigger
> &
	VariantProps<typeof navigationMenuTriggerVariants>;

const NavigationMenuTrigger = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
	NavigationMenuTriggerProps
>(({ variant, className, children, ...restProps }, ref) => (
	<NavigationMenuPrimitive.Trigger
		ref={ref}
		className={cn(
			navigationMenuTriggerVariants({ variant }),
			"group",
			className,
		)}
		{...restProps}
	>
		{children}{" "}
		<MdKeyboardArrowDown
			className="relative top-[1px] ml-1 size-5 transition duration-100 group-data-[state=open]:rotate-180"
			aria-hidden="true"
		/>
	</NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...restProps }, ref) => (
	<NavigationMenuPrimitive.Content
		ref={ref}
		className={cn(
			"data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 top-0 left-0 w-full md:absolute md:w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
			className,
		)}
		{...restProps}
	/>
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const navigationMenuLinkVariants = cva(
	"items-center justify-center rounded-md font-medium text-sm no-underline transition-colors hover:no-underline focus:outline-none disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"text-muted-foreground hover:text-foreground focus:text-foreground aria-selected:text-foreground",
				solid:
					"bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

// const NavigationMenuLink = NavigationMenuPrimitive.Link;
const NavigationMenuLink = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Link>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...restProps }, ref) => (
	<NavigationMenuPrimitive.Link
		ref={ref}
		className={cn(navigationMenuLinkVariants(), className)}
		{...restProps}
	/>
));
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const NavigationMenuViewport = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...restProps }, ref) => (
	<div className={cn("absolute top-full left-0 flex justify-center")}>
		<NavigationMenuPrimitive.Viewport
			className={cn(
				"data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] origin-top-center overflow-hidden rounded-md border bg-popover text-popover-foreground shadow md:w-[var(--radix-navigation-menu-viewport-width)] data-[state=closed]:animate-out data-[state=open]:animate-in",
				// 'w-full',
				className,
			)}
			ref={ref}
			{...restProps}
		/>
	</div>
));
NavigationMenuViewport.displayName =
	NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
	React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
	React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...restProps }, ref) => (
	<NavigationMenuPrimitive.Indicator
		ref={ref}
		className={cn(
			"data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in",
			className,
		)}
		{...restProps}
	>
		<div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border" />
	</NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
	NavigationMenuPrimitive.Indicator.displayName;

export {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuIndicator,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	NavigationMenuViewport,
	navigationMenuLinkVariants,
	navigationMenuTriggerVariants,
};
