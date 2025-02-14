import * as v from "valibot";

import { staticConfig } from "~/config/static";
import { extractClientConfig } from "~/config/utility";

const clientConfigSchema = v.object({
	app: v.object({
		url: v.pipe(v.string(), v.url()),
		domain: v.string(),
		title: v.string(),
		description: v.string(),
	}),
	social: v.object({
		email: v.pipe(v.string(), v.email()),
		twitterUrl: v.pipe(v.string(), v.url()),
		twitterId: v.string(),
		githubUrl: v.pipe(v.string(), v.url()),
		githubId: v.string(),
		youtubeUrl: v.pipe(v.string(), v.url()),
		youtubeId: v.string(),
		blueskyUrl: v.pipe(v.string(), v.url()),
		blueskyId: v.string(),
	}),
});

export type ClientConfig = v.InferOutput<typeof clientConfigSchema>;

export function loadClientConfig(): ClientConfig {
	const config = extractClientConfig<ClientConfig>();
	if (config) {
		return config;
	}

	if (typeof process === "undefined") {
		return staticConfig as ClientConfig;
	}

	const siteUrl = process.env.TIN_APP_URL?.replace(/\/$/, "") || "";

	return {
		...staticConfig,
		app: {
			...staticConfig.app,
			url: siteUrl,
			domain: new URL(siteUrl).hostname,
		},
	};
}

export const clientConfig = loadClientConfig();
