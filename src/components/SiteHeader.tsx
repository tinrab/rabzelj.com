import { Link, type ToOptions, useLocation } from "@tanstack/react-router";

import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";
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
    <header className="relative border-b">
      <SpineRow className="h-14 flex-row items-center xl:items-center">
        <SpineMargin className="mr-auto xl:mr-0">
          <Link to="/" className="font-medium tracking-tight">
            Tin Rabzelj
          </Link>
        </SpineMargin>

        <SpineBody className="px-0 md:px-0 xl:px-6">
          <nav aria-label="Main" className="flex items-center gap-6 text-[0.9375rem]">
            {links.map((link) => {
              const active = location.pathname.startsWith(link.to ?? "");

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "decoration-link underline-offset-[1.15rem] transition-colors",
                    active
                      ? "text-foreground underline decoration-2"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </SpineBody>

        <div className="pr-2 pl-3 md:pr-4 xl:col-span-1 xl:flex xl:justify-end xl:px-4">
          <ThemeModeMenu />
        </div>
      </SpineRow>
    </header>
  );
}
