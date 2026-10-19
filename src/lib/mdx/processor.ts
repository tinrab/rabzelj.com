import { createHighlighterCore } from "@shikijs/core";
import { Processor } from "@temelj/mdx";
import {
  createShikiHighlighter,
  HeadingIdPlugin,
  SyntaxHighlightPlugin,
} from "@temelj/mdx/plugins";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

async function createMdxProcessor(): Promise<Processor> {
  const shiki = await createHighlighterCore({
    engine: createJavaScriptRegexEngine({ forgiving: true }),
    themes: [
      import("shiki/themes/github-light-default.mjs"),
      import("shiki/themes/github-dark-default.mjs"),
    ],
    langs: [
      import("shiki/langs/asm.mjs"),
      import("shiki/langs/bash.mjs"),
      import("shiki/langs/c.mjs"),
      import("shiki/langs/cpp.mjs"),
      import("shiki/langs/csharp.mjs"),
      import("shiki/langs/dockerfile.mjs"),
      import("shiki/langs/go.mjs"),
      import("shiki/langs/graphql.mjs"),
      import("shiki/langs/html.mjs"),
      import("shiki/langs/javascript.mjs"),
      import("shiki/langs/json.mjs"),
      import("shiki/langs/nginx.mjs"),
      import("shiki/langs/nix.mjs"),
      import("shiki/langs/protobuf.mjs"),
      import("shiki/langs/python.mjs"),
      import("shiki/langs/rust.mjs"),
      import("shiki/langs/scss.mjs"),
      import("shiki/langs/sql.mjs"),
      import("shiki/langs/toml.mjs"),
      import("shiki/langs/tsx.mjs"),
      import("shiki/langs/typescript.mjs"),
      import("shiki/langs/yaml.mjs"),
    ],
  });

  return new Processor({
    syntax: { frontmatter: "yaml", math: "dollar" },
    htmlPlugins: [
      new HeadingIdPlugin({ prefix: "h-" }),
      new SyntaxHighlightPlugin({
        mode: "strict",
        highlighter: createShikiHighlighter(shiki, {
          themes: { light: "github-light-default", dark: "github-dark-default" },
          includeDataAttributes: ["language"],
          fallbackLanguage: "text",
        }),
      }),
    ],
  });
}

let processorPromise: Promise<Processor> | undefined;

export function getMdxProcessor(): Promise<Processor> {
  processorPromise ??= createMdxProcessor();
  return processorPromise;
}
