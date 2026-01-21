import { createServerOnlyFn } from "@tanstack/react-start";
import { z } from "zod";

import { staticConfig } from "~/config/static";

const serverConfigSchema = z.object({
  app: z.object({
    url: z.url(),
    domain: z.string(),
    title: z.string(),
    description: z.string(),
    dataDir: z.string(),
  }),
});

export type ServerConfig = z.infer<typeof serverConfigSchema>;

const loadServerConfig = createServerOnlyFn((): ServerConfig => {
  const siteUrl = process.env.TIN_APP_URL?.replace(/\/$/, "");

  return serverConfigSchema.parse({
    app: {
      ...staticConfig.app,
      url: siteUrl,
      domain: siteUrl && new URL(siteUrl).hostname,
      dataDir: process.env.TIN_APP_DATA_DIR,
    },
  });
});

export const serverConfig = loadServerConfig();
