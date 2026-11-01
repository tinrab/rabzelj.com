import { Link, type ToOptions, useLocation } from "@tanstack/react-router";

import { pathLocator } from "~/lib/path-locator";
import { cn } from "~/lib/utility";

interface BlogTabData {
  title: string;
  to: ToOptions["to"];
  match: (pathname: string) => boolean;
}

const tabs: BlogTabData[] = [
  { title: "Posts", to: "/blog", match: (pathname) => pathname === "/blog" },
  { title: "Notes", to: "/blog/notes", match: (pathname) => pathname === "/blog/notes" },
  { title: "Tags", to: "/blog/tags", match: (pathname) => pathname.startsWith("/blog/tags") },
];

export function BlogTabList() {
  const location = useLocation();
  const pathname = location.pathname.replace(/\/$/, "");

  return (
    <nav aria-label="Blog sections" className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
      {tabs.map((tab) => {
        const active = tab.match(pathname);

        return (
          <Link
            key={tab.title}
            to={tab.to}
            aria-current={active ? "page" : undefined}
            className={cn(
              "decoration-link underline-offset-[0.4em] transition-colors",
              active
                ? "text-foreground underline decoration-2"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.title}
          </Link>
        );
      })}
      <a
        href={pathLocator.blog.rss}
        className="text-muted-foreground hover:text-foreground ml-auto transition-colors"
      >
        RSS
      </a>
    </nav>
  );
}
