import fs from "node:fs/promises";
import path from "node:path";

import { type HastElement, treeProcessorPlugin } from "@temelj/mdx";
import { glob } from "glob";
import sharp from "sharp";

import { serverConfig } from "~/config/server";
import {
  type BlogPostCoverData,
  type BlogPostData,
  blogPostFrontmatterSchema,
  type ExternalBlogData,
  type RelatedBlogPost,
} from "~/lib/blog/post/schema";
import { loadBlogTags } from "~/lib/blog/tag/loader";
import type { BlogTagData } from "~/lib/blog/tag/schema";
import { getMdxCompiler } from "~/lib/mdx/compiler";
import { pathLocator } from "~/lib/path-locator";
import { blogTagIsNote } from "~/lib/blog/tag/utility";

const DATA_DIR = path.join(process.cwd(), serverConfig.app.dataDir);
const POSTS_DIR = path.join(DATA_DIR, "blog/posts");
const POST_INDEX_FILE = "index.mdx";
const MAX_RELATED_POSTS = 3;

export const BLOG_POST_IMAGE_SIZES: { width: number; suffix: string }[] = [
  { width: 480, suffix: "sm" },
  { width: 800, suffix: "md" },
  { width: 1080, suffix: "lg" },
  { width: 1280, suffix: "xl" },
  { width: 1600, suffix: "xxl" },
];

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

  let posts: BlogPostData[] = [];
  for (const postIndexPath of await glob(
    `${POSTS_DIR}/**/${POST_INDEX_FILE}`,
  )) {
    const postDir = path.dirname(postIndexPath);

    const post = await readBlogPost(postDir, { includeArtifact });
    if (post !== undefined) {
      posts.push(post);
    }
  }

  if (tagSlug !== undefined) {
    posts = posts.filter((post) =>
      post.tags.some((tag) => tag.slug === tagSlug),
    );
  }

  if (selectNotes !== undefined) {
    posts = posts.filter(
      (post) => post.tags.some(blogTagIsNote) === selectNotes,
    );
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime(),
  );
}

export async function loadBlogPost(
  slug: string,
  {
    includeArtifact,
    includeRelated,
  }: { includeArtifact?: boolean; includeRelated?: boolean } = {},
): Promise<BlogPostData | undefined> {
  if (process.env.NODE_ENV === "development") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  for (const postIndexPath of await glob(
    `${POSTS_DIR}/**/${POST_INDEX_FILE}`,
  )) {
    const postDir = path.dirname(postIndexPath);
    if (!postDir.endsWith(slug)) {
      continue;
    }
    return await readBlogPost(postDir, { includeArtifact, includeRelated });
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
  {
    includeArtifact,
    includeRelated,
  }: { includeArtifact?: boolean; includeRelated?: boolean } = {},
): Promise<BlogPostData | undefined> {
  const slugIndex = dir.lastIndexOf("_");
  if (slugIndex === -1) {
    throw new Error(`Invalid blog post directory name '${dir}'`);
  }
  const slug = dir.slice(Math.max(0, slugIndex + 1));

  const source = await fs.readFile(path.join(dir, POST_INDEX_FILE), "utf8");

  const compiler = await getMdxCompiler();
  const artifact = await compiler.compile(
    source,
    {
      frontmatterOnly: !includeArtifact,
      mdxOptions: {
        rehypePlugins: [
          [
            treeProcessorPlugin,
            {
              process: (node: HastElement) => processTree(node, dir, slug),
            },
          ],
        ],
      },
    },
    blogPostFrontmatterSchema,
  );
  const frontmatter = artifact.frontmatter;

  if (process.env.NODE_ENV === "production" && frontmatter.demo) {
    return;
  }

  for (let i = 0; i < frontmatter.tags.length; i++) {
    frontmatter.tags[i] = frontmatter.tags[i].toLowerCase();
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
  tags.sort((a, b) => a.slug.localeCompare(b.slug));

  let cover: BlogPostCoverData | undefined;
  if (typeof frontmatter.cover === "string") {
    const s = sharp(path.join(dir, frontmatter.cover));
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

  if (cover) {
    const { width, height, srcSet } = await processPostImage(
      cover.file,
      slug,
      dir,
    );
    if (!cover.width || !cover.height) {
      cover.width = width;
      cover.height = height;
    }
    cover.srcSet = srcSet;
  }

  let related: RelatedBlogPost[] | undefined;
  if (includeRelated) {
    for (const post of await loadBlogPosts()) {
      if (
        post.slug === slug ||
        !post.tags.some((tag) =>
          tags.some((postTag) => postTag.slug === tag.slug),
        )
      ) {
        continue;
      }
      if (!related) {
        related = [];
      }
      related.push({
        title: post.title,
        slug: post.slug,
        url: post.url,
      });
    }
  }
  related = related?.slice(0, MAX_RELATED_POSTS);

  return {
    title: artifact.frontmatter.title,
    url: `${serverConfig.app.url}${pathLocator.blog.post.index(slug)}`,
    slug,
    publishedDate: artifact.frontmatter.publishedDate,
    modifiedDate: artifact.frontmatter.modifiedDate,
    description: artifact.frontmatter.description,
    priority: artifact.frontmatter.priority,
    tags,
    cover,
    assetPath: dir,
    artifact: includeArtifact ? artifact : undefined,
    related,
  };
}

async function processTree(node: HastElement, assetPath: string, slug: string) {
  if (node.tagName === "img") {
    if (!node.properties.src || typeof node.properties.src !== "string") {
      throw new Error(`Image source not found for post '${slug}'`);
    }

    if (!node.properties.width || !node.properties.height) {
      const { width, height, srcSet } = await processPostImage(
        node.properties.src,
        slug,
        assetPath,
      );

      node.properties.width = width;
      node.properties.height = height;

      if (srcSet) {
        node.properties.srcset = srcSet;
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
  const s = sharp(isRemote ? src : path.join(assetPath, src));

  const md = await s.metadata();
  if (!md.width || !md.height) {
    throw new Error(`Invalid image '${src}'`);
  }

  // Generate srcset
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
    srcSet: srcSet ? srcSet : undefined,
  };
}
