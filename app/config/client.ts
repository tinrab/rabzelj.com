import * as z from "zod";

import { staticConfig } from "~/config/static";

const clientConfigSchema = z.object({
	app: z.object({
		url: z.string().url().trim(),
		domain: z.string(),
		title: z.string(),
		description: z.string(),
		social: z.object({
			twitterUrl: z.string().url(),
			twitterId: z.string(),
			githubUrl: z.string().url(),
			githubId: z.string(),
			youtubeUrl: z.string().url(),
			youtubeId: z.string(),
		}),
	}),
});

export type ClientConfig = z.infer<typeof clientConfigSchema>;

export function loadClientConfig(): ClientConfig {
	const siteUrl = import.meta.env.VITE_TIN_APP_URL?.replace(/\/$/, "");

	return clientConfigSchema.parse({
		app: {
			...staticConfig.app,
			url: siteUrl,
			domain: new URL(siteUrl).hostname,
		},
	});
}
