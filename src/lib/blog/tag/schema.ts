import { z } from "zod";

export const blogTagFrontmatterSchema = z.object({
  title: z.string(),
  description: z
    .string()
    .trim()
    .regex(/[\.\?]$/),
});

export type BlogTagFrontmatter = z.infer<typeof blogTagFrontmatterSchema>;

export interface BlogTagData {
  title: string;
  slug: string;
  description: string;
}

export interface BlogTagPostCountData extends BlogTagData {
  postCount: number;
}
