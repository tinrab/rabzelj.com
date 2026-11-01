import type { BlogPostCommon, BlogPostYearGroup } from "~/lib/blog/post/schema";

export function groupBlogPosts<T extends BlogPostCommon>(posts: T[]): BlogPostYearGroup<T>[] {
  const groupedPosts: BlogPostYearGroup<T>[] = [];

  for (const post of posts) {
    const year = new Date(post.publishedDate).getUTCFullYear();
    let yearGroup = groupedPosts.find((group) => group.year === year);

    if (!yearGroup) {
      yearGroup = { year, posts: [] };
      groupedPosts.push(yearGroup);
    }

    yearGroup.posts.push(post);
  }

  return groupedPosts;
}

export function formatBlogPostDay(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function formatBlogPostMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    timeZone: "UTC",
  });
}

export function formatBlogPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
