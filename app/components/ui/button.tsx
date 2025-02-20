import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utility";
import { buttonVariants } from "~/components/ui/button-styles";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, disabled, ...props }, ref) => {
		const Comp = asChild ? Slot : "button";

		return (
			<div
				className={cn(
					"group relative overflow-hidden pointer-events-auto",
					"inline-flex items-center justify-center",
					"focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background",
					size === "xs" ? "rounded-sm" : "rounded-md",
				)}
			>
				<Comp
					className={cn(buttonVariants({ variant, size, className }))}
					disabled={disabled}
					{...props}
					ref={ref}
				/>
				{!disabled ? (
					<div className="select-none pointer-events-none absolute inset-0 flex h-full w-full justify-center [transform:skew(-24deg)_translateX(-100%)] group-hover:duration-800 group-hover:[transform:skew(-24deg)_translateX(100%)]">
						<div className="relative h-full w-4 bg-foreground/20" />
					</div>
				) : undefined}
			</div>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
