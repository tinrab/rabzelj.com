import type { HtmlElementNode, HtmlRootNode } from "@temelj/mdx";
import type { Plugin } from "vite";

import {
  documentFrontmatter,
  htmlText,
  parse,
  rewriteHtml,
  selectHtml,
  SourceFile,
} from "@temelj/mdx";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { normalizePath } from "vite";
import { z } from "zod";

import type { BlogPostContent, BlogPostSource, BlogPostTableOfContentsItem } from "./post/schema";

import { getMdxProcessor } from "../mdx/processor";
import { blogPostFrontmatterSchema } from "./post/schema";
import { blogSeriesFrontmatterSchema } from "./series/schema";
import { blogTagFrontmatterSchema } from "./tag/schema";

const htmlStringAttributeSchema = z.string().min(1);

function htmlStringAttribute(node: HtmlElementNode, name: string): string | undefined {
  return htmlStringAttributeSchema.safeParse(node.attributes[name]).data;
}

// Process authored MDX in Vite, never inside a Cloudflare request.
export function blogMdx(): Plugin {
  return {
    name: "blog-mdx",
    enforce: "pre",
    async load(id) {
      const [file, query] = id.split("?", 2);

      if (!file.endsWith(".mdx") || !query) return;
      const params = new URLSearchParams(query);

      if (!params.has("blog-frontmatter") && !params.has("blog-content")) return;

      this.addWatchFile(file);

      const parsed = parse(new SourceFile({ name: file, text: await readFile(file, "utf8") }), {
        syntax: { frontmatter: "yaml", math: "dollar" },
      });

      const data = documentFrontmatter(parsed.document)?.data;

      if (file.includes("/blog/tags/")) {
        return `export default ${JSON.stringify(blogTagFrontmatterSchema.parse(data))};`;
      }

      if (file.includes("/blog/series/")) {
        return `export default ${JSON.stringify(blogSeriesFrontmatterSchema.parse(data))};`;
      }

      const frontmatter = blogPostFrontmatterSchema.parse(data);
      const imports: string[] = [];
      const patches: string[] = [];
      const assets = new Map<string, string>();

      const importAsset = (relativePath: string): string => {
        const assetPath = normalizePath(path.resolve(path.dirname(file), relativePath));
        let name = assets.get(assetPath);

        if (!name) {
          name = `blogAsset${assets.size}`;
          assets.set(assetPath, name);
          this.addWatchFile(assetPath);
          imports.push(`import ${name} from ${JSON.stringify(`${assetPath}?url`)};`);
        }

        return name;
      };

      let output: BlogPostSource | BlogPostContent;

      if (params.has("blog-frontmatter")) {
        const cover = frontmatter.cover;
        output = {
          frontmatter,
          cover: cover ? { src: "", width: cover.width, height: cover.height } : undefined,
        };

        if (cover) {
          patches.push(`data.cover.src = ${importAsset(cover.file)};`);
        }
      } else {
        const processor = await getMdxProcessor();
        const result = await processor.process(parsed);
        const content = prepareImages(result.html);
        const toc: BlogPostTableOfContentsItem[] = [];

        for (const { node, path: nodePath } of selectHtml(content, "element")) {
          const src = node.tagName === "img" ? htmlStringAttribute(node, "src") : undefined;

          if (src && !/^https?:\/\//.test(src)) {
            const access = nodePath.map((index) => `.children[${index}]`).join("");
            patches.push(`data.content${access}.attributes.src = ${importAsset(src)};`);
          }

          const id =
            node.tagName === "h1" || node.tagName === "h2" || node.tagName === "h3"
              ? htmlStringAttribute(node, "id")
              : undefined;

          if (id) {
            const title = htmlText(node).replace(/\s+/g, " ").trim();

            if (title)
              toc.push({
                id,
                title,
                level: node.tagName === "h1" ? 2 : node.tagName === "h2" ? 3 : 4,
              });
          }
        }

        output = { content, toc: frontmatter.toc ? toc : undefined };
      }

      return `${imports.join("\n")}\nconst data = ${JSON.stringify(output)};\n${patches.join("\n")}\nexport default data;`;
    },
  };
}

function prepareImages(root: HtmlRootNode): HtmlRootNode {
  return rewriteHtml(root, {
    element: ({ node }) => {
      if (node.tagName !== "img") return;
      const src = htmlStringAttribute(node, "src");

      if (!src) throw new Error("Blog image source is missing");

      return {
        ...node,
        attributes: {
          ...node.attributes,
          alt: node.attributes.alt || src,
          loading: "lazy",
          decoding: "async",
        },
      };
    },
  });
}
