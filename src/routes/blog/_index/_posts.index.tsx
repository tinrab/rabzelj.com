import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogIndexHeader } from "~/components/blog/BlogIndexHeader";
import { BlogPostList } from "~/components/blog/BlogPostList";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    return {
      groupedPosts: groupBlogPosts(await loadBlogPosts({ selectNotes: false })),
    };
  });

export const Route = createFileRoute("/blog/_index/_posts/")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { groupedPosts } = Route.useLoaderData();

  return (
    <>
      <BlogIndexHeader title="Blog">
        <p className="text-muted-foreground max-w-xl text-[1.0625rem] leading-relaxed">
          Writing on Rust, GPU programming, distributed systems and web development.
        </p>
      </BlogIndexHeader>
      <BlogPostList posts={groupedPosts} />
    </>
  );
}
