import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { loadBlogTagPostCounts } from "~/lib/blog/tag/loader";
import { publicMiddleware } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";
import { useMediaQuery } from "~/lib/use-media-query";

const loadRouteData = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.handler(async () => {
		const tags = await loadBlogTagPostCounts();
		const maxPostCount = Math.max(...tags.map((tag) => tag.postCount));

		return { tags, maxPostCount };
	});

export const Route = createFileRoute("/blog/_index/tags/")({
	component: RouteComponent,
	loader: () => loadRouteData(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const aboveMd = useMediaQuery("(min-width: 768px)");
	const aboveLg = useMediaQuery("(min-width: 1024px)");

	return (
		<div className="mx-auto max-w-3xl px-4 pt-6 pb-8 md:pt-12">
			<section>
				<Typography variant="h2" asChild className="text-balance" gutterBottom>
					<h1>Tags</h1>
				</Typography>
			</section>

			<section className="block max-w-5xl text-center">
				<div className="flex flex-wrap items-center justify-center ">
					{data.tags.map((tag) => (
						<Typography
							key={tag.slug}
							variant="a"
							asChild
							className="mx-2 inline-block"
							style={{
								fontSize: `${
									((tag.postCount * 3 + data.maxPostCount) /
										data.maxPostCount) *
									(aboveLg ? 1.5 : aboveMd ? 1.2 : 0.8)
								}rem`,
								lineHeight: 1.3,
							}}
						>
							<SiteLink
								to={pathLocator.blog.tags.page(tag.slug)}
								className="mx-2 inline-block"
							>
								{tag.title}
							</SiteLink>
						</Typography>
					))}
				</div>
			</section>
		</div>
	);
}
