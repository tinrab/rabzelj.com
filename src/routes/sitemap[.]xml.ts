import { createServerFileRoute } from "@tanstack/react-start/server";

import { loadServerConfig } from "~/config/server";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { loadBlogTagPostCounts } from "~/lib/blog/tag/loader";
import { pathLocator } from "~/lib/path-locator";

export const ServerRoute = createServerFileRoute("/sitemap.xml").methods({
  GET: async () => {
    const config = loadServerConfig();
    const now = new Date();
    const thisWeek = new Date(now);
    thisWeek.setDate(now.getDate() - now.getDay());

    const staticRoutes: SitemapUrl[] = ["/", pathLocator.blog.index].map(
      (path) => ({
        url: `${config.app.url}${path}`,
        changeFrequency: "weekly",
        lastModified: thisWeek,
      }),
    );

    const posts = await loadBlogPosts();
    const blogPostRoutes: SitemapUrl[] = posts.map((post) => ({
      url: `${config.app.url}${pathLocator.blog.post.index(post.slug)}`,
      changeFrequency: "weekly",
      lastModified: new Date(post.modifiedDate ?? post.publishedDate),
    }));

    const tags = await loadBlogTagPostCounts();
    const blogTagRoutes: SitemapUrl[] = tags.map((tag) => ({
      url: `${config.app.url}${pathLocator.blog.tags.page(tag.slug)}`,
      changeFrequency: "weekly",
      lastModified: thisWeek,
    }));

    return new Response(
      makeSitemap([...staticRoutes, ...blogPostRoutes, ...blogTagRoutes]),
      {
        status: 200,
        headers: {
          "Content-Type": "application/xml",
          "X-Content-Type-Options": "nosniff",
          "Cache-Control": "public, max-age=86400",
        },
      },
    );
  },
});

type SitemapUrl = {
  url: string;
  lastModified: Date;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
};

function makeSitemap(urls: SitemapUrl[]): string {
  const xmlUrls: string[] = [];
  for (const url of urls) {
    const lastModified = url.lastModified.toISOString();
    const changeFrequency = url.changeFrequency;
    const priority = url.priority ? url.priority.toFixed(1) : "";

    xmlUrls.push(`
      <url>
        <loc>${url.url}</loc>
        <lastmod>${lastModified}</lastmod>
        <changefreq>${changeFrequency}</changefreq>
        ${priority ? `<priority>${priority}</priority>` : ""}
      </url>
    `);
  }

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    >
      ${xmlUrls.join("\n")}
    </urlset>
  `.trim();
}
