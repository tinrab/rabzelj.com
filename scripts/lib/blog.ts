import { type HastElement, treeProcessorPlugin } from "@temelj/mdx";
import { glob } from "glob";
import fs from "node:fs/promises";
import path from "node:path";

import type {
  BlogPostData,
  BlogPostTableOfContentsItem,
  ExternalBlogData,
} from "~/lib/blog/post/schema";
import type { BlogSeriesData } from "~/lib/blog/series/schema";
import type { BlogTagData } from "~/lib/blog/tag/schema";

import { blogPostFrontmatterSchema, type BlogPostCoverData } from "~/lib/blog/post/schema";
import { blogSeriesFrontmatterSchema } from "~/lib/blog/series/schema";
import { blogTagFrontmatterSchema } from "~/lib/blog/tag/schema";
import { getMdxCompiler } from "~/lib/mdx/compiler";
import { pathLocator } from "~/lib/path-locator";

import { imageMetadata } from "./image";

const DATA_DIR = path.resolve(process.env.TIN_APP_DATA_DIR ?? "./data");
const APP_URL = (process.env.TIN_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
const POSTS_DIR = path.join(DATA_DIR, "blog/posts");
const TAGS_DIR = path.join(DATA_DIR, "blog/tags");
const SERIES_DIR = path.join(DATA_DIR, "blog/series");
const POST_INDEX_FILE = "index.mdx";
const MAX_RELATED_POSTS = 3;

export const BLOG_POST_IMAGE_SIZES: { width: number; suffix: string }[] = [
  { width: 480, suffix: "sm" },
  { width: 800, suffix: "md" },
  { width: 1080, suffix: "lg" },
  { width: 1280, suffix: "xl" },
  { width: 1600, suffix: "xxl" },
];

export interface BlogData {
  posts: BlogPostData[];
  tags: BlogTagData[];
  series: BlogSeriesData[];
  external: ExternalBlogData;
}

export async function loadBlogData(): Promise<BlogData> {
  const tags = await loadSourceBlogTags();
  const posts = await loadSourceBlogPosts(tags);
  const series = await loadSourceBlogSeries();
  const external = await loadSourceExternalBlogData();

  for (const post of posts) {
    post.related = posts
      .filter(
        (candidate) =>
          candidate.slug !== post.slug &&
          candidate.tags.some((tag) => post.tags.some((postTag) => postTag.slug === tag.slug)),
      )
      .slice(0, MAX_RELATED_POSTS)
      .map((candidate) => ({
        title: candidate.title,
        slug: candidate.slug,
        url: candidate.url,
      }));
  }

  return { posts, tags, series, external };
}

async function loadSourceBlogPosts(tags: BlogTagData[]): Promise<BlogPostData[]> {
  const posts: BlogPostData[] = [];

  for (const postIndexPath of await glob(`${POSTS_DIR}/**/${POST_INDEX_FILE}`)) {
    const postDir = path.dirname(postIndexPath);
    const post = await readBlogPost(postDir, tags);
    if (post) {
      posts.push(post);
    }
  }

  return posts.sort((a, b) => {
    const dateCmp = new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    if (dateCmp !== 0) {
      return dateCmp;
    }
    return a.slug.localeCompare(b.slug);
  });
}

async function loadSourceBlogTags(): Promise<BlogTagData[]> {
  const compiler = await getMdxCompiler();
  const tags: BlogTagData[] = [];

  for (const tagFile of await fs.readdir(TAGS_DIR)) {
    const source = await fs.readFile(path.join(TAGS_DIR, tagFile), "utf8");
    const { frontmatter } = await compiler.compile(
      source,
      {
        frontmatterOnly: true,
      },
      blogTagFrontmatterSchema,
    );

    tags.push({
      title: frontmatter.title,
      slug: tagFile.slice(0, Math.max(0, tagFile.length - 4)),
      description: frontmatter.description,
    });
  }

  return tags.sort((a, b) => a.title.localeCompare(b.title));
}

async function loadSourceBlogSeries(): Promise<BlogSeriesData[]> {
  try {
    await fs.access(SERIES_DIR);
  } catch {
    return [];
  }

  const compiler = await getMdxCompiler();
  const series: BlogSeriesData[] = [];

  for (const seriesFile of await fs.readdir(SERIES_DIR)) {
    const source = await fs.readFile(path.join(SERIES_DIR, seriesFile), "utf8");
    const { frontmatter } = await compiler.compile(
      source,
      {
        frontmatterOnly: true,
      },
      blogSeriesFrontmatterSchema,
    );

    series.push({
      title: frontmatter.title,
      slug: seriesFile.slice(0, Math.max(0, seriesFile.length - 4)),
      description: frontmatter.description,
      completed: frontmatter.completed,
    });
  }

  return series.sort((a, b) => a.title.localeCompare(b.title));
}

async function loadSourceExternalBlogData(): Promise<ExternalBlogData> {
  return fs
    .readFile(path.join(DATA_DIR, "blog/external.json"), "utf8")
    .then((json) => JSON.parse(json) as ExternalBlogData)
    .then((external) => ({
      flinect: {
        posts: external.flinect.posts.map((post) => ({
          title: post.title,
          url: post.url,
          publishedDate: post.publishedDate,
        })),
      },
    }));
}

async function readBlogPost(dir: string, tags: BlogTagData[]): Promise<BlogPostData | undefined> {
  const slugIndex = dir.lastIndexOf("_");
  if (slugIndex === -1) {
    throw new Error(`Invalid blog post directory name '${dir}'`);
  }
  const slug = dir.slice(Math.max(0, slugIndex + 1));

  const dirDatePrefix = dir.slice(dir.lastIndexOf(path.sep) + 1, slugIndex + 1);
  if (!/^\d{4}-\d{2}-\d{2}_$/.test(dirDatePrefix)) {
    throw new Error(`Invalid blog post directory date prefix '${dirDatePrefix}' in '${dir}'`);
  }
  const dirDate = dirDatePrefix.slice(0, -1);

  const source = await fs.readFile(path.join(dir, POST_INDEX_FILE), "utf8");
  const toc: BlogPostTableOfContentsItem[] = [];

  const compiler = await getMdxCompiler();
  const artifact = await compiler.compile(
    source,
    {
      frontmatterOnly: false,
      mdxOptions: {
        rehypePlugins: [
          [
            treeProcessorPlugin,
            {
              process: (node: HastElement) => processTree(node, dir, slug, toc),
            },
          ],
        ],
      },
    },
    blogPostFrontmatterSchema,
  );
  const frontmatter = artifact.frontmatter;

  if (dirDate !== frontmatter.publishedDate) {
    throw new Error(
      `Directory date prefix '${dirDate}' does not match publishedDate '${frontmatter.publishedDate}' in '${slug}'`,
    );
  }

  if (process.env.NODE_ENV === "production" && frontmatter.demo) {
    return undefined;
  }

  const normalizedTagSlugs = frontmatter.tags.map((tagSlug) => tagSlug.toLowerCase());
  const postTags = normalizedTagSlugs
    .map((tagSlug) => {
      const tag = tags.find((candidate) => candidate.slug === tagSlug);
      if (!tag) {
        throw new Error(`Tag "${tagSlug}" not found`);
      }
      return tag;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  let cover: BlogPostCoverData | undefined;
  if (typeof frontmatter.cover === "string") {
    const md = await imageMetadata(path.join(dir, frontmatter.cover));
    cover = {
      file: frontmatter.cover,
      width: md.width,
      height: md.height,
    };
  } else if (frontmatter.cover) {
    cover = {
      file: frontmatter.cover.file,
      width: frontmatter.cover.width,
      height: frontmatter.cover.height,
    };
  }

  if (cover) {
    const { width, height, srcSet } = await processPostImage(cover.file, slug, dir);
    if (!cover.width || !cover.height) {
      cover.width = width;
      cover.height = height;
    }
    cover.srcSet = srcSet;
  }

  return {
    title: artifact.frontmatter.title,
    url: `${APP_URL}${pathLocator.blog.post.index(slug)}`,
    slug,
    publishedDate: artifact.frontmatter.publishedDate,
    modifiedDate: artifact.frontmatter.modifiedDate,
    description: artifact.frontmatter.description,
    priority: artifact.frontmatter.priority,
    toc: artifact.frontmatter.toc ? toc : undefined,
    tags: postTags,
    cover,
    assetPath: dir,
    artifact,
    related: [],
    series: artifact.frontmatter.series,
  };
}

async function processTree(
  node: HastElement,
  assetPath: string,
  slug: string,
  toc: BlogPostTableOfContentsItem[],
) {
  if (
    (node.tagName === "h1" || node.tagName === "h2" || node.tagName === "h3") &&
    typeof node.properties.id === "string"
  ) {
    const title = getNodeText(node).replace(/\s+/g, " ").trim();
    if (title) {
      toc.push({
        id: node.properties.id,
        title,
        level: node.tagName === "h1" ? 2 : node.tagName === "h2" ? 3 : 4,
      });
    }
  }

  if (node.tagName !== "img") {
    return;
  }

  if (!node.properties.src || typeof node.properties.src !== "string") {
    throw new Error(`Image source not found for post '${slug}'`);
  }

  if (!node.properties.width || !node.properties.height) {
    const { width, height, srcSet } = await processPostImage(node.properties.src, slug, assetPath);
    node.properties.width = width;
    node.properties.height = height;

    if (srcSet) {
      node.properties.srcset = srcSet;
    }
  }

  if (!node.properties.alt) {
    node.properties.alt = node.properties.src;
  }

  if (!node.properties.src.startsWith("http")) {
    const relativeSrc = pathLocator.blog.post.asset(slug, path.basename(node.properties.src));
    if (!node.properties.src.startsWith(relativeSrc)) {
      node.properties.src = relativeSrc;
    }
  }

  node.properties.loading = "lazy";
  node.properties.decoding = "async";
}

function getNodeText(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }

  if (!("children" in node) || !Array.isArray(node.children)) {
    return "";
  }

  return node.children.map((child) => getNodeText(child)).join("");
}

async function processPostImage(
  src: string,
  slug: string,
  assetPath: string,
): Promise<{
  width: number;
  height: number;
  srcSet?: string;
}> {
  const isRemote = src.startsWith("http");
  const md = await imageMetadata(isRemote ? src : path.join(assetPath, src));

  let srcSet = "";
  if (!isRemote && !src.endsWith(".gif")) {
    const filePath = path.join(assetPath, src);
    const parsedFilePath = path.parse(filePath);

    for (const { width, suffix } of BLOG_POST_IMAGE_SIZES) {
      if (md.width <= width) {
        continue;
      }
      const resizedName = `${parsedFilePath.name}--${suffix}${parsedFilePath.ext}`;
      srcSet += `${pathLocator.blog.post.asset(slug, resizedName)} ${width}w,`;
    }

    if (srcSet) {
      srcSet = srcSet.slice(0, -1);
    }
  }

  return {
    width: md.width,
    height: md.height,
    srcSet: srcSet || undefined,
  };
}
