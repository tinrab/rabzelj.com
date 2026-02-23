import { z } from "zod";

export const blogSeriesFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string().trim().regex(/[.?]$/),
  completed: z.boolean().default(false),
});

export type BlogSeriesFrontmatter = z.infer<typeof blogSeriesFrontmatterSchema>;

export interface BlogSeriesData {
  title: string;
  slug: string;
  description: string;
  completed: boolean;
}

export interface BlogSeriesPostData extends BlogSeriesData {
  posts: BlogSeriesPost[];
}

export interface BlogSeriesPost {
  title: string;
  slug: string;
  url: string;
  publishedDate: string;
}
