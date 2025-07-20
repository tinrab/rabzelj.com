import fs from "node:fs/promises";
import path from "node:path";

import { defineNitroConfig } from "nitropack/config";

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

export default defineNitroConfig({
  routeRules: {
    "/assets/**": {
      headers: {
        "cache-control": "public, max-age=31536000, immutable",
      },
    },
    ...routeRules,
  },
});
