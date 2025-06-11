import type { BlogPostCommon, BlogPostYearGroup } from "~/lib/blog/post/schema";

export function groupBlogPosts<T extends BlogPostCommon>(
  posts: T[],
): BlogPostYearGroup<T>[] {
  const groupedPosts: BlogPostYearGroup<T>[] = [];

  for (const post of posts) {
    const publishedDate = new Date(post.publishedDate);
    const year = publishedDate.getUTCFullYear();
    const month = publishedDate.toLocaleDateString("en-US", {
      month: "long",
    });

    let yearGroup = groupedPosts.find((group) => group.year === year);
    if (!yearGroup) {
      yearGroup = {
        year,
        months: [],
      };
      groupedPosts.push(yearGroup);
    }

    let monthGroup = yearGroup.months.find((group) => group.month === month);
    if (!monthGroup) {
      monthGroup = {
        month,
        posts: [],
      };
      yearGroup.months.push(monthGroup);
    }

    monthGroup.posts.push(post);
  }

  return groupedPosts;
}
