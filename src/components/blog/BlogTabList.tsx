import { Link, useLocation } from "@tanstack/react-router";

import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";

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
      <TabsList>
        <TabsTrigger value="personal" asChild>
          <Link to="/blog">Personal</Link>
        </TabsTrigger>
        <TabsTrigger value="notes" asChild>
          <Link to="/blog/notes">Notes</Link>
        </TabsTrigger>
        <TabsTrigger value="external" asChild>
          <Link to="/blog/external">External</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
