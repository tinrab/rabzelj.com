import { cva, type VariantProps } from "class-variance-authority";
import { Slot as SlotPrimitive } from "radix-ui";
import type React from "react";

import { cn } from "~/lib/utility";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium text-sm transition-colors focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  disabled,
  ref,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? SlotPrimitive.Slot : "button";

  return (
    <div
      className={cn(
        "group pointer-events-auto relative overflow-hidden",
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
        <div className="pointer-events-none absolute inset-0 flex h-full w-full select-none justify-center [transform:skew(-24deg)_translateX(-100%)] group-hover:duration-800 group-hover:[transform:skew(-24deg)_translateX(100%)]">
          <div className="relative h-full w-4 bg-foreground/20" />
        </div>
      ) : undefined}
    </div>
  );
}

export { Button, buttonVariants };
