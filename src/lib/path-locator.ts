export const pathLocator = {
  blog: {
    index: "/blog",
    post: {
      index: (slug: string) => `/blog/${slug}`,
    },
    tags: {
      page: (slug: string): string => `/blog/tags/${slug}`,
    },
    rss: "/blog/rss.xml",
  },
  assets: {
    avatar: "/icon.png",
    blogPostCover: (slug: string): string => `/api/images/blog/post/cover/${slug}`,
    featured: "/api/images/featured",
  },
};
