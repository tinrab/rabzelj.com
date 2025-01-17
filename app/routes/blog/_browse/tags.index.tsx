import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { TagCloud } from "react-tagcloud";

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

export const Route = createFileRoute("/blog/_browse/tags/")({
	component: RouteComponent,
	loader: () => loadRouteData(),
});

function RouteComponent() {
	const data = Route.useLoaderData();
	const isSm = useMediaQuery("(min-width: 640px)");

	return (
		<>
			<section>
				<Typography variant="h2" asChild className="text-balance" gutterBottom>
					<h1>Tags</h1>
				</Typography>
			</section>

			<section className="block max-w-5xl text-center">
				<TagCloud
					tags={data.tags.map((tag) => ({
						value: tag.slug,
						count: tag.postCount,
						props: tag,
					}))}
					minSize={isSm ? 24 : 16}
					maxSize={isSm ? 96 : 34}
					disableRandomColor
					shuffle={false}
					renderer={(tag, size) => (
						<Typography key={tag.value} variant="a" asChild>
							<SiteLink
								to={pathLocator.blog.tags.page(tag.value)}
								className="mx-2 inline-block"
								style={{
									fontSize: size,
									lineHeight: 1.2,
								}}
							>
								{
									// @ts-ignore missing types
									tag.props.title
								}
							</SiteLink>
						</Typography>
					)}
				/>
			</section>
		</>
	);
}
