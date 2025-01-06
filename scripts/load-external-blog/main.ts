import { defineCommand, runMain } from "npm:citty";
import SiteMapper from "npm:sitemapper";
import * as cheerio from "npm:cheerio";
import path from "node:path";

import type {
	BlogPostCommon,
	ExternalBlogData,
} from "../../app/lib/blog/post/schema.ts";

async function loadFlinect(): Promise<BlogPostCommon[]> {
	const posts: BlogPostCommon[] = [];

	// @ts-ignore no types
	const sitemapper = new SiteMapper();
	const sitemap: { sites: string[] } = await sitemapper.fetch(
		"https://www.flinect.com/sitemap.xml",
	);

	for (const url of sitemap.sites.filter((url) => url.includes("/blog/"))) {
		const response = await fetch(url);
		const html = await response.text();
		const $ = cheerio.load(html);

		const title = $(`[property="og:title"]`)
			.attr("content")
			?.replace(" | Flinect", "");
		const publishedDate = $(`[property="article:published_time"]`).attr(
			"content",
		);
		if (!title || !publishedDate) {
			continue;
		}

		posts.push({
			title,
			url: url,
			publishedDate: new Date(publishedDate).toISOString(),
		});
	}

	return posts;
}

async function loadOutcrawl(): Promise<BlogPostCommon[]> {
	const posts: BlogPostCommon[] = [];

	for (const pageUrl of [
		"https://outcrawl.com",
		"https://outcrawl.com/page/2",
		"https://outcrawl.com/page/3",
	]) {
		const response = await fetch(pageUrl);
		const html = await response.text();
		const $ = cheerio.load(html);

		const nextData: {
			props: {
				pageProps: {
					articles: {
						title: string;
						url: string;
						date: string;
					}[];
				};
			};
		} = JSON.parse($("#__NEXT_DATA__").text());

		for (const article of nextData.props.pageProps.articles) {
			posts.push({
				title: article.title,
				url: article.url,
				publishedDate: new Date(article.date).toISOString(),
			});
		}
	}

	return posts;
}

const main = defineCommand({
	run: async (): Promise<void> => {
		await Deno.writeTextFile(
			path.join(import.meta.dirname as string, "../../data/blog/external.json"),
			JSON.stringify(
				{
					flinect: {
						posts: await loadFlinect(),
					},
					outcrawl: {
						posts: await loadOutcrawl(),
					},
				} as ExternalBlogData,
				null,
				2,
			),
		);
	},
});

if (import.meta.main) {
	await runMain(main);
}
