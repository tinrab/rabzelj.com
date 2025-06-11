import { z } from "zod";

import { staticConfig } from "~/config/static";

if (typeof window !== "undefined") {
  throw new Error("This file should only be used on the server.");
}

const serverConfigSchema = z.object({
  app: z.object({
    url: z.string().url(),
    domain: z.string(),
    title: z.string(),
    description: z.string(),
    dataDir: z.string(),
  }),
});

export type ServerConfig = z.infer<typeof serverConfigSchema>;

export function loadServerConfig(): ServerConfig {
  const siteUrl = process.env.TIN_APP_URL?.replace(/\/$/, "");

  return serverConfigSchema.parse({
    app: {
      ...staticConfig.app,
      url: siteUrl,
      domain: siteUrl && new URL(siteUrl).hostname,
      dataDir: process.env.TIN_APP_DATA_DIR,
    },
  });
}

export const serverConfig = loadServerConfig();
