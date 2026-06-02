import type { BlogPostData, ExternalBlogData } from "~/lib/blog/post/schema";

import { blogData } from "~/-generated/blog";
import { blogTagIsNote } from "~/lib/blog/tag/utility";

export async function loadBlogPosts({
  tagSlug,
  selectNotes,
  includeArtifact,
}: {
  tagSlug?: string;
  selectNotes?: boolean;
  includeArtifact?: boolean;
} = {}): Promise<BlogPostData[]> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  let posts = blogData.posts.map((post) => selectPostFields(post, { includeArtifact }));

  if (tagSlug !== undefined) {
    posts = posts.filter((post) => post.tags.some((tag) => tag.slug === tagSlug));
  }

  if (selectNotes !== undefined) {
    posts = posts.filter((post) => post.tags.some(blogTagIsNote) === selectNotes);
  }

  return posts.sort((a, b) => {
    const dateCmp = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    if (dateCmp !== 0) {
      return dateCmp;
    }
    return a.slug.localeCompare(b.slug);
  });
}

export async function loadBlogPost(
  slug: string,
  { includeArtifact, includeRelated }: { includeArtifact?: boolean; includeRelated?: boolean } = {},
): Promise<BlogPostData | undefined> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const post = blogData.posts.find((candidate) => candidate.slug === slug);
  return post ? selectPostFields(post, { includeArtifact, includeRelated }) : undefined;
}

export async function loadExternalBlogData(): Promise<ExternalBlogData> {
  return blogData.external;
}

function selectPostFields(
  post: BlogPostData,
  { includeArtifact, includeRelated }: { includeArtifact?: boolean; includeRelated?: boolean },
): BlogPostData {
  return {
    ...post,
    artifact: includeArtifact ? post.artifact : undefined,
    related: includeRelated ? post.related : undefined,
  };
}
