import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";

import { BlogPostList } from "~/components/blog/BlogPostList";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { Separator } from "~/components/ui/separator";
import { loadExternalBlogData } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { publicMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.handler(async () => {
		const external = await loadExternalBlogData();
		return {
			flinectPosts: groupBlogPosts(external.flinect.posts),
			outcrawlPosts: groupBlogPosts(external.outcrawl.posts),
		};
	});

export const Route = createFileRoute("/blog/_index/_posts/external")({
	component: RouteComponent,
	loader: () => loadRouteData(),
});

function RouteComponent() {
	const { flinectPosts, outcrawlPosts } = Route.useLoaderData();

	return (
		<>
			<section className="mb-6">
				<Typography
					id="h-flinect-posts"
					variant="h3"
					asChild
					className="text-balance"
					gutter
				>
					<a href="#h-flinect-posts" className="text-foreground">
						<h2>Posts on Flinect</h2>
					</a>
				</Typography>
				<BlogPostList
					anchorSuffix="-flinect"
					posts={flinectPosts}
					renderPost={(post) => (
						<Typography variant="a" asChild>
							<SiteLink to={post.url}>{post.title}</SiteLink>
						</Typography>
					)}
				/>
			</section>

			<Separator orientation="horizontal" />

			<Typography
				id="h-outcrawl-posts"
				variant="h3"
				asChild
				className="text-balance"
				gutter
			>
				<a href="#h-outcrawl-posts" className="text-foreground">
					<h2>Posts on Outcrawl</h2>
				</a>
			</Typography>

			<BlogPostList
				anchorSuffix="-outcrawl"
				posts={outcrawlPosts}
				renderPost={(post) => (
					<Typography variant="a" asChild>
						<SiteLink to={post.url}>{post.title}</SiteLink>
					</Typography>
				)}
			/>
		</>
	);
}
