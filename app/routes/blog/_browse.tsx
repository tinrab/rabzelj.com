import React from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";

import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { makeSeo } from "~/lib/seo";
import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";

export const Route = createFileRoute("/blog/_browse")({
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
				<div className="mx-auto max-w-3xl px-6 py-8 xl:max-w-4xl">
					<Outlet />
				</div>
			</LayoutMain>
			<SiteFooter />
		</LayoutRoot>
	);
}
