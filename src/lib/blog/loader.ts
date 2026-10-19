import type { HtmlRootNode } from "@temelj/mdx";

import { documentFrontmatter, htmlText, rewriteHtml, selectHtml, SourceFile } from "@temelj/mdx";

import type {
  BlogPostCoverData,
  BlogPostData,
  BlogPostTableOfContentsItem,
  ExternalBlogData,
} from "~/lib/blog/post/schema";
import type { BlogSeriesData } from "~/lib/blog/series/schema";
import type { BlogTagData } from "~/lib/blog/tag/schema";

import { blogPostAssetUrls } from "~/lib/blog/assets";
import { blogPostFrontmatterSchema } from "~/lib/blog/post/schema";
import { blogSeriesFrontmatterSchema } from "~/lib/blog/series/schema";
import { blogTagFrontmatterSchema } from "~/lib/blog/tag/schema";
import { getMdxProcessor } from "~/lib/mdx/processor";
import { pathLocator } from "~/lib/path-locator";

import externalBlogData from "../../../data/blog/external.json";

const postSources = import.meta.glob<string>("../../../data/blog/posts/**/index.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const tagSources = import.meta.glob<string>("../../../data/blog/tags/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const seriesSources = import.meta.glob<string>("../../../data/blog/series/*.mdx", {
  eager: true,
  import: "default",
  query: "?raw",
});

const MAX_RELATED_POSTS = 3;

interface BlogData {
  posts: BlogPostData[];
  tags: BlogTagData[];
  series: BlogSeriesData[];
  external: ExternalBlogData;
}

let blogDataPromise: Promise<BlogData> | undefined;

export function loadBlogData(): Promise<BlogData> {
  blogDataPromise ??= createBlogData();
  return blogDataPromise;
}

async function createBlogData(): Promise<BlogData> {
  const [tags, series] = await Promise.all([loadSourceBlogTags(), loadSourceBlogSeries()]);
  const posts = await loadSourceBlogPosts(tags);

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

  return {
    posts,
    tags,
    series,
    external: {
      flinect: {
        posts: externalBlogData.flinect.posts.map((post) => ({
          title: post.title,
          url: post.url,
          publishedDate: post.publishedDate,
        })),
      },
    },
  };
}

async function loadSourceBlogPosts(tags: BlogTagData[]): Promise<BlogPostData[]> {
  const posts = await Promise.all(
    Object.entries(postSources).map(([sourcePath, source]) =>
      readBlogPost(sourcePath, source, tags),
    ),
  );

  return posts
    .filter((post): post is BlogPostData => post !== undefined)
    .sort((a, b) => {
      const dateComparison =
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      return dateComparison || a.slug.localeCompare(b.slug);
    });
}

async function loadSourceBlogTags(): Promise<BlogTagData[]> {
  const processor = await getMdxProcessor();
  const tags = await Promise.all(
    Object.entries(tagSources).map(async ([sourcePath, source]) => {
      const { document } = processor.parse(new SourceFile({ name: sourcePath, text: source }));
      const frontmatter = blogTagFrontmatterSchema.parse(documentFrontmatter(document)?.data);

      return {
        title: frontmatter.title,
        slug: sourceFileName(sourcePath),
        description: frontmatter.description,
      };
    }),
  );

  return tags.sort((a, b) => a.title.localeCompare(b.title));
}

async function loadSourceBlogSeries(): Promise<BlogSeriesData[]> {
  const processor = await getMdxProcessor();
  const series = await Promise.all(
    Object.entries(seriesSources).map(async ([sourcePath, source]) => {
      const { document } = processor.parse(new SourceFile({ name: sourcePath, text: source }));
      const frontmatter = blogSeriesFrontmatterSchema.parse(documentFrontmatter(document)?.data);

      return {
        title: frontmatter.title,
        slug: sourceFileName(sourcePath),
        description: frontmatter.description,
        completed: frontmatter.completed,
      };
    }),
  );

  return series.sort((a, b) => a.title.localeCompare(b.title));
}

async function readBlogPost(
  sourcePath: string,
  source: string,
  tags: BlogTagData[],
): Promise<BlogPostData | undefined> {
  const directoryName = sourcePath.split("/").at(-2);
  const match = directoryName?.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
  if (!match) {
    throw new Error(`Invalid blog post source path '${sourcePath}'`);
  }

  const [, directoryDate, slug] = match;
  const processor = await getMdxProcessor();
  const parsed = processor.parse(new SourceFile({ name: sourcePath, text: source }));
  const frontmatter = blogPostFrontmatterSchema.parse(documentFrontmatter(parsed.document)?.data);

  if (directoryDate !== frontmatter.publishedDate) {
    throw new Error(
      `Directory date prefix '${directoryDate}' does not match publishedDate '${frontmatter.publishedDate}' in '${slug}'`,
    );
  }

  if (process.env.NODE_ENV === "production" && frontmatter.demo) {
    return undefined;
  }

  const result = await processor.process(parsed);
  const content = processPostHtml(result.html, sourcePath, slug);
  const toc: BlogPostTableOfContentsItem[] = [];
  for (const { node } of selectHtml(content, "element")) {
    if (
      (node.tagName === "h1" || node.tagName === "h2" || node.tagName === "h3") &&
      typeof node.attributes.id === "string"
    ) {
      const title = htmlText(node).replace(/\s+/g, " ").trim();
      if (title) {
        toc.push({
          id: node.attributes.id,
          title,
          level: node.tagName === "h1" ? 2 : node.tagName === "h2" ? 3 : 4,
        });
      }
    }
  }

  const postTags = frontmatter.tags
    .map((tagSlug) => {
      const normalizedSlug = tagSlug.toLowerCase();
      const tag = tags.find((candidate) => candidate.slug === normalizedSlug);
      if (!tag) {
        throw new Error(`Tag '${normalizedSlug}' not found for post '${slug}'`);
      }
      return tag;
    })
    .sort((a, b) => a.slug.localeCompare(b.slug));

  let cover: BlogPostCoverData | undefined;
  if (typeof frontmatter.cover === "string") {
    cover = { src: resolvePostAssetUrl(sourcePath, frontmatter.cover) };
  } else if (frontmatter.cover) {
    cover = {
      src: resolvePostAssetUrl(sourcePath, frontmatter.cover.file),
      width: frontmatter.cover.width,
      height: frontmatter.cover.height,
    };
  }

  const appUrl = (process.env.TIN_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: frontmatter.title,
    url: `${appUrl}${pathLocator.blog.post.index(slug)}`,
    slug,
    publishedDate: frontmatter.publishedDate,
    modifiedDate: frontmatter.modifiedDate,
    description: frontmatter.description,
    priority: frontmatter.priority,
    toc: frontmatter.toc ? toc : undefined,
    tags: postTags,
    cover,
    content,
    related: [],
    series: frontmatter.series,
  };
}

function processPostHtml(root: HtmlRootNode, sourcePath: string, slug: string): HtmlRootNode {
  return rewriteHtml(root, {
    element: ({ node }) => {
      if (node.tagName !== "img") {
        return;
      }
      const src = node.attributes.src;
      if (typeof src !== "string" || src.length === 0) {
        throw new Error(`Image source not found for post '${slug}'`);
      }
      return {
        ...node,
        attributes: {
          ...node.attributes,
          src: /^https?:\/\//.test(src) ? src : resolvePostAssetUrl(sourcePath, src),
          alt: node.attributes.alt || src,
          loading: "lazy",
          decoding: "async",
        },
      };
    },
  });
}

function resolvePostAssetUrl(sourcePath: string, relativePath: string): string {
  const sourceDirectory = sourcePath.slice(0, sourcePath.lastIndexOf("/") + 1);
  const assetSourcePath = normalizeSourcePath(`${sourceDirectory}${relativePath}`);
  const assetUrl = blogPostAssetUrls[assetSourcePath];
  if (!assetUrl) {
    throw new Error(`Blog post asset '${relativePath}' not found from '${sourcePath}'`);
  }
  return assetUrl;
}

function normalizeSourcePath(sourcePath: string): string {
  const segments: string[] = [];
  for (const segment of sourcePath.split("/")) {
    if (segment === "." || segment === "") {
      continue;
    }
    if (segment === "..") {
      if (segments.length > 0 && segments.at(-1) !== "..") {
        segments.pop();
      } else {
        segments.push(segment);
      }
      continue;
    }
    segments.push(segment);
  }
  return segments.join("/");
}

function sourceFileName(sourcePath: string): string {
  const fileName = sourcePath.split("/").at(-1);
  if (!fileName?.endsWith(".mdx")) {
    throw new Error(`Invalid MDX source path '${sourcePath}'`);
  }
  return fileName.slice(0, -4);
}
