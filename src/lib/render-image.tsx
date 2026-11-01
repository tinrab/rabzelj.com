import type React from "react";

import fontSansLight from "@fontsource/roboto/files/roboto-latin-300-normal.woff?arraybuffer";
import fontSans from "@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer";
import fontSansMedium from "@fontsource/roboto/files/roboto-latin-500-normal.woff?arraybuffer";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
// satori is pinned to 0.32.0. From 0.33 it bundles HarfBuzz, which compiles WASM from bytes at
// import time; Cloudflare Workers forbid that, so every image request fails in production.
import satori, { init as initSatori } from "satori/standalone";

// Some magic to make WASM work in dev server and CF workers.

declare global {
  var __imageRuntime: { satoriInitialized: boolean; resvgInitialized: boolean } | undefined;
}

const imageRuntimeState = (globalThis.__imageRuntime ??= {
  satoriInitialized: false,
  resvgInitialized: false,
});

async function initSatoriYoga(): Promise<void> {
  if (!imageRuntimeState.satoriInitialized) {
    await initSatori(await loadSatoriYogaWasm());
    imageRuntimeState.satoriInitialized = true;
  }
}

async function initResvg(): Promise<void> {
  if (!imageRuntimeState.resvgInitialized) {
    try {
      await initWasm(await loadResvgWasm());
    } catch (error) {
      if (!(error instanceof Error) || !error.message.includes("Already initialized")) {
        throw error;
      }
    } finally {
      imageRuntimeState.resvgInitialized = true;
    }
  }
}

async function loadSatoriYogaWasm(): Promise<string | WebAssembly.Module> {
  if (import.meta.env.DEV) {
    const mod = await import("satori/yoga.wasm?arraybuffer");

    return mod.default;
  }

  const mod = await import("satori/yoga.wasm");

  return mod.default;
}

async function loadResvgWasm(): Promise<string | WebAssembly.Module> {
  if (import.meta.env.DEV) {
    const mod = await import("@resvg/resvg-wasm/index_bg.wasm?arraybuffer");

    return mod.default;
  }

  const mod = await import("@resvg/resvg-wasm/index_bg.wasm");

  return mod.default;
}

export async function renderImage(
  node: React.ReactNode,
  { width, height }: { width: number; height: number },
): Promise<Uint8Array<ArrayBuffer>> {
  await initSatoriYoga();

  const svg = await satori(node, {
    width,
    height,
    fonts: [
      { name: "Roboto", style: "normal", weight: 300, data: fontSansLight },
      { name: "Roboto", style: "normal", weight: 400, data: fontSans },
      { name: "Roboto", style: "normal", weight: 500, data: fontSansMedium },
    ],
  });

  await initResvg();
  const resvg = new Resvg(svg);
  const pngData = resvg.render();

  try {
    return new Uint8Array(pngData.asPng());
  } finally {
    pngData.free();
    resvg.free();
  }
}
