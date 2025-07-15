import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { BlogPostList } from "~/components/blog/BlogPostList";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { Typography } from "~/components/Typography";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { groupBlogPosts } from "~/lib/blog/post/utility";
import { loadBlogTag } from "~/lib/blog/tag/loader";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .validator(z.object({ slug: z.string().min(1) }))
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
        <Typography>{tag.description}</Typography>

        <Typography variant="a" asChild>
          <Link to="/blog/tags">See all tags.</Link>
        </Typography>
      </div>

      <BlogPostList
        posts={groupedPosts}
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
    </div>
  );
}
