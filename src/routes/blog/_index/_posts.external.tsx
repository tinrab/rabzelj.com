import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogPostList } from "~/components/blog/BlogPostList";
import { Typography } from "~/components/Typography";
import { loadExternalBlogData } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    const external = await loadExternalBlogData();
    return {
      flinectPosts: groupBlogPosts(external.flinect.posts),
    };
  });

export const Route = createFileRoute("/blog/_index/_posts/external")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { flinectPosts } = Route.useLoaderData();

  return (
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
            <Link to={post.url}>{post.title}</Link>
          </Typography>
        )}
      />
    </section>
  );
}
