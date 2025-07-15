import type React from "react";
import { useState } from "react";
import { RxSlash } from "react-icons/rx";

import { DashedLine } from "~/components/DashedLine";
import {
  HeaderContextProvider,
  useHeaderContext,
} from "~/components/layout/header-context";
import { Badge } from "~/components/ui/badge";
import { cn } from "~/lib/utility";

export type HeaderProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export function Header({ children, className, ...props }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContextProvider menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
      <header className={cn("w-full bg-background/95", className)} {...props}>
        <div className="flex flex-col items-center px-4">{children}</div>

        <DashedLine />
      </header>
    </HeaderContextProvider>
  );
}

type HeaderRowProps = {
  desktopOnly?: boolean;
} & React.ComponentProps<"div">;

export function HeaderRow({
  desktopOnly,
  className,
  ...props
}: HeaderRowProps) {
  return (
    <div
      className={cn(
        "min-h-14 w-full items-center gap-3",
        desktopOnly ? "hidden md:flex" : "flex",
        className,
      )}
      {...props}
    />
  );
}

interface HeaderTitleProps extends React.ComponentProps<"div"> {}

export function HeaderTitle({ className, ...props }: HeaderTitleProps) {
  const { onMenuOpenChange } = useHeaderContext();
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: needed
    // biome-ignore lint/a11y/useKeyWithClickEvents: needed
    <div
      className={cn("relative", className)}
      onClick={() => onMenuOpenChange(false)}
      {...props}
    >
      <div className="flex h-[24px] w-auto gap-2 font-bold text-foreground">
        <span>Tin Rabzelj</span>
        <Badge className="bg-red-700 font-bold text-white">
          looking for work
        </Badge>
      </div>
      <span className="sr-only">Tin Rabzelj</span>
    </div>
  );
}

type HeaderDividerProps = {
  desktopOnly?: boolean;
} & React.SVGAttributes<SVGElement>;

export function HeaderDivider({
  desktopOnly,
  className,
  ...props
}: HeaderDividerProps) {
  return (
    <RxSlash
      className={cn(
        "size-5 shrink-0 text-border",
        desktopOnly ? "hidden md:inline-flex" : "",
        className,
      )}
      {...props}
    />
  );
}
