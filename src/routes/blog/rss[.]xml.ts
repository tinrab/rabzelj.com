import { createFileRoute } from "@tanstack/react-router";
import RSS from "rss";

import { serverConfig } from "~/config/server";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { pathLocator } from "~/lib/path-locator";

export const Route = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const now = new Date();

        const feed = new RSS({
          title: serverConfig.app.title,
          description: serverConfig.app.description,
          site_url: serverConfig.app.url,
          feed_url: `${serverConfig.app.url}${pathLocator.blog.rss}`,
          image_url: `${serverConfig.app.url}${pathLocator.assets.featured}`,
          pubDate: now,
          // 1 hour
          ttl: 60,
        });

        for (const post of await loadBlogPosts()) {
          feed.item({
            title: post.title,
            description: post.description,
            url: `${serverConfig.app.url}${pathLocator.blog.post.index(post.slug)}`,
            date: post.publishedDate,
            categories: post.tags.map((tag) => tag.slug),
          });
        }

        return new Response(feed.xml({ indent: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600, stale-while-revalidate=3600",
          },
        });
      },
    },
  },
});
