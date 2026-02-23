import type React from "react";

import fontSans from "@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer";
import { Resvg, initWasm } from "@resvg/resvg-wasm";
// import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm?url";
import resvgWasm from "@resvg/resvg-wasm/index_bg.wasm?arraybuffer";
import fs from "node:fs/promises";
import path from "node:path";
import satori from "satori";

// let resvgInitialized = false;
// async function initResvg(): Promise<void> {
//   if (!resvgInitialized) {
//     await initWasm(
//       fs.readFile(path.join(process.cwd(), resvgWasm)).then((buffer) => new Uint8Array(buffer)),
//     );
//     resvgInitialized = true;
//   }
// }

let resvgInitialized = false;
async function initResvg(): Promise<void> {
  if (!resvgInitialized) {
    await initWasm(resvgWasm);
    // await resvgWasm();
    resvgInitialized = true;
  }
}

export async function renderImage(
  node: React.ReactNode,
  { width, height }: { width: number; height: number },
): Promise<Uint8Array> {
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
  return pngData.asPng();
}
