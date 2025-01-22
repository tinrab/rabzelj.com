import fontSansUrl from "@fontsource/roboto/latin-400.css?url";
import { Resvg } from "@resvg/resvg-js";
import path from "node:path";
import type React from "react";
import satori from "satori";

import { serverConfig } from "~/config/server";

export async function renderImage(
	node: React.ReactNode,
	{ width, height }: { width: number; height: number },
): Promise<Buffer> {
	const sansFont = await loadFontData();
	if (!sansFont) {
		throw new Error("Failed to load font data");
	}

	const svg = await satori(node, {
		width,
		height,
		fonts: [
			{
				name: "Roboto",
				style: "normal",
				data: sansFont,
			},
		],
	});

	const resvg = new Resvg(svg);
	const pngData = resvg.render();
	return pngData.asPng();
}

async function loadFontData(): Promise<Buffer | undefined> {
	const fontCss = await fetch(`${serverConfig.app.url}${fontSansUrl}`).then(
		(res) => res.text(),
	);

	let woffUrl: string | undefined;
	for (const source of fontCss.matchAll(/url\((.*?)\)/g)) {
		if (source[1].endsWith(".woff")) {
			woffUrl = source[1];
			break;
		}
	}

	if (!woffUrl) {
		return undefined;
	}

	if (woffUrl.startsWith("/api/")) {
		return await fetch(`${serverConfig.app.url}${woffUrl}`)
			.then((res) => res.arrayBuffer())
			.then((buf) => Buffer.from(buf));
	}

	return await fetch(
		`${serverConfig.app.url}${path.join(path.dirname(fontSansUrl), woffUrl)}`,
	)
		.then((res) => res.arrayBuffer())
		.then((buf) => Buffer.from(buf));
}
