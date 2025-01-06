import { useLocation } from "@tanstack/react-router";

import { SiteLink } from "~/components/SiteLink";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { pathLocator } from "~/lib/path-locator";

type BlogTabId = "personal" | "external";

export function BlogTabList() {
	const location = useLocation();
	const id: BlogTabId = location.pathname.endsWith("external")
		? "external"
		: "personal";

	return (
		<Tabs defaultValue="all" value={id}>
			<TabsList variant="pill">
				<TabsTrigger value="personal" variant="pill" asChild>
					<SiteLink to={pathLocator.blog.index}>Personal</SiteLink>
				</TabsTrigger>
				<TabsTrigger value="external" variant="pill" asChild>
					<SiteLink to={pathLocator.blog.external}>External</SiteLink>
				</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}
