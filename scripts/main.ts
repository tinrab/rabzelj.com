import { defineCommand, runMain } from "citty";

import { loadExternalBlog } from "./load-external-blog";
import { generate } from "./generate";

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
		generate: defineCommand({
			meta: {
				name: "generate",
				description: "Generate assets.",
			},
			async run() {
				await generate();
			},
		}),
	},
});

runMain(main);
