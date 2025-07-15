import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogPostFlatList } from "~/components/blog/BlogPostFlatList";
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

      <BlogPostFlatList
        posts={posts}
        renderPost={(post) => (
          <div className="flex flex-col">
            <Typography variant="a" className="mb-1" asChild>
              <Link to="/blog/$slug" params={{ slug: post.slug }}>
                {post.title}
              </Link>
            </Typography>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <BlogTagChip
                  key={tag.slug}
                  tag={tag}
                  variant="ghost"
                  size="xs"
                />
              ))}
            </div>
          </div>
        )}
      />
    </>
  );
}
