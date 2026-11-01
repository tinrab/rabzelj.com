import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { BlogIndexHeader } from "~/components/blog/BlogIndexHeader";
import { SpineBody, SpineRow } from "~/components/layout/Spine";
import { loadBlogTagPostCounts } from "~/lib/blog/tag/loader";
import { pageMiddleware } from "~/lib/middleware";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    const tags = await loadBlogTagPostCounts();

    return { tags: tags.sort((a, b) => a.title.localeCompare(b.title)) };
  });

export const Route = createFileRoute("/blog/_index/tags/")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

function RouteComponent() {
  const { tags } = Route.useLoaderData();

  return (
    <>
      <BlogIndexHeader title="Tags" />
      <SpineRow className="border-t py-8 xl:py-12">
        <SpineBody wide className="xl:col-start-2">
          <ul className="grid gap-x-12 sm:grid-cols-2 xl:grid-cols-3">
            {tags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  to="/blog/tags/$slug"
                  params={{ slug: tag.slug }}
                  className="group flex items-baseline justify-between gap-4 border-b py-2.5"
                >
                  <span className="decoration-link text-[1.0625rem] underline-offset-[0.3em] group-hover:underline">
                    {tag.title}
                  </span>
                  <span className="text-muted-foreground text-sm tabular-nums">
                    {tag.postCount}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SpineBody>
      </SpineRow>
    </>
  );
}
