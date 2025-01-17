export const pathLocator = {
	blog: {
		index: "/blog",
		external: "/blog/external",
		post: {
			index: (slug: string) => `/blog/${slug}`,
			asset: (slug: string, assetPath: string) =>
				`/__assets/blog-post/${slug}/${assetPath}`,
		},
		tags: {
			index: "/blog/tags",
			page: (slug: string): string => `/blog/tags/${slug}`,
		},
		rss: "/blog/rss.xml",
	},
	images: {
		index: "/__images",
		file: (filename: string): string => `/__images/${filename}`,
	},
	assets: {
		blogPostCover: (slug: string): string => `/api/blog/post-cover/${slug}`,
	},
};
