import { promises as fs } from "node:fs";
import path from "node:path";

import { serverConfig } from "~/config/server";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import {
	blogTagFrontmatterSchema,
	type BlogTagData,
	type BlogTagPostCountData,
} from "~/lib/blog/tag/schema";
import { getMdxCompiler } from "~/lib/mdx/compiler";

const TAGS_DIR = path.join(
	process.cwd(),
	serverConfig.app.dataDir,
	"blog/tags",
);

export async function loadBlogTags(): Promise<BlogTagData[]> {
	const compiler = await getMdxCompiler();

	const tags: BlogTagData[] = [];

	for (const tagFile of await fs.readdir(TAGS_DIR)) {
		const source = await fs.readFile(path.join(TAGS_DIR, tagFile), "utf8");
		const { frontmatter } = await compiler.compile(source, {
			frontmatterOnly: true,
			frontmatterSchema: blogTagFrontmatterSchema,
		});

		const slug = tagFile.slice(0, Math.max(0, tagFile.length - 4));

		tags.push({
			title: frontmatter.title,
			slug,
			description: frontmatter.description,
		});
	}

	return tags.sort((a, b) => a.title.localeCompare(b.title));
}

export async function loadBlogTag(
	slug: string,
): Promise<BlogTagData | undefined> {
	const tags = await loadBlogTags();
	return tags.find((tag) => tag.slug === slug);
}

export async function loadBlogTagPostCounts(
	{ used }: { used?: boolean } = { used: true },
): Promise<BlogTagPostCountData[]> {
	const tags = await loadBlogTags();
	const posts = await loadBlogPosts();
	const selectedTags: BlogTagPostCountData[] = [];

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
