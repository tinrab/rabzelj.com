import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { useMemo } from "react";
import { createMdxContent } from "@temelj/mdx-react";

import { loadBlogPost } from "~/lib/blog/post/loader";
import { mdxPageLowerHeadingComponents } from "~/lib/mdx/content";
import { makeSeo } from "~/lib/seo";
import { pathLocator } from "~/lib/path-locator";
import { publicMiddleware, validateZod } from "~/lib/middleware";
import { clientConfig } from "~/config/client";
import { Typography } from "~/components/Typography";
import { BlogShare } from "~/components/blog/BlogShare";
import { BlogTagChip } from "~/components/blog/BlogTagChip";

const loadRouteData = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.validator(validateZod(z.object({ slug: z.string().min(1) })))
	.handler(async ({ data: { slug } }) => {
		const post = await loadBlogPost(slug, { includeArtifact: true });
		if (!post) {
			throw notFound();
		}
		return { post };
	});

export const Route = createFileRoute("/blog/_post/_post/$slug")({
	component: RouteComponent,
	loader: ({ params }) => loadRouteData({ data: { slug: params.slug } }),
	head: ({ match, loaderData }) => {
		if (loaderData === undefined) {
			return {};
		}
		const { post } = loaderData;
		return {
			meta: makeSeo({
				path: match.pathname,
				title: post.title,
				description: post.description,
				image: `${clientConfig.app.url}${pathLocator.assets.blogPostCover(post.slug)}`,
				properties: {
					"article:published_time": post.publishedDate,
					...(post.modifiedDate
						? {
								"article:modified_time": post.modifiedDate,
							}
						: {}),
				},
			}),
		};
	},
});

function RouteComponent() {
	const { post } = Route.useLoaderData();

	const content = useMemo(
		() =>
			post.artifact?.compiled
				? createMdxContent(
						{
							artifact: post.artifact,
						},
						mdxPageLowerHeadingComponents,
					)
				: undefined,
		[post.artifact],
	);

	return (
		<article className="mx-auto max-w-3xl">
			<section>
				<div className="mb-3 flex flex-wrap gap-2">
					<Typography className="mr-auto text-muted-foreground text-sm">
						{new Date(post.publishedDate).toLocaleDateString()}
					</Typography>
					<BlogShare post={post} />
				</div>
				<Typography className="mb-3 text-balance" variant="h1" asVariant>
					{post.title}
				</Typography>
				<div className="flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<BlogTagChip key={tag.slug} tag={tag} />
					))}
				</div>
			</section>

			<Typography
				variant="body2"
				asVariant
				className="mt-5 mb-8 text-muted-foreground italic"
			>
				{post.description}
			</Typography>

			<section className="border-b pb-6">{content}</section>

			<section className="py-3">
				<div className="mb-3 flex flex-wrap gap-2">
					{post.tags.map((tag) => (
						<BlogTagChip key={tag.slug} tag={tag} />
					))}
				</div>
				<div className="mb-3 flex flex-wrap gap-2">
					<Typography className="mr-auto text-muted-foreground text-sm">
						{new Date(post.publishedDate).toLocaleDateString()}
					</Typography>
					<BlogShare post={post} />
				</div>
			</section>
		</article>
	);
}
