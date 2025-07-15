import { createFileRoute, Outlet } from "@tanstack/react-router";

import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";

export const Route = createFileRoute("/_index/_home")({
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
