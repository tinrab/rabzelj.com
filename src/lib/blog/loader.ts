import type {
  BlogPostContent,
  BlogPostSource,
  BlogPostData,
  ExternalBlogData,
} from "~/lib/blog/post/schema";
import type { BlogSeriesData, BlogSeriesFrontmatter } from "~/lib/blog/series/schema";
import type { BlogTagData, BlogTagFrontmatter } from "~/lib/blog/tag/schema";

import { pathLocator } from "~/lib/path-locator";

import externalBlogData from "../../../data/blog/external.json";

const postSources = import.meta.glob<BlogPostSource>("../../../data/blog/posts/**/index.mdx", {
  eager: true,
  import: "default",
  query: "?blog-frontmatter",
});

const tagSources = import.meta.glob<BlogTagFrontmatter>("../../../data/blog/tags/*.mdx", {
  eager: true,
  import: "default",
  query: "?blog-frontmatter",
});

const seriesSources = import.meta.glob<BlogSeriesFrontmatter>("../../../data/blog/series/*.mdx", {
  eager: true,
  import: "default",
  query: "?blog-frontmatter",
});

const postContents = import.meta.glob<BlogPostContent>("../../../data/blog/posts/**/index.mdx", {
  import: "default",
  query: "?blog-content",
});

export async function loadBlogPostContent(slug: string): Promise<BlogPostContent> {
  const sourcePath = Object.keys(postContents).find((path) => path.endsWith(`_${slug}/index.mdx`));
  if (!sourcePath) throw new Error(`Blog post source not found: ${slug}`);
  return postContents[sourcePath]();
}

const MAX_RELATED_POSTS = 3;

interface BlogData {
  posts: BlogPostData[];
  tags: BlogTagData[];
  series: BlogSeriesData[];
  external: ExternalBlogData;
}

let blogData: BlogData | undefined;

export function loadBlogData(): Promise<BlogData> {
  blogData ??= createBlogData();
  return Promise.resolve(blogData);
}

function createBlogData(): BlogData {
  const tags = loadSourceBlogTags();
  const series = loadSourceBlogSeries();
  const posts = loadSourceBlogPosts(tags);

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

function loadSourceBlogPosts(tags: BlogTagData[]): BlogPostData[] {
  const posts = Object.entries(postSources).map(([sourcePath, source]) =>
    readBlogPost(sourcePath, source, tags),
  );

  return posts
    .filter((post): post is BlogPostData => post !== undefined)
    .sort((a, b) => {
      const dateComparison =
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
      return dateComparison || a.slug.localeCompare(b.slug);
    });
}

function loadSourceBlogTags(): BlogTagData[] {
  const tags = Object.entries(tagSources).map(([sourcePath, frontmatter]) => ({
    title: frontmatter.title,
    slug: sourceFileName(sourcePath),
    description: frontmatter.description,
  }));

  return tags.sort((a, b) => a.title.localeCompare(b.title));
}

function loadSourceBlogSeries(): BlogSeriesData[] {
  const series = Object.entries(seriesSources).map(([sourcePath, frontmatter]) => ({
    title: frontmatter.title,
    slug: sourceFileName(sourcePath),
    description: frontmatter.description,
    completed: frontmatter.completed,
  }));

  return series.sort((a, b) => a.title.localeCompare(b.title));
}

function readBlogPost(
  sourcePath: string,
  source: BlogPostSource,
  tags: BlogTagData[],
): BlogPostData | undefined {
  const directoryName = sourcePath.split("/").at(-2);
  const match = directoryName?.match(/^(\d{4}-\d{2}-\d{2})_(.+)$/);
  if (!match) {
    throw new Error(`Invalid blog post source path '${sourcePath}'`);
  }

  const [, directoryDate, slug] = match;
  const { frontmatter, cover } = source;

  if (directoryDate !== frontmatter.publishedDate) {
    throw new Error(
      `Directory date prefix '${directoryDate}' does not match publishedDate '${frontmatter.publishedDate}' in '${slug}'`,
    );
  }

  if (process.env.NODE_ENV === "production" && frontmatter.demo) {
    return undefined;
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

  const appUrl = (process.env.TIN_APP_URL ?? "http://localhost:3000").replace(/\/$/, "");
  return {
    title: frontmatter.title,
    url: `${appUrl}${pathLocator.blog.post.index(slug)}`,
    slug,
    publishedDate: frontmatter.publishedDate,
    modifiedDate: frontmatter.modifiedDate,
    description: frontmatter.description,
    priority: frontmatter.priority,
    tags: postTags,
    cover,
    related: [],
    series: frontmatter.series,
  };
}

function sourceFileName(sourcePath: string): string {
  const fileName = sourcePath.split("/").at(-1);
  if (!fileName?.endsWith(".mdx")) {
    throw new Error(`Invalid MDX source path '${sourcePath}'`);
  }
  return fileName.slice(0, -4);
}
