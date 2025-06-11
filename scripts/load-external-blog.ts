import fs from "node:fs/promises";
import path from "node:path";

import * as cheerio from "cheerio";
import SiteMapper from "sitemapper";

import type {
  BlogPostCommon,
  ExternalBlogData,
} from "../src/lib/blog/post/schema.ts";

async function loadFlinect(): Promise<BlogPostCommon[]> {
  const posts: BlogPostCommon[] = [];

  // @ts-ignore no types
  const sitemapper = new SiteMapper();
  const sitemap: { sites: string[] } = await sitemapper.fetch(
    "https://www.flinect.com/sitemap.xml",
  );

  for (const url of sitemap.sites.filter((url) => url.includes("/blog/"))) {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const title = $(`[property="og:title"]`)
      .attr("content")
      ?.replace(" | Flinect", "");
    const publishedDate = $(`[property="article:published_time"]`).attr(
      "content",
    );
    if (!title || !publishedDate) {
      continue;
    }

    if (
      [
        "deploy-nextjs-github-actions-cloudflare-pages",
        "nextjs-standalone-docker-sharp-installation",
        "quick-tips-rust-declarative-macros",
        "how-to-rust-cuda-basic-ffi",
      ].some((slug) => url.endsWith(slug))
    ) {
      continue;
    }

    posts.push({
      title,
      url: url,
      publishedDate: new Date(publishedDate).toISOString(),
      priority: 0,
    });
  }

  return posts;
}

export async function loadExternalBlog(): Promise<void> {
  await fs.writeFile(
    path.join(import.meta.dirname as string, "../data/blog/external.json"),
    JSON.stringify(
      {
        flinect: {
          posts: await loadFlinect(),
        },
      } as ExternalBlogData,
      null,
      2,
    ),
  );
}
