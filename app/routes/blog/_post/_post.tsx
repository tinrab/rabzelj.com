import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";

export const Route = createFileRoute("/blog/_post/_post")({
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
