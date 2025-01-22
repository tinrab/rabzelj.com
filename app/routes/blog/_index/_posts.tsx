import { createFileRoute, Outlet } from "@tanstack/react-router";
import { FaRss } from "react-icons/fa6";

import { BlogTabList } from "~/components/blog/BlogTabList";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { IconButton } from "~/components/ui/icon-button";
import { clientConfig } from "~/config/client";
import { pathLocator } from "~/lib/path-locator";

export const Route = createFileRoute("/blog/_index/_posts")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="mx-auto max-w-3xl px-4 pt-6 pb-8 md:pt-12">
			<div className="mb-8">
				<div className="mb-5 flex items-center gap-3 lg:mb-6">
					<Typography variant="h2" asChild>
						<h1>Blog</h1>
					</Typography>

					<IconButton size="sm" variant="ghost" asChild>
						<SiteLink
							to={`${clientConfig.app.url}${pathLocator.blog.rss}`}
							aria-label="Blog RSS feed"
						>
							<span className="sr-only">Blog RSS feed</span>
							<FaRss aria-hidden="true" />
						</SiteLink>
					</IconButton>
				</div>

				<Typography variant="a" asChild>
					<SiteLink to={pathLocator.blog.tags.index}>See tags.</SiteLink>
				</Typography>
			</div>

			<div className="mb-8">
				<BlogTabList />
			</div>

			<Outlet />
		</div>
	);
}
