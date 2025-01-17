import { defineEventHandler } from "vinxi/http";
import RSS from "rss";

import { loadServerConfig } from "~/config/server";
import { pathLocator } from "~/lib/path-locator";
import { loadBlogPosts } from "~/lib/blog/post/loader";

export default defineEventHandler(async (event) => {
	if (event.path !== ".xml") {
		return new Response(null, { status: 302, headers: { Location: "/" } });
	}

	const config = loadServerConfig();
	const now = new Date();

	const feed = new RSS({
		title: config.app.title,
		description: config.app.description,
		site_url: config.app.url,
		feed_url: `${config.app.url}${pathLocator.blog.rss}`,
		image_url: `${config.app.url}${pathLocator.images.file("featured.png")}`,
		pubDate: now,
		// 1 hour
		ttl: 60,
	});

	for (const post of await loadBlogPosts()) {
		feed.item({
			title: post.title,
			description: post.description,
			url: `${config.app.url}${pathLocator.blog.post.index(post.slug)}`,
			date: post.publishedDate,
			categories: post.tags.map((tag) => tag.slug),
		});
	}

	return new Response(feed.xml({ indent: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
			"Cache-Control": "public, max-age=3600, stale-while-revalidate=3600",
		},
	});
});
