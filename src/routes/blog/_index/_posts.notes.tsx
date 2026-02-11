import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { Typography } from "~/components/Typography";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    return {
      posts: await loadBlogPosts({ selectNotes: true }),
    };
  });

export const Route = createFileRoute("/blog/_index/_posts/notes")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { posts } = Route.useLoaderData();

  return (
    <>
      <BlogNoteAlert className="mb-4" />

      <div className="flex flex-col gap-2">
        {posts.map((post) => (
          <div key={post.slug} className="flex flex-col">
            <Typography
              variant="a"
              className="mb-1 text-xl tracking-tight text-balance"
              render={
                <Link to="/blog/$slug" params={{ slug: post.slug }}>
                  {post.title}
                </Link>
              }
            />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <BlogTagChip key={tag.slug} tag={tag} variant="ghost" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
