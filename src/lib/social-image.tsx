import { serverConfig } from "~/config/server";
import { pathLocator } from "~/lib/path-locator";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

interface SiteIdentityProps {
  avatarSrc?: string;
}

export function FeaturedSocialImage({ avatarSrc }: SiteIdentityProps) {
  const slashCount = 6;
  const { width, height } = SOCIAL_IMAGE_SIZE;

  return (
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
        backgroundColor: "rgb(10,10,10)",
        color: "white",
      }}
    >
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: not needed */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
        width={width}
        height={height}
      >
        <pattern
          id="pattern-checkers"
          x="0"
          y="0"
          width={60}
          height={60}
          patternUnits="userSpaceOnUse"
        >
          <rect fill="rgba(26,26,26,0.2)" x="0" y="0" width="30" height="30" />
          <rect fill="rgba(26,26,26,0.5)" x="30" y="30" width="30" height="30" />
        </pattern>
        <rect x="0" y="0" width={width} height={height} fill="url(#pattern-checkers)" />
      </svg>

      {Array.from({ length: slashCount }, (_, i) => {
        const size = 2000;
        return (
          <div
            key={String(i)}
            style={{
              position: "absolute",
              width: `${size}px`,
              height: `${size * 0.2}px`,
              backgroundColor: `rgba(26,26,26,${(0.1 * slashCount) / (i + 1)})`,
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%) scale(1) rotate(${i * 13 - 7}deg)`,
              border: "8px solid rgba(82,82,82,0.04)",
            }}
          />
        );
      })}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-2.5rem",
        }}
      >
        <img
          style={{
            marginRight: "2rem",
            borderRadius: "9999px",
            border: "2px solid #737373",
          }}
          src={avatarSrc ?? `${serverConfig.app.url}${pathLocator.assets.avatar}`}
          alt={serverConfig.app.title}
          width={210}
          height={210}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "3.75rem",
              lineHeight: "1.75rem",
              marginBottom: "2.5rem",
            }}
          >
            {serverConfig.app.title}
          </div>
          <div
            style={{
              fontSize: "3.75rem",
              lineHeight: "1.75rem",
              color: "#737373",
            }}
          >
            Software Engineer
          </div>
        </div>
      </div>
    </div>
  );
}

interface BlogPostCoverSocialImageProps extends SiteIdentityProps {
  slug: string;
  title: string;
}

export function BlogPostCoverSocialImage({
  avatarSrc,
  slug,
  title,
}: BlogPostCoverSocialImageProps) {
  const seed =
    slug.split("").reduce((a, b) => {
      const x = (a << 5) - a + b.charCodeAt(0);
      return x & x;
    }, 0) % 360;

  return (
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
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#smallGrid)" />
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#262626" strokeWidth="4" />
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
          marginBottom: `${Math.max(2, 8 - (title.length / 20) * 3)}rem`,
        }}
      >
        {title}
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
          src={avatarSrc ?? `${serverConfig.app.url}${pathLocator.assets.avatar}`}
          alt={serverConfig.app.title}
          width={60}
          height={60}
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
    </div>
  );
}
