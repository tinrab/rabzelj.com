import { defineConfig } from "@tanstack/start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import type { RouterSchema } from "vinxi";
import fs from "node:fs/promises";
import path from "node:path";

const routeRules: Record<string, unknown> = {};
for (const fileName of await fs.readdir("public")) {
	const filePath = path.join("public", fileName);
	const st = await fs.stat(filePath);
	if (st.isDirectory()) {
		routeRules[`/${fileName}/**`] = {
			headers: {
				"cache-control": "public, max-age=86400",
			},
		};
	} else {
		routeRules[`/${fileName}`] = {
			headers: {
				"cache-control": "public, max-age=86400",
			},
		};
	}
}

const config = defineConfig({
	server: {
		routeRules: {
			"/_build/**": {
				headers: {
					"cache-control": "public, max-age=3600, state-while-revalidate=86400",
				},
			},
			...routeRules,
		},
	},
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
		build: {
			sourcemap: false,
		},
		optimizeDeps: {
			include: ["react-icons"],
		},
	},
});

const apiRouter = config.getRouter("api") as RouterSchema & {
	plugins: unknown[];
};

config.addRouter({
	name: "sitemap",
	base: "/sitemap",
	handler: "app/sitemap.handler.ts",
	target: "server",
	type: "http",
	plugins: apiRouter.plugins,
} as RouterSchema);

config.addRouter({
	name: "blog-rss",
	base: "/blog/rss",
	handler: "app/blog-rss.handler.ts",
	target: "server",
	type: "http",
	plugins: apiRouter.plugins,
} as RouterSchema);

export default config;
