import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteHeader } from "~/components/SiteHeader";
import { LayoutRoot } from "~/components/layout/LayoutRoot";
import { LayoutMain } from "~/components/layout/LayoutMain";
import { SiteFooter } from "~/components/SiteFooter";

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
