import type React from "react";

import { IconSlash } from "@tabler/icons-react";
import { useState } from "react";

import { GridFadeLine } from "~/components/GridFadeLine";
import { HeaderContextProvider, useHeaderContext } from "~/components/layout/header-context";
import { cn } from "~/lib/utility";

export type HeaderProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export function Header({ children, className, ...props }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderContextProvider menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}>
      <header
        className={cn("bg-background/95 relative w-full overflow-hidden", className)}
        {...props}
      >
        <GridFadeLine fadeDirection="down" className="opacity-60" />
        <div className="relative z-10 flex flex-col items-center px-4">{children}</div>
      </header>
    </HeaderContextProvider>
  );
}

type HeaderRowProps = {
  desktopOnly?: boolean;
} & React.ComponentProps<"div">;

export function HeaderRow({ desktopOnly, className, ...props }: HeaderRowProps) {
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
    <div className={cn("relative", className)} onClick={() => onMenuOpenChange(false)} {...props}>
      <div className="text-foreground flex h-[24px] w-auto gap-2 font-bold">
        <span>Tin Rabzelj</span>
        {/* <Badge className="bg-red-700 font-bold text-white">
          looking for work
        </Badge> */}
      </div>
      <span className="sr-only">Tin Rabzelj</span>
    </div>
  );
}

type HeaderDividerProps = {
  desktopOnly?: boolean;
} & React.SVGAttributes<SVGElement>;

export function HeaderDivider({ desktopOnly, className, ...props }: HeaderDividerProps) {
  return (
    <IconSlash
      className={cn(
        "text-border size-5 shrink-0",
        desktopOnly ? "hidden md:inline-flex" : "",
        className,
      )}
      {...props}
    />
  );
}
