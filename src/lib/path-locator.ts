export const pathLocator = {
  blog: {
    index: "/blog",
    notes: "/blog/notes",
    external: "/blog/external",
    post: {
      index: (slug: string) => `/blog/${slug}`,
      asset: (slug: string, assetPath: string) =>
        `/_assets/blog/post/${slug}/${assetPath}`,
    },
    tags: {
      index: "/blog/tags",
      page: (slug: string): string => `/blog/tags/${slug}`,
    },
    rss: "/blog/rss.xml",
  },
  resources: {
    index: "/resources",
  },
  assets: {
    avatar: "/icon.png",
    blogPostCover: (slug: string): string =>
      `/api/images/blog/post/cover/${slug}`,
    featured: "/api/images/featured",
  },
};
