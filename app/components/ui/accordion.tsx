import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { MdArrowDownward } from "react-icons/md";

import { cn } from "~/lib/utility";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn("border-b", className)}
		{...props}
	/>
));
AccordionItem.displayName = "AccordionItem";

const accordionTriggerVariants = cva(
	"relative flex w-full flex-1 cursor-pointer font-medium text-sm transition-all data-[disabled]:pointer-events-none [&[data-state=open]>svg]:rotate-180 data-[disabled]:cursor-auto data-[disabled]:opacity-50",
	{
		variants: {
			variant: {
				default:
					"my-2 items-center rounded-sm px-2 py-1.5 aria-selected:bg-accent hover:bg-accent aria-selected:text-accent-foreground hover:text-accent-foreground",
				link: "items-center px-2 py-4 hover:underline",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);

type AccordionTriggerProps = React.ComponentPropsWithoutRef<
	typeof AccordionPrimitive.Trigger
> &
	VariantProps<typeof accordionTriggerVariants>;

const AccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	AccordionTriggerProps
>(({ variant, className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(accordionTriggerVariants({ variant }), className)}
			{...props}
		>
			{children}
			<MdArrowDownward className="ml-auto size-5 shrink-0 text-muted-foreground transition-transform duration-100" />
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn("pt-0 pb-4", className)}>{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
