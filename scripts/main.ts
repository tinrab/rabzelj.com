import { defineCommand, runMain } from "citty";

import { loadExternalBlog } from "./load-external-blog";

const main = defineCommand({
  subCommands: {
    "load-external-blog": defineCommand({
      meta: {
        name: "load-external-blog",
        description: "Load external blog posts.",
      },
      async run() {
        await loadExternalBlog();
      },
    }),
  },
});

void runMain(main);
