import { IconMenu } from "@tabler/icons-react";
import { Link, type ToOptions, useLocation } from "@tanstack/react-router";
import type React from "react";

import { Header, HeaderRow, HeaderTitle } from "~/components/layout/header";
import { useHeaderContext } from "~/components/layout/header-context";
import {
  HeaderMobile,
  HeaderMobileTitle,
} from "~/components/layout/header-mobile";
import { NavigationList } from "~/components/navigation-list/NavigationList";
import { NavigationListGroup } from "~/components/navigation-list/NavigationListGroup";
import { NavigationListLink } from "~/components/navigation-list/NavigationListLink";
import { PulseDecoration } from "~/components/PulseDecoration";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { ThemeModeMenu } from "~/lib/theme/ThemeModeMenu";
import { cn } from "~/lib/utility";

interface SiteHeaderLinkData {
  title: string;
  to: ToOptions["to"];
}

const links: SiteHeaderLinkData[] = [{ title: "Blog", to: "/blog" }];

export function SiteHeader() {
  const location = useLocation();

  return (
    <Header>
      <div className="pointer-events-none absolute -top-[0px] h-full w-full overflow-hidden">
        <PulseDecoration className="absolute -top-[50px] left-1/2" />
      </div>

      <HeaderRow className="max-w-(--breakpoint-xl)">
        <Link to="/">
          <HeaderTitle />
        </Link>

        <div className="ml-auto flex items-center gap-3 pl-3">
          <NavigationMenu className="hidden md:inline-flex">
            <NavigationMenuList>
              {links.map((link) => (
                <NavigationMenuItem key={link.to}>
                  <NavigationMenuLink
                    render={
                      <Link
                        to={link.to}
                        className={cn(
                          location.pathname === link.to && "text-foreground",
                        )}
                      >
                        {link.title}
                      </Link>
                    }
                  />
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <ThemeModeMenu />

          <HeaderMobileTrigger />
        </div>
      </HeaderRow>

      <HeaderMobile>
        <HeaderMobileTitle className="p-4" />

        <NavigationList className="px-4">
          <NavigationListGroup>
            {links.map((link) => (
              <NavigationListLink
                key={link.to}
                variant="solid"
                selected={location.href === link.to}
                render={<Link to={link.to}>{link.title}</Link>}
              />
            ))}
          </NavigationListGroup>
        </NavigationList>
      </HeaderMobile>
    </Header>
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
      onClick={() => onMenuOpenChange(true)}
      {...props}
    >
      <IconMenu />
      <span className="sr-only">Toggle navigation menu</span>
    </Button>
  );
}
