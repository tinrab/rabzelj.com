import { staticConfig } from "~/config/static";
import * as v from "valibot";

if (typeof window !== "undefined") {
	throw new Error("This file should only be used on the server.");
}

const serverConfigSchema = v.object({
	app: v.object({
		url: v.pipe(v.string(), v.url()),
		domain: v.string(),
		title: v.string(),
		description: v.string(),
		dataDir: v.string(),
	}),
});

export type ServerConfig = v.InferOutput<typeof serverConfigSchema>;

export function loadServerConfig(): ServerConfig {
	const siteUrl = process.env.TIN_APP_URL?.replace(/\/$/, "");

	return v.parse(serverConfigSchema, {
		app: {
			...staticConfig.app,
			url: siteUrl,
			domain: siteUrl && new URL(siteUrl).hostname,
			dataDir: process.env.TIN_APP_DATA_DIR,
		},
	});
}

export const serverConfig = loadServerConfig();
