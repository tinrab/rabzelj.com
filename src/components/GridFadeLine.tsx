import type React from "react";

import { cn } from "~/lib/utility";

interface GridFadeLineProps extends React.HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  fadeDirection?: "down" | "up";
}

export function GridFadeLine({
  cellSize = 32,
  fadeDirection = "down",
  style,
  className,
  ...props
}: GridFadeLineProps) {
  const centeredGridX = `calc(50% + ${cellSize / 2 - 1}px)`;
  const maskImage =
    fadeDirection === "down"
      ? "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0.65) 88%, transparent 100%)"
      : "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 72%, rgba(0,0,0,0.65) 88%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={cn("text-border/65 pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, currentColor 2px, transparent 2px),
          linear-gradient(to bottom, currentColor 2px, transparent 2px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundPosition: `${centeredGridX} -1px`,
        maskImage,
        WebkitMaskImage: maskImage,
        ...style,
      }}
      {...props}
    />
  );
}
