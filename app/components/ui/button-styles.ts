import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm shadow-neutral-300 ring-ring ring-offset-2 ring-offset-background transition-colors disabled:pointer-events-none disabled:opacity-50 dark:shadow-neutral-950 focus-visible:outline-none aria-selected:ring-2 focus-visible:ring-2",
	{
		variants: {
			variant: {
				default:
					"border border-border bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				secondary:
					"border border-border bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				error:
					"border border-border bg-error text-error-foreground shadow-sm hover:bg-error/90",
				outline:
					"border border-border bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "font-normal text-link underline-offset-4 hover:underline",
			},
			size: {
				xs: "h-6 rounded-sm px-2 text-xs",
				sm: "h-8 rounded-md px-3 text-xs",
				md: "h-9 rounded-md px-4 py-2",
				lg: "h-10 rounded-md px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	},
);
