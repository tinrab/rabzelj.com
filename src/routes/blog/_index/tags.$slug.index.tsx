import { createFileRoute, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { BlogIndexHeader } from "~/components/blog/BlogIndexHeader";
import { BlogPostList } from "~/components/blog/BlogPostList";
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
    <>
      <BlogIndexHeader title={tag.title}>
        <p className="text-muted-foreground max-w-xl text-[1.0625rem] leading-relaxed">
          {tag.description}
        </p>
      </BlogIndexHeader>
      <BlogPostList posts={groupedPosts} />
    </>
  );
}
