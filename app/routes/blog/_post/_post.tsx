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
			<LayoutMain className="px-4 py-8 md:py-12">
				{/* <Alert className="mx-auto mb-8 max-w-3xl">
					<MdWarning className="h-4 w-4" />
					<AlertTitle>Yo!</AlertTitle>
					<AlertDescription>
						This blog features my personal notes, thoughts, and opinions. Please
						note that they may be unstructured, unedited, incorrect, and
						potentially offensive.
					</AlertDescription>
				</Alert> */}

				<Outlet />
			</LayoutMain>
			<SiteFooter />
		</LayoutRoot>
	);
}
