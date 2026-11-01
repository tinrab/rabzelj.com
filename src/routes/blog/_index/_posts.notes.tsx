import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogIndexHeader } from "~/components/blog/BlogIndexHeader";
import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogPostList } from "~/components/blog/BlogPostList";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    return {
      groupedPosts: groupBlogPosts(await loadBlogPosts({ selectNotes: true })),
    };
  });

export const Route = createFileRoute("/blog/_index/_posts/notes")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { groupedPosts } = Route.useLoaderData();

  return (
    <>
      <BlogIndexHeader title="Notes">
        <BlogNoteAlert />
      </BlogIndexHeader>
      <BlogPostList posts={groupedPosts} />
    </>
  );
}
