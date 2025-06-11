import fontSansRaw from "@fontsource/roboto/files/roboto-latin-400-normal.woff?arraybuffer";
import { Resvg } from "@resvg/resvg-js";
import type React from "react";
import satori from "satori";

export async function renderImage(
  node: React.ReactNode,
  { width, height }: { width: number; height: number },
): Promise<Buffer> {
  const svg = await satori(node, {
    width,
    height,
    fonts: [
      {
        name: "Roboto",
        style: "normal",
        // data: sansFont,
        data: fontSansRaw,
      },
    ],
  });

  const resvg = new Resvg(svg);
  const pngData = resvg.render();
  return pngData.asPng();
}
