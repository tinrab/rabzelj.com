import type { HtmlRootNode } from "@temelj/mdx";

import { z } from "zod";

import type { BlogTagData } from "~/lib/blog/tag/schema";

export const blogPostFrontmatterSchema = z.object({
  demo: z.boolean().default(false),
  toc: z.boolean().default(false),
  title: z.string().trim(),
  publishedDate: z.string().trim(),
  modifiedDate: z.string().trim().optional(),
  description: z.string().trim().regex(/[.?]$/),
  tags: z.array(z.string().trim()),
  series: z.string().trim().optional(),
  cover: z
    .union([
      z
        .string()
        .trim()
        .transform((file): BlogPostCoverSource => ({ file })),
      z.object({
        file: z.string().trim(),
        height: z.number(),
        width: z.number(),
      }),
    ])
    .optional(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export interface BlogPostCoverSource {
  file: string;
  width?: number;
  height?: number;
}

export interface BlogPostSource {
  frontmatter: BlogPostFrontmatter;
  cover?: BlogPostCoverData;
}

export interface BlogPostContent {
  content: HtmlRootNode;
  toc?: BlogPostTableOfContentsItem[];
}

export interface BlogPostCommon {
  title: string;
  url: string;
  publishedDate: string;
  modifiedDate?: string;
}

export interface BlogPostData extends BlogPostCommon {
  slug: string;
  description: string;
  toc?: BlogPostTableOfContentsItem[];
  tags: BlogTagData[];
  cover?: BlogPostCoverData;
  content?: HtmlRootNode;
  related?: RelatedBlogPost[];
  series?: string;
}

export interface RelatedBlogPost {
  title: string;
  url: string;
  slug: string;
}

export interface BlogPostTableOfContentsItem {
  id: string;
  title: string;
  level: 2 | 3 | 4;
}

export interface BlogPostCoverData {
  src: string;
  width?: number;
  height?: number;
}

export interface BlogPostYearGroup<T extends BlogPostCommon> {
  year: number;
  posts: T[];
}
