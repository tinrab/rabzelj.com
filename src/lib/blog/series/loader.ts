import fs from "node:fs/promises";
import path from "node:path";

import { serverConfig } from "~/config/server";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import {
  type BlogSeriesData,
  type BlogSeriesPostData,
  type BlogSeriesPost,
  blogSeriesFrontmatterSchema,
} from "~/lib/blog/series/schema";
import { getMdxCompiler } from "~/lib/mdx/compiler";

const SERIES_DIR = path.join(process.cwd(), serverConfig.app.dataDir, "blog/series");

export async function loadBlogSeries(): Promise<BlogSeriesData[]> {
  try {
    await fs.access(SERIES_DIR);
  } catch {
    return [];
  }

  const compiler = await getMdxCompiler();

  const series: BlogSeriesData[] = [];

  for (const seriesFile of await fs.readdir(SERIES_DIR)) {
    const source = await fs.readFile(path.join(SERIES_DIR, seriesFile), "utf8");
    const { frontmatter } = await compiler.compile(
      source,
      {
        frontmatterOnly: true,
      },
      blogSeriesFrontmatterSchema,
    );

    const slug = seriesFile.slice(0, Math.max(0, seriesFile.length - 4));

    series.push({
      title: frontmatter.title,
      slug,
      description: frontmatter.description,
      completed: frontmatter.completed,
    });
  }

  return series.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadBlogSeriesBySlug(slug: string): Promise<BlogSeriesData | undefined> {
  const series = await loadBlogSeries();
  return series.find((s) => s.slug === slug);
}

export async function loadBlogSeriesWithPosts(
  slug: string,
): Promise<BlogSeriesPostData | undefined> {
  const series = await loadBlogSeriesBySlug(slug);
  if (!series) {
    return undefined;
  }

  const allPosts = await loadBlogPosts();
  const seriesPosts: BlogSeriesPost[] = allPosts
    .filter((post) => {
      const postSeries = (post as { series?: string }).series;
      return postSeries === slug;
    })
    .map((post) => ({
      title: post.title,
      slug: post.slug,
      url: post.url,
      publishedDate: post.publishedDate,
    }))
    .sort((a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime());

  return {
    ...series,
    posts: seriesPosts,
  };
}
