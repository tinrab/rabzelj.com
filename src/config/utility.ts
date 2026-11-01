import type { z } from "zod";

export function makeClientConfigScript<T>(config: T): string {
  return `window.CONFIG = ${JSON.stringify(config)}`;
}

export function extractClientConfig<T>(schema: z.ZodType<T>): T | undefined {
  if (typeof window !== "undefined" && "CONFIG" in window) {
    return schema.safeParse(window.CONFIG).data;
  }

  return undefined;
}
