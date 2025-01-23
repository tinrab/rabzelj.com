import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm ring-ring ring-offset-2 ring-offset-background transition-colors focus-visible:outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-selected:ring-2",
	{
		variants: {
			variant: {
				default:
					"border border-border bg-primary text-primary-foreground hover:bg-primary/90",
				secondary:
					"border border-border bg-secondary text-secondary-foreground hover:bg-secondary/80",
				error:
					"border border-border bg-error text-error-foreground hover:bg-error/90",
				outline:
					"border border-border bg-background hover:bg-accent hover:text-accent-foreground",
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
