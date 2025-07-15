import { createServerFileRoute } from "@tanstack/react-start/server";
import RSS from "rss";

import { loadServerConfig } from "~/config/server";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { pathLocator } from "~/lib/path-locator";

export const ServerRoute = createServerFileRoute("/blog/rss.xml").methods({
  GET: async () => {
    const config = loadServerConfig();
    const now = new Date();

    const feed = new RSS({
      title: config.app.title,
      description: config.app.description,
      site_url: config.app.url,
      feed_url: `${config.app.url}${pathLocator.blog.rss}`,
      image_url: `${config.app.url}${pathLocator.assets.featured}`,
      pubDate: now,
      // 1 hour
      ttl: 60,
    });

    for (const post of await loadBlogPosts()) {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${config.app.url}${pathLocator.blog.post.index(post.slug)}`,
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
});
