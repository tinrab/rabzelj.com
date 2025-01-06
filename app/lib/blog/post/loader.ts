import { type HastElement, treeProcessorPlugin } from "@temelj/mdx";
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";
// import sharp from "@img/sharp-wasm32/sharp.node";

// console.log(sharp);

import { serverConfig } from "~/config/server";
import {
	blogPostFrontmatterSchema,
	type ExternalBlogData,
	type BlogPostCoverData,
	type BlogPostData,
} from "~/lib/blog/post/schema";
import { loadBlogTags } from "~/lib/blog/tag/loader";
import type { BlogTagData } from "~/lib/blog/tag/schema";
import { getMdxCompiler } from "~/lib/mdx/compiler";
import { pathLocator } from "~/lib/path-locator";

const DATA_DIR = path.join(process.cwd(), serverConfig.app.dataDir);
const POSTS_DIR = path.join(DATA_DIR, "blog/posts");
const POST_INDEX_FILE = "index.mdx";

export const BLOG_POST_IMAGE_SIZES: { width: number; suffix: string }[] = [
	{ width: 480, suffix: "sm" },
	{ width: 800, suffix: "md" },
	{ width: 1080, suffix: "lg" },
	{ width: 1280, suffix: "xl" },
	{ width: 1600, suffix: "xxl" },
];

export async function loadBlogPosts({
	tagSlug,
}: {
	tagSlug?: string;
} = {}): Promise<BlogPostData[]> {
	let posts: BlogPostData[] = [];
	for (const postDir of await fs.readdir(POSTS_DIR)) {
		const post = await readBlogPost(postDir);
		if (post !== undefined) {
			posts.push(post);
		}
	}

	{
		const allTags = await loadBlogTags();
		for (let i = 0; i < 42; i++) {
			const slug = `demo-post-${i}`;
			const frontmatter = {
				demo: true,
				title: `Demo post #${i}`,
				publishedDate: `2020-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 27) + 1}`,
				description: `Demo post #${i}.`,
				tags: ["rust"],
				cover: "cover.jpg",
			};
			const tags: BlogTagData[] = [];
			for (let i = 0; i < allTags.length / 2; i++) {
				tags.push(allTags[i]);
				if (Math.random() * allTags.length < 2) {
					break;
				}
			}
			posts.push({
				frontmatter,
				title: frontmatter.title,
				url: pathLocator.blog.post.index(slug),
				publishedDate: frontmatter.publishedDate,
				slug,
				tags,
				assetPath: "/",
			});
		}
	}

	if (tagSlug !== undefined) {
		posts = posts.filter((post) =>
			post.tags.some((tag) => tag.slug === tagSlug),
		);
	}

	if (process.env.NODE_ENV === "production") {
		posts = posts.filter((post) => !post.frontmatter.demo);
	}

	return posts.sort(
		(a, b) =>
			new Date(b.frontmatter.publishedDate).getTime() -
			new Date(a.frontmatter.publishedDate).getTime(),
	);
}

export async function loadBlogPost(
	slug: string,
	includeContent = false,
): Promise<BlogPostData | undefined> {
	for (const postDir of await fs.readdir(POSTS_DIR)) {
		if (!postDir.endsWith(slug)) {
			continue;
		}
		return await readBlogPost(postDir, includeContent);
	}

	return undefined;
}

export async function loadExternalBlogData(): Promise<ExternalBlogData> {
	return fs
		.readFile(path.join(DATA_DIR, "blog/external.json"), "utf8")
		.then((json) => JSON.parse(json) as ExternalBlogData);
}

async function readBlogPost(
	dir: string,
	includeContent = false,
): Promise<BlogPostData | undefined> {
	const slugIndex = dir.lastIndexOf("_");
	if (slugIndex === -1) {
		throw new Error(`Invalid blog post directory name '${dir}'`);
	}
	const slug = dir.slice(Math.max(0, slugIndex + 1));

	const assetPath = path.join(POSTS_DIR, dir);
	const source = await fs.readFile(
		path.join(assetPath, POST_INDEX_FILE),
		"utf8",
	);

	const compiler = await getMdxCompiler();
	const artifact = await compiler.compile(source, {
		frontmatterOnly: !includeContent,
		frontmatterSchema: blogPostFrontmatterSchema,
		mdxOptions: {
			rehypePlugins: [
				[
					treeProcessorPlugin,
					{
						process: (node: HastElement) => processTree(node, assetPath, slug),
					},
				],
			],
		},
	});
	const frontmatter = artifact.frontmatter;

	if (process.env.NODE_ENV === "production" && frontmatter.demo) {
		return;
	}

	const allTags = await loadBlogTags();
	const tags: BlogTagData[] = [];
	for (const tagSlug of frontmatter.tags) {
		const tag = allTags.find((tag) => tag.slug === tagSlug);
		if (!tag) {
			throw new Error(`Tag "${tagSlug}" not found`);
		}
		tags.push(tag);
	}

	let cover: BlogPostCoverData | undefined;
	if (typeof frontmatter.cover === "string") {
		const s = sharp(path.join(assetPath, frontmatter.cover));
		const md = await s.metadata();
		if (md.width && md.height) {
			cover = {
				file: frontmatter.cover,
				width: md.width,
				height: md.height,
			};
		}
	} else if (frontmatter.cover) {
		cover = {
			file: frontmatter.cover.file,
			width: frontmatter.cover.width,
			height: frontmatter.cover.height,
		};
	}

	return {
		...artifact,
		title: artifact.frontmatter.title,
		url: `${serverConfig.app.url}${pathLocator.blog.post.index(slug)}`,
		publishedDate: artifact.frontmatter.publishedDate,
		slug,
		tags,
		cover,
		assetPath,
	};
}

async function processTree(node: HastElement, assetPath: string, slug: string) {
	if (node.tagName === "img") {
		if (!node.properties.src || typeof node.properties.src !== "string") {
			throw new Error(`Image source not found for post '${slug}'`);
		}

		if (!node.properties.width || !node.properties.height) {
			const src = node.properties.src;
			const isRemote = src.startsWith("http");
			const s = sharp(isRemote ? src : path.join(assetPath, src));

			// Insert image size
			const md = await s.metadata();
			if (!md.width || !md.height) {
				throw new Error(`Invalid image '${src}'`);
			}
			node.properties.width = md.width;
			node.properties.height = md.height;

			// Generate srcset
			if (!isRemote) {
				const filePath = path.join(assetPath, src);
				const parsedFilePath = path.parse(filePath);

				let srcset = "";
				for (const { width, suffix } of BLOG_POST_IMAGE_SIZES) {
					if (md.width <= width) {
						continue;
					}
					const resizedName = `${parsedFilePath.name}--${suffix}${parsedFilePath.ext}`;
					srcset += `${pathLocator.blog.post.asset(slug, resizedName)} ${width}w,`;
				}

				if (srcset) {
					srcset = srcset.slice(0, -1);
					node.properties.srcset = srcset;
				}
			}
		}

		// Insert fake alt text
		if (!node.properties.alt) {
			node.properties.alt = node.properties.src;
		}

		// Set correct image path
		if (!node.properties.src.startsWith("http")) {
			const relativeSrc = pathLocator.blog.post.asset(
				slug,
				path.basename(node.properties.src),
			);
			if (!node.properties.src.startsWith(relativeSrc)) {
				node.properties.src = relativeSrc;
			}
		}

		// Lazy load
		node.properties.loading = "lazy";
		node.properties.decoding = "async";
	}
}
