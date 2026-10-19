export const blogPostAssetUrls = import.meta.glob<string>(
  "../../../data/blog/posts/**/*.{avif,gif,jpeg,jpg,png,webp}",
  {
    eager: true,
    import: "default",
    query: "?url",
  },
);
