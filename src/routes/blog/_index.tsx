import { createFileRoute, Outlet } from "@tanstack/react-router";

import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { makeSeo } from "~/lib/seo";

export const Route = createFileRoute("/blog/_index")({
  head({ match }) {
    return {
      meta: makeSeo({
        path: match.pathname,
        title: "Blog",
      }),
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <LayoutRoot>
      <SiteHeader />
      <LayoutMain>
        <Outlet />
      </LayoutMain>
      <SiteFooter />
    </LayoutRoot>
  );
}
