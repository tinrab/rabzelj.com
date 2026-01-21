import { z } from "zod";

import { staticConfig } from "~/config/static";
import { extractClientConfig } from "~/config/utility";

const clientConfigSchema = z.object({
  app: z.object({
    url: z.url(),
    domain: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  social: z.object({
    email: z.email(),
    twitterUrl: z.url(),
    twitterId: z.string(),
    githubUrl: z.url(),
    githubId: z.string(),
    youtubeUrl: z.url(),
    youtubeId: z.string(),
    blueskyUrl: z.url(),
    blueskyId: z.string(),
    linkedinUrl: z.url(),
  }),
});

export type ClientConfig = z.infer<typeof clientConfigSchema>;

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
