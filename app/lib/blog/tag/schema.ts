import * as v from "valibot";

export const blogTagFrontmatterSchema = v.object({
	title: v.string(),
	description: v.pipe(v.string(), v.trim(), v.regex(/[\.\?]$/)),
});

export type BlogTagFrontmatter = v.InferOutput<typeof blogTagFrontmatterSchema>;

export interface BlogTagData {
	title: string;
	slug: string;
	description: string;
}

export interface BlogTagPostCountData extends BlogTagData {
	postCount: number;
}
