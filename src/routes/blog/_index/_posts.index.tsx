import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogPostList } from "~/components/blog/BlogPostList";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";

const loadRouteData = createServerFn({ type: "static", method: "GET" }).handler(
  async () => {
    return {
      groupedPosts: groupBlogPosts(await loadBlogPosts({ selectNotes: false })),
    };
  },
);

export const Route = createFileRoute("/blog/_index/_posts/")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { groupedPosts } = Route.useLoaderData();

  return (
    <BlogPostList
      posts={groupedPosts}
      renderPost={(post) => (
        <div className="flex flex-col">
          <Typography variant="a" className="mb-1" asChild>
            <SiteLink to={`/blog/${post.slug}`}>{post.title}</SiteLink>
          </Typography>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <BlogTagChip key={tag.slug} tag={tag} variant="ghost" size="xs" />
            ))}
          </div>
        </div>
      )}
    />
  );
}
