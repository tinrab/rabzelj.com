import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { createMdxContent } from "@temelj/mdx-react";
import * as v from "valibot";
import { MdReportProblem } from "react-icons/md";

import { loadBlogPost } from "~/lib/blog/post/loader";
import { mdxPageLowerHeadingComponents } from "~/lib/mdx/content";
import { makeSeo } from "~/lib/seo";
import { pathLocator } from "~/lib/path-locator";
import { publicMiddleware, validateValibot } from "~/lib/middleware";
import { clientConfig } from "~/config/client";
import { Typography } from "~/components/Typography";
import { BlogShare } from "~/components/blog/BlogShare";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { Separator } from "~/components/ui/separator";
import { SiteLink } from "~/components/SiteLink";

const loadRouteData = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.validator(
		validateValibot(
			v.object({
				slug: v.pipe(v.string(), v.minLength(1)),
			}),
		),
	)
	.handler(async ({ data: { slug } }) => {
		const post = await loadBlogPost(slug, {
			includeArtifact: true,
			includeRelated: true,
		});
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

	const content = post.artifact?.compiled
		? createMdxContent(
				{
					artifact: post.artifact,
				},
				mdxPageLowerHeadingComponents,
			)
		: undefined;

	return (
		<article className="mx-auto max-w-3xl break-words px-4 py-8 md:py-12">
			<Typography className="text-balance" variant="h1" asVariant>
				{post.title}
			</Typography>

			<Separator className="my-4" />

			{new Date(post.publishedDate).getTime() <
				Date.now() - 1000 * 60 * 60 * 24 * 180 && (
				<Typography className="mb-4 flex items-center gap-2 text-error text-sm">
					<MdReportProblem />
					This article is more than 6 months old and may contain outdated
					information.
				</Typography>
			)}

			<div className="flex flex-wrap gap-2">
				<Typography className="mr-auto text-muted-foreground text-sm">
					{new Date(post.publishedDate).toLocaleDateString()}
				</Typography>
				<BlogShare className="hidden sm:flex" post={post} />
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				{post.tags.map((tag) => (
					<BlogTagChip key={tag.slug} tag={tag} />
				))}
			</div>

			<Typography asVariant className="mt-4 text-muted-foreground italic">
				{post.description}
			</Typography>

			<section className="pt-6">{content}</section>

			<Separator className="my-4" />

			<div className="mt-4 flex flex-wrap gap-2">
				{post.tags.map((tag) => (
					<BlogTagChip key={tag.slug} tag={tag} />
				))}
			</div>

			<div className="mt-4 flex flex-wrap gap-2">
				<Typography className="mr-auto text-muted-foreground text-sm">
					{new Date(post.publishedDate).toLocaleDateString()}
				</Typography>
				<BlogShare className="hidden sm:flex" post={post} />
			</div>

			{post.related?.length && post.related?.length >= 2 ? (
				<section className="mt-12">
					<Typography variant="h2" asVariant gutterBottom>
						Read more
					</Typography>
					<ul className="my-6 ml-6 list-disc">
						{post.related.map((relatedPost) => (
							<li key={relatedPost.slug}>
								<Typography
									variant="a"
									className="text-balance text-lg"
									asChild
								>
									<SiteLink to={`/blog/${relatedPost.slug}`}>
										{relatedPost.title}
									</SiteLink>
								</Typography>
							</li>
						))}
					</ul>
				</section>
			) : undefined}
		</article>
	);
}
