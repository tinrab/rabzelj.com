import { PhotonImage, SamplingFilter, resize } from "@cf-wasm/photon/node";
import fs from "node:fs/promises";
import path from "node:path";

export interface ImageMetadata {
  width: number;
  height: number;
}

export async function imageMetadata(src: string): Promise<ImageMetadata> {
  return withPhotonImage(src, (image) => ({
    width: image.get_width(),
    height: image.get_height(),
  }));
}

export async function resizeImageToFile(
  src: string,
  targetPath: string,
  width: number,
): Promise<void> {
  await withPhotonImage(src, async (image) => {
    const height = Math.round((image.get_height() * width) / image.get_width());
    const resized = resize(image, width, height, SamplingFilter.Lanczos3);
    try {
      await fs.writeFile(targetPath, encodeImage(resized, path.extname(targetPath)));
    } finally {
      resized.free();
    }
  });
}

async function withPhotonImage<T>(
  src: string,
  callback: (image: PhotonImage) => T | Promise<T>,
): Promise<T> {
  const bytes = src.startsWith("http")
    ? await fetch(src)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch image '${src}' (${response.status})`);
          }
          return response.arrayBuffer();
        })
        .then((buffer) => new Uint8Array(buffer))
    : new Uint8Array(await fs.readFile(src));

  const image = PhotonImage.new_from_byteslice(bytes);
  try {
    return await callback(image);
  } finally {
    image.free();
  }
}

function encodeImage(image: PhotonImage, ext: string): Uint8Array {
  switch (ext.toLowerCase()) {
    case ".jpg":
    case ".jpeg":
      return image.get_bytes_jpeg(80);
    case ".png":
      return image.get_bytes();
    case ".webp":
      return image.get_bytes_webp();
    default:
      throw new Error(`Unsupported image output format '${ext}'`);
  }
}
