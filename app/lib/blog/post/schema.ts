import type { MdxArtifact } from "@temelj/mdx";
import * as v from "valibot";

import type { BlogTagData } from "~/lib/blog/tag/schema";

export const blogPostFrontmatterSchema = v.object({
	demo: v.optional(v.boolean(), false),
	title: v.pipe(v.string(), v.trim()),
	publishedDate: v.pipe(v.string(), v.trim()),
	modifiedDate: v.optional(v.pipe(v.string(), v.trim())),
	description: v.pipe(v.string(), v.trim(), v.regex(/[\.\?]$/)),
	tags: v.array(v.pipe(v.string(), v.trim())),
	priority: v.optional(v.number(), 0),
	cover: v.optional(
		v.union([
			v.pipe(v.string(), v.trim()),
			v.object({
				file: v.pipe(v.string(), v.trim()),
				width: v.number(),
				height: v.number(),
			}),
		]),
	),
});

export type BlogPostFrontmatter = v.InferOutput<
	typeof blogPostFrontmatterSchema
>;

export interface BlogPostCommon {
	title: string;
	url: string;
	publishedDate: string;
	modifiedDate?: string;
	priority: number;
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
