import { blogData } from "~/-generated/blog";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { type BlogTagData, type BlogTagPostCountData } from "~/lib/blog/tag/schema";
import { blogTagIsNote } from "~/lib/blog/tag/utility";

export async function loadBlogTags(): Promise<BlogTagData[]> {
  return blogData.tags;
}

export async function loadBlogTag(slug: string): Promise<BlogTagData | undefined> {
  const tags = await loadBlogTags();
  return tags.find((tag) => tag.slug === slug);
}

export async function loadBlogTagPostCounts(
  { used }: { used?: boolean } = { used: true },
): Promise<BlogTagPostCountData[]> {
  const tags = await loadBlogTags();
  const selectedTags: BlogTagPostCountData[] = [];

  let posts = await loadBlogPosts();
  posts = posts.filter((post) => !post.tags.some(blogTagIsNote));

  for (const tag of tags) {
    const postCount = posts.filter((post) =>
      post.tags.some((postTag) => postTag.slug === tag.slug),
    ).length;

    if (!used || postCount > 0) {
      selectedTags.push({ ...tag, postCount });
    }
  }

  return selectedTags.sort((a, b) => b.postCount - a.postCount);
}
