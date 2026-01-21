import { IconMenu } from "@tabler/icons-react";
import type React from "react";

import { useHeaderContext } from "~/components/layout/header-context";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utility";

type HeaderMobileProps = React.ComponentProps<"div">;

export function HeaderMobile({
  className,
  children,
  ...props
}: HeaderMobileProps) {
  const { menuOpen, onMenuOpenChange } = useHeaderContext();
  return (
    <Sheet open={menuOpen} onOpenChange={onMenuOpenChange}>
      <SheetContent side="left">
        <div className={cn("flex h-full flex-col gap-6", className)} {...props}>
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}

type HeaderMobileTitleProps = React.ComponentProps<typeof SheetHeader>;

export function HeaderMobileTitle({ ...props }: HeaderMobileTitleProps) {
  return (
    <SheetHeader {...props}>
      <SheetTitle>Tin Rabzelj</SheetTitle>
      <SheetDescription>Software engineer.</SheetDescription>
    </SheetHeader>
  );
}

type HeaderMobileTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export function HeaderMobileTrigger({
  className,
  ...props
}: HeaderMobileTriggerProps) {
  const { onMenuOpenChange } = useHeaderContext();
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("shrink-0 md:hidden", className)}
      onClick={() => {
        onMenuOpenChange(true);
      }}
      {...props}
    >
      <IconMenu />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );
}
