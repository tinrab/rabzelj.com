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
			cache: {
				maxAge: 3600,
			},
			headers: {
				"cache-control": "public, max-age=3600",
			},
		};
	} else {
		routeRules[`/${fileName}`] = {
			cache: {
				maxAge: 3600,
			},
			headers: {
				"cache-control": "public, max-age=3600",
			},
		};
	}
}

const config = defineConfig({
	server: {
		routeRules: {
			"/_build/**": {
				cache: {
					maxAge: 3600,
				},
				headers: {
					"cache-control": "public, max-age=3600",
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

const apiRouter = config.getRouter("api");

config.addRouter({
	plugins: apiRouter.plugins,
	name: "robots",
	type: "http",
	base: "/robots.txt",
	handler: "app/robots.ts",
} as RouterSchema);

config.addRouter({
	plugins: apiRouter.plugins,
	name: "sitemap",
	type: "http",
	base: "/sitemap.xml",
	handler: "app/sitemap.ts",
} as RouterSchema);

export default config;
