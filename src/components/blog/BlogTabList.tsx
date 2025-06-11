import { useLocation } from "@tanstack/react-router";

import { SiteLink } from "~/components/SiteLink";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { pathLocator } from "~/lib/path-locator";

type BlogTabId = "personal" | "notes" | "external";

export function BlogTabList() {
  const location = useLocation();
  const id: BlogTabId = location.pathname.endsWith("external")
    ? "external"
    : location.pathname.endsWith("notes")
      ? "notes"
      : "personal";

  return (
    <Tabs defaultValue="all" value={id}>
      <TabsList variant="pill">
        <TabsTrigger value="personal" variant="pill" asChild>
          <SiteLink to={pathLocator.blog.index}>Personal</SiteLink>
        </TabsTrigger>
        <TabsTrigger value="notes" variant="pill" asChild>
          <SiteLink to={pathLocator.blog.notes}>Notes</SiteLink>
        </TabsTrigger>
        <TabsTrigger value="external" variant="pill" asChild>
          <SiteLink to={pathLocator.blog.external}>External</SiteLink>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
