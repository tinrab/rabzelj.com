import type { MdxArtifact } from "@temelj/mdx";
import { z } from "zod";

import type { BlogTagData } from "~/lib/blog/tag/schema";

export const blogPostFrontmatterSchema = z.object({
	demo: z.boolean().default(false),
	title: z.string(),
	publishedDate: z.string(),
	modifiedDate: z.string().optional(),
	description: z.string(),
	tags: z.array(z.string()),
	cover: z
		.union([
			z.string(),
			z.object({
				file: z.string(),
				width: z.number(),
				height: z.number(),
			}),
		])
		.optional(),
});

export type BlogPostFrontmatter = z.infer<typeof blogPostFrontmatterSchema>;

export interface BlogPostCommon {
	title: string;
	url: string;
	publishedDate: string;
	modifiedDate?: string;
}

export interface BlogPostData extends BlogPostCommon {
	slug: string;
	description: string;
	tags: BlogTagData[];
	cover?: BlogPostCoverData;
	assetPath: string;
	artifact?: MdxArtifact<BlogPostFrontmatter>;
	related?: RelatedBlogPost[];
}

export interface RelatedBlogPost {
	title: string;
	url: string;
	slug: string;
}

export interface BlogPostCoverData {
	file: string;
	width: number;
	height: number;
}

export interface ExternalBlogData {
	flinect: {
		posts: ExternalBlogPostData[];
	};
	outcrawl: {
		posts: ExternalBlogPostData[];
	};
}

export interface ExternalBlogPostData {
	title: string;
	url: string;
	publishedDate: string;
}

export interface BlogPostYearGroup<T extends BlogPostCommon> {
	year: number;
	months: BlogPostMonthGroup<T>[];
}

export interface BlogPostMonthGroup<T extends BlogPostCommon> {
	month: string;
	posts: T[];
}
