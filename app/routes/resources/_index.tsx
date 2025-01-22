import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { makeSeo } from "~/lib/seo";
import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";

export const Route = createFileRoute("/resources/_index")({
	head({ match }) {
		return {
			meta: makeSeo({
				path: match.pathname,
				title: "Resources",
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
