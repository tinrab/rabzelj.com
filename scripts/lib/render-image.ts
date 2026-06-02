import type React from "react";

import { Resvg, initWasm } from "@resvg/resvg-wasm";
import { Buffer } from "node:buffer";
import fs from "node:fs/promises";
import path from "node:path";
import satori, { init as initSatori } from "satori";

const ROOT_DIR = path.join(import.meta.dirname, "../..");
const FONT_SANS_PATH = path.join(
  ROOT_DIR,
  "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff",
);
const RESVG_WASM_PATH = path.join(ROOT_DIR, "node_modules/@resvg/resvg-wasm/index_bg.wasm");
const SATORI_YOGA_WASM_PATH = path.join(ROOT_DIR, "node_modules/satori/yoga.wasm");

let satoriInitialized = false;
let resvgInitialized = false;
let fontSans: Buffer | undefined;

export async function renderImage(
  node: React.ReactNode,
  { width, height }: { width: number; height: number },
): Promise<Uint8Array> {
  await initSatoriYoga();
  await initResvg();

  const svg = await satori(node, {
    width,
    height,
    fonts: [
      {
        name: "Roboto",
        style: "normal",
        data: await loadFontSans(),
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  try {
    return pngData.asPng();
  } finally {
    pngData.free();
    resvg.free();
  }
}

async function initSatoriYoga(): Promise<void> {
  if (!satoriInitialized) {
    await initSatori(await fs.readFile(SATORI_YOGA_WASM_PATH));
    satoriInitialized = true;
  }
}

async function initResvg(): Promise<void> {
  if (!resvgInitialized) {
    await initWasm(await fs.readFile(RESVG_WASM_PATH));
    resvgInitialized = true;
  }
}

async function loadFontSans(): Promise<Buffer> {
  fontSans ??= await fs.readFile(FONT_SANS_PATH);
  return fontSans;
}
