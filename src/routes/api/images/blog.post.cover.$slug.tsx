import { createFileRoute } from "@tanstack/react-router";

import { loadBlogPost } from "~/lib/blog/post/loader";
import { BlogPostCoverSocialImage, SOCIAL_IMAGE_SIZE } from "~/lib/social-image";

import avatarSrc from "../../../../public/icon.png?inline";

export const Route = createFileRoute("/api/images/blog/post/cover/$slug")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const post = await loadBlogPost(params.slug);
        if (!post) {
          return new Response(null, { status: 404 });
        }

        const { renderImage } = await import("~/lib/render-image");
        const image = await renderImage(
          BlogPostCoverSocialImage({
            avatarSrc,
            slug: params.slug,
            title: post.title,
          }),
          SOCIAL_IMAGE_SIZE,
        );

        return new Response(image as BufferSource, {
          status: 200,
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
