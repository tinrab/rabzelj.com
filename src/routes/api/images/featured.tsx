import { createFileRoute } from "@tanstack/react-router";

import { FeaturedSocialImage, SOCIAL_IMAGE_SIZE } from "~/lib/social-image";

import avatarSrc from "../../../../public/icon.png?inline";

export const Route = createFileRoute("/api/images/featured")({
  server: {
    handlers: {
      GET: async () => {
        const { renderImage } = await import("~/lib/render-image");
        const image = await renderImage(FeaturedSocialImage({ avatarSrc }), SOCIAL_IMAGE_SIZE);

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
