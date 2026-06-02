import type React from "react";

import fontSans from "@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
import satori, { init as initSatori } from "satori";

// Some magic to make WASM work in dev server and CF workers.

const imageRuntimeState = ((
  globalThis as typeof globalThis & {
    __imageRuntime?: {
      satoriInitialized: boolean;
      resvgInitialized: boolean;
    };
  }
).__imageRuntime ??= {
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
): Promise<Uint8Array> {
  await initSatoriYoga();

  const svg = await satori(node, {
    width,
    height,
    fonts: [
      {
        name: "Roboto",
        style: "normal",
        data: fontSans,
      },
    ],
  });

  await initResvg();
  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  try {
    return pngData.asPng();
  } finally {
    pngData.free();
    resvg.free();
  }
}
