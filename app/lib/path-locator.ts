export const pathLocator = {
	blog: {
		index: "/blog",
		page: (pageNumber = 0): string =>
			pageNumber === 0 ? "/blog" : `/blog/page/${pageNumber}`,
		post: {
			index: (slug: string) => `/blog/${slug}`,
			asset: (slug: string, assetPath: string) =>
				`/__assets/blog-post/${slug}/${assetPath}`,
		},
		categories: {
			index: "/blog/categories",
			page: (slug: string, pageNumber = 0): string =>
				pageNumber === 0
					? `/blog/categories/${slug}`
					: `/blog/categories/${slug}/page/${pageNumber}`,
		},
		tags: {
			index: "/blog/tags",
			page: (slug: string, pageNumber = 0): string =>
				pageNumber === 0
					? `/blog/tags/${slug}`
					: `/blog/tags/${slug}/page/${pageNumber}`,
		},
		authors: {
			index: "/blog/authors",
			author: (slug: string): string => `/blog/authors/${slug}`,
		},
	},
	legal: {
		index: "/legal",
		privacyPolicy: "/legal/privacy",
		restrictedUsePolicy: "/legal/abuse",
	},
	newsletter: {
		confirm: "/newsletter/confirm",
	},
	images: {
		index: "/__images",
		file: (filename: string): string => `/__images/${filename}`,
	},
	assets: {
		blogPostCover: (slug: string): string => `/api/blog/post-cover/${slug}`,
	},
};
