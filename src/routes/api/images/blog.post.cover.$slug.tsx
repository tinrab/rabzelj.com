import { createServerFileRoute } from "@tanstack/react-start/server";

import { serverConfig } from "~/config/server";
import { loadBlogPost } from "~/lib/blog/post/loader";
import { pathLocator } from "~/lib/path-locator";
import { renderImage } from "~/lib/render-image";

export const ServerRoute = createServerFileRoute(
  "/api/images/blog/post/cover/$slug",
).methods({
  GET: async ({ params }) => {
    const post = await loadBlogPost(params.slug);
    if (!post) {
      return new Response(null, { status: 404 });
    }

    const seed =
      params.slug.split("").reduce((a, b) => {
        const x = (a << 5) - a + b.charCodeAt(0);
        return x & x;
      }, 0) % 360;

    const image = await renderImage(
      <div
        style={{
          fontFamily: "Roboto",
          padding: "4rem",
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "white",
        }}
      >
        {Array.from({ length: 4 }, (_, i) => {
          const size = 1200 + i * 100;
          return (
            <div
              key={size}
              style={{
                position: "absolute",
                backgroundColor: "#525252",
                width: `${size}px`,
                height: `${size * 0.35}px`,
                opacity: 0.2 - i * 0.05,
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) scale(1) rotate(${i * 13 - 7 + seed}deg)`,
              }}
            />
          );
        })}

        {/** biome-ignore lint/a11y/noSvgWithoutTitle: not needed */}
        <svg
          width="1200"
          height="630"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: -2,
            top: -2,
          }}
        >
          <defs>
            <pattern
              id="grid"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <rect width="80" height="80" fill="url(#smallGrid)" />
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="#262626"
                strokeWidth="4"
              />
            </pattern>
          </defs>

          <rect width="1200" height="630" fill="url(#grid)" />
        </svg>

        <h1
          style={{
            textAlign: "center",
            fontSize: "6rem",
            marginTop: "-1rem",
            textWrap: "balance",
            marginBottom: `${Math.max(2, 8 - (post.title.length / 20) * 3)}rem`,
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              marginRight: "0.5rem",
              borderRadius: "9999px",
              border: "2px solid #737373",
            }}
            src={`${serverConfig.app.url}${pathLocator.assets.avatar}`}
            alt={serverConfig.app.title}
            width="60"
            height="60"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
              }}
            >
              {serverConfig.app.title}
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                lineHeight: "1.75rem",
                color: "#737373",
              }}
            >
              Software Engineer
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    );

    return new Response(image as BufferSource, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=604800, state-while-revalidate=86400",
      },
    });
  },
});
