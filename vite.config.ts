import fs from "node:fs/promises";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import arraybufferPlugin from "vite-plugin-arraybuffer";
import tsConfigPaths from "vite-tsconfig-paths";

const routeRules: Record<string, unknown> = {};
for (const fileName of await fs.readdir("public")) {
  const filePath = path.join("public", fileName);
  const st = await fs.stat(filePath);
  if (st.isDirectory()) {
    routeRules[`/${fileName}/**`] = {
      headers: {
        "cache-control": "public, max-age=86400, s-maxage=86400",
      },
    };
  } else {
    routeRules[`/${fileName}`] = {
      headers: {
        "cache-control": "public, max-age=86400, s-maxage=86400",
      },
    };
  }
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({ sitemap: { enabled: true } }),
    nitroV2Plugin({
      routeRules: {
        "/assets/**": {
          headers: {
            "cache-control": "public, max-age=31536000, immutable",
          },
        },
        ...routeRules,
      },
    }),
    tailwindcss(),
    arraybufferPlugin(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (
          warning.code === "MODULE_LEVEL_DIRECTIVE" ||
          warning.code === "SOURCEMAP_ERROR"
        ) {
          return;
        }
        warn(warning);
      },
    },
  },
});
