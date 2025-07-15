import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import reactPlugin from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import arraybufferPlugin from "vite-plugin-arraybuffer";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({ target: "vercel", customViteReactPlugin: true }),
    reactPlugin(),
    tailwindcss(),
    arraybufferPlugin(),
  ],
});
