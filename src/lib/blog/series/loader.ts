import { blogData } from "~/-generated/blog";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import {
  type BlogSeriesData,
  type BlogSeriesPostData,
  type BlogSeriesPost,
} from "~/lib/blog/series/schema";

export async function loadBlogSeries(): Promise<BlogSeriesData[]> {
  return blogData.series;
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
