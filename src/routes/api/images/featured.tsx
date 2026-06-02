import { createFileRoute } from "@tanstack/react-router";

import { pathLocator } from "~/lib/path-locator";
import { FeaturedSocialImage, SOCIAL_IMAGE_SIZE } from "~/lib/social-image";

export const Route = createFileRoute("/api/images/featured")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (process.env.NODE_ENV === "production") {
          return new Response(null, {
            status: 302,
            headers: {
              "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
              Location: new URL(pathLocator.assets.generatedFeatured, request.url).toString(),
            },
          });
        }

        const { renderImage } = await import("~/lib/render-image");
        const image = await renderImage(FeaturedSocialImage({}), SOCIAL_IMAGE_SIZE);

        return new Response(image as BufferSource, {
          status: 200,
          headers: {
            "Content-Type": "image/png",
            "Cache-Control": "public, max-age=604800, state-while-revalidate=86400",
          },
        });
      },
    },
  },
});
