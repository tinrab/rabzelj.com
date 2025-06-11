import { z } from "zod";

import { staticConfig } from "~/config/static";
import { extractClientConfig } from "~/config/utility";

const clientConfigSchema = z.object({
  app: z.object({
    url: z.string().url(),
    domain: z.string(),
    title: z.string(),
    description: z.string(),
  }),
  social: z.object({
    email: z.string().email(),
    twitterUrl: z.string().url(),
    twitterId: z.string(),
    githubUrl: z.string().url(),
    githubId: z.string(),
    youtubeUrl: z.string().url(),
    youtubeId: z.string(),
    blueskyUrl: z.string().url(),
    blueskyId: z.string(),
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
