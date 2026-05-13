import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

import { BlogPostData } from "~/lib/blog/post/schema";

import { BLOG_POST_IMAGE_SIZES, BlogData, loadBlogData } from "./lib/blog";

const ROOT_DIR = path.join(import.meta.dirname, "..");
const BLOG_POST_PUBLIC_DIR = path.join(ROOT_DIR, "public/_assets/blog/post");
const GENERATED_BLOG_DATA_FILE = path.join(ROOT_DIR, "src/-generated/blog.ts");

const ASSET_REGEX = /\.(png|jpg|gif|webp|avif)$/;
const IMAGE_REGEX = /\.(png|jpg|webp|avif)$/;

export async function generate(): Promise<void> {
  const blogData = await loadBlogData();
  await generateBlogData(blogData);
  await generateBlogPostAssets(blogData.posts);
}

async function generateBlogData(blogData: BlogData): Promise<void> {
  console.log("Generating blog data module...");

  const runtimeBlogData = {
    ...blogData,
    posts: blogData.posts.map((post) => ({
      ...post,
      assetPath: "",
    })),
  };

  const source = `import type { BlogPostData, ExternalBlogData } from "~/lib/blog/post/schema";
    import type { BlogSeriesData } from "~/lib/blog/series/schema";
    import type { BlogTagData } from "~/lib/blog/tag/schema";

    export interface BlogData {
      posts: BlogPostData[];
      tags: BlogTagData[];
      series: BlogSeriesData[];
      external: ExternalBlogData;
    }

    export const blogData = ${JSON.stringify(runtimeBlogData, null, 2)} as BlogData;
  `;

  await fs.mkdir(path.dirname(GENERATED_BLOG_DATA_FILE), { recursive: true });
  await fs.writeFile(GENERATED_BLOG_DATA_FILE, source);
}

async function generateBlogPostAssets(posts: BlogPostData[]): Promise<void> {
  console.log("Generating blog post assets...");

  for (const post of posts) {
    let hasAssets = false;
    for (const assetFile of await fs.readdir(post.assetPath)) {
      if (assetFile.match(ASSET_REGEX)) {
        hasAssets = true;
        break;
      }
    }

    if (hasAssets) {
      const targetDir = path.join(BLOG_POST_PUBLIC_DIR, post.slug);
      await fs.mkdir(targetDir, { recursive: true });
      for (const assetFile of await fs.readdir(post.assetPath)) {
        if (!assetFile.match(ASSET_REGEX)) {
          continue;
        }

        const filePath = path.join(targetDir, assetFile);
        const parsedFilePath = path.parse(filePath);

        await fs.copyFile(path.join(post.assetPath, assetFile), filePath);

        if (parsedFilePath.ext.match(IMAGE_REGEX)) {
          const s = sharp(filePath);
          const md = await s.metadata();
          console.log(`Generating image sizes for '${filePath}'...`);

          for (const { width, suffix } of BLOG_POST_IMAGE_SIZES) {
            if (md.width && md.width <= width) {
              continue;
            }

            const resizePath = path.join(
              targetDir,
              `${parsedFilePath.name}--${suffix}${parsedFilePath.ext}`,
            );
            await s.resize(width).toFile(resizePath);

            console.log(`Generated image size '${resizePath}' (${width}px)`);
          }
        }
      }
    }
  }
}
