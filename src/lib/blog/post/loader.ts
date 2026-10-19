import type { BlogPostData, ExternalBlogData } from "~/lib/blog/post/schema";

import { loadBlogData, loadBlogPostContent } from "~/lib/blog/loader";
import { blogTagIsNote } from "~/lib/blog/tag/utility";

export async function loadBlogPosts({
  tagSlug,
  selectNotes,
  includeContent,
}: {
  tagSlug?: string;
  selectNotes?: boolean;
  includeContent?: boolean;
} = {}): Promise<BlogPostData[]> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const blogData = await loadBlogData();
  let posts = blogData.posts;

  if (tagSlug !== undefined) {
    posts = posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
  }

  if (selectNotes !== undefined) {
    posts = posts.filter((post) => post.tags.some(blogTagIsNote) === selectNotes);
  }

  const selectedPosts = await Promise.all(
    posts.map((post) => selectPostFields(post, { includeContent })),
  );
  return selectedPosts.sort((a, b) => {
    const dateCmp = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    if (dateCmp !== 0) {
      return dateCmp;
    }
    return a.slug.localeCompare(b.slug);
  });
}

export async function loadBlogPost(
  slug: string,
  { includeContent, includeRelated }: { includeContent?: boolean; includeRelated?: boolean } = {},
): Promise<BlogPostData | undefined> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const blogData = await loadBlogData();
  const post = blogData.posts.find((candidate) => candidate.slug === slug);
  return post ? selectPostFields(post, { includeContent, includeRelated }) : undefined;
}

export async function loadExternalBlogData(): Promise<ExternalBlogData> {
  const blogData = await loadBlogData();
  return blogData.external;
}

async function selectPostFields(
  post: BlogPostData,
  { includeContent, includeRelated }: { includeContent?: boolean; includeRelated?: boolean },
): Promise<BlogPostData> {
  const article = includeContent ? await loadBlogPostContent(post.slug) : undefined;
  return {
    ...post,
    content: article?.content,
    toc: article?.toc,
    related: includeRelated ? post.related : undefined,
  };
}
