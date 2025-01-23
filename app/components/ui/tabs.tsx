"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

import { cn } from "~/lib/utility";

const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva("inline-flex h-9 items-center justify-center", {
	variants: {
		variant: {
			default:
				"space-x-2 rounded-none bg-transparent p-0 text-muted-foreground",
			pill: "mb-2 rounded-lg bg-muted p-1 text-muted-foreground",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

const TabsList = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.List>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
		VariantProps<typeof tabsListVariants>
>(({ className, variant, ...restProps }, ref) => (
	<TabsPrimitive.List
		ref={ref}
		className={cn(tabsListVariants({ variant }), className)}
		{...restProps}
	/>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
	"relative inline-flex items-center justify-center whitespace-nowrap font-medium text-sm ring-ring ring-offset-2 ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default:
					"h-full rounded-none border-b-2 border-b-transparent bg-transparent px-3 py-1 text-muted-foreground hover:text-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground",
				pill: "rounded-md px-3 py-1 data-[state=active]:bg-background data-[state=active]:text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

const TabsTrigger = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
		VariantProps<typeof tabsTriggerVariants>
>(({ className, variant, ...restProps }, ref) => (
	<TabsPrimitive.Trigger
		ref={ref}
		className={cn(tabsTriggerVariants({ variant }), className)}
		{...restProps}
	/>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
	React.ElementRef<typeof TabsPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...restProps }, ref) => (
	<TabsPrimitive.Content
		ref={ref}
		className={cn(
			"ring-ring ring-offset-2 ring-offset-background focus-visible:outline-hidden focus-visible:ring-2",
			className,
		)}
		{...restProps}
	/>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger };
