import { IconRss } from "@tabler/icons-react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { BlogTabList } from "~/components/blog/BlogTabList";
import { Typography } from "~/components/Typography";
import { Button } from "~/components/ui/button";
import { clientConfig } from "~/config/client";
import { pathLocator } from "~/lib/path-locator";

export const Route = createFileRoute("/blog/_index/_posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-6 pb-8 md:pt-12">
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-3 lg:mb-6">
          <Typography variant="h2" render={<h1>Blog</h1>} />

          <Button
            size="icon-sm"
            variant="ghost"
            nativeButton={false}
            render={
              <a
                href={`${clientConfig.app.url}${pathLocator.blog.rss}`}
                aria-label="Blog RSS feed"
              >
                <span className="sr-only">Blog RSS feed</span>
                <IconRss aria-hidden="true" />
              </a>
            }
          />
        </div>

        <Typography
          variant="a"
          render={<Link to="/blog/tags">See tags.</Link>}
        />
      </div>

      <div className="mb-8">
        <BlogTabList />
      </div>

      <Outlet />
    </div>
  );
}
