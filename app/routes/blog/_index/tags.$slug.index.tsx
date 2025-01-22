import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";

import { BlogPostList } from "~/components/blog/BlogPostList";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { loadBlogTag } from "~/lib/blog/tag/loader";
import { publicMiddleware, validateZod } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";

const loadRouteData = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.validator(validateZod(z.object({ slug: z.string().min(1) })))
	.handler(async ({ data: { slug } }) => {
		const tag = await loadBlogTag(slug);
		if (!tag) {
			throw notFound();
		}

		return {
			tag,
			groupedPosts: groupBlogPosts(await loadBlogPosts({ tagSlug: tag.slug })),
		};
	});

export const Route = createFileRoute("/blog/_index/tags/$slug/")({
	component: RouteComponent,
	loader: ({ params }) => loadRouteData({ data: params }),
});

function RouteComponent() {
	const { tag, groupedPosts } = Route.useLoaderData();

	return (
		<div className="mx-auto max-w-3xl px-4 pt-6 pb-8 md:pt-12">
			<div className="mb-8">
				<Typography variant="h2" asChild gutterBottom>
					<h1>{tag.title}</h1>
				</Typography>
				<Typography variant="body1" asVariant>
					{tag.description}
				</Typography>

				<Typography variant="a" asChild>
					<SiteLink to={pathLocator.blog.tags.index}>See all tags.</SiteLink>
				</Typography>
			</div>

			<BlogPostList
				posts={groupedPosts}
				renderPost={(post) => (
					<Typography variant="a" asChild>
						<SiteLink to={`/blog/${post.slug}`}>{post.title}</SiteLink>
					</Typography>
				)}
			/>
		</div>
	);
}
