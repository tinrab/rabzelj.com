import type React from "react";

import { staticConfig } from "~/config/static";
import { formatBlogPostDate } from "~/lib/blog/post/utility";

export const SOCIAL_IMAGE_SIZE = {
  width: 1200,
  height: 630,
};

const color = {
  paper: "#0c0a09",
  ink: "#fbfaf9",
  graphite: "#aba09c",
  rule: "#242322",
  amber: "#f49f1e",
};

const SPINE_X = SOCIAL_IMAGE_SIZE.width / 4;
const HEADER_HEIGHT = 88;
const GUTTER = 40;
const SITE_DOMAIN = "rabzelj.com";

interface SiteIdentityProps {
  avatarSrc: string;
}

function slugSeed(slug: string): number {
  let seed = 0;

  for (const char of slug) {
    seed = (seed * 31 + char.charCodeAt(0)) % 997;
  }

  return seed;
}

interface GlassSlabData {
  width: number;
  height: number;
  centerX: number;
  centerY: number;
  angle: number;
  alpha: number;
}

function SocialImageGlass({ seed }: { seed: number }) {
  const tilt = (seed % 24) - 12;

  const slabs: GlassSlabData[] = [
    { width: 1700, height: 320, centerX: 760, centerY: 380, angle: tilt - 14, alpha: 0.035 },
    { width: 1600, height: 170, centerX: 680, centerY: 290, angle: tilt + 5, alpha: 0.028 },
    { width: 1800, height: 110, centerX: 860, centerY: 500, angle: tilt + 21, alpha: 0.021 },
  ];

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: SOCIAL_IMAGE_SIZE.width,
        height: SOCIAL_IMAGE_SIZE.height,
        display: "flex",
        overflow: "hidden",
      }}
    >
      {slabs.map((slab) => (
        <div
          key={slab.angle}
          style={{
            position: "absolute",
            left: slab.centerX - slab.width / 2,
            top: slab.centerY - slab.height / 2,
            width: slab.width,
            height: slab.height,
            transform: `rotate(${slab.angle}deg)`,
            backgroundImage: `linear-gradient(180deg, rgba(255,255,255,${slab.alpha * 1.8}) 0%, rgba(255,255,255,${slab.alpha * 0.3}) 100%)`,
            borderTop: `2px solid rgba(255,255,255,${slab.alpha * 2.4})`,
          }}
        />
      ))}
    </div>
  );
}

interface SocialImageFrameProps {
  seed: number;
  activeSection?: string;
  margin: React.ReactNode;
  body: React.ReactNode;
}

function SocialImageFrame({ seed, activeSection, margin, body }: SocialImageFrameProps) {
  return (
    <div
      style={{
        fontFamily: "Roboto",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        backgroundColor: color.paper,
        color: color.ink,
      }}
    >
      <SocialImageGlass seed={seed} />

      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: SPINE_X,
          width: 2,
          backgroundColor: color.rule,
        }}
      />

      <div
        style={{
          display: "flex",
          height: HEADER_HEIGHT,
          borderBottom: `2px solid ${color.rule}`,
          fontSize: 26,
        }}
      >
        <div
          style={{
            display: "flex",
            width: SPINE_X,
            paddingRight: GUTTER,
            justifyContent: "flex-end",
            alignItems: "center",
            fontWeight: 500,
            letterSpacing: -0.4,
          }}
        >
          {staticConfig.app.title}
        </div>
        <div style={{ display: "flex", paddingLeft: GUTTER, alignItems: "flex-end" }}>
          <div
            style={{
              display: "flex",
              height: HEADER_HEIGHT,
              alignItems: "center",
              color: activeSection ? color.ink : color.graphite,
              borderBottom: activeSection ? `4px solid ${color.amber}` : "4px solid transparent",
              marginBottom: -2,
            }}
          >
            Blog
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            width: SPINE_X,
            flexShrink: 0,
            padding: `56px ${GUTTER}px 56px 0`,
          }}
        >
          {margin}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: SOCIAL_IMAGE_SIZE.width - SPINE_X,
            flexShrink: 0,
            padding: `56px 64px 56px ${GUTTER}px`,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}

interface SocialImageStackProps {
  align: "flex-start" | "flex-end";
  children: React.ReactNode;
}

function SocialImageStack({ align, children }: SocialImageStackProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align, flexGrow: 1 }}>
      {children}
    </div>
  );
}

interface SocialAvatarProps extends SiteIdentityProps {
  size: number;
  shadow: number;
}

function SocialAvatar({ avatarSrc, size, shadow }: SocialAvatarProps) {
  return (
    <img
      src={avatarSrc}
      alt={staticConfig.app.title}
      width={size}
      height={size}
      style={{ boxShadow: `${shadow}px ${shadow}px 0 0 ${color.ink}` }}
    />
  );
}

function SocialDomain() {
  return <div style={{ display: "flex", fontSize: 24, color: color.graphite }}>{SITE_DOMAIN}</div>;
}

export function FeaturedSocialImage({ avatarSrc }: SiteIdentityProps) {
  return (
    <SocialImageFrame
      seed={slugSeed(SITE_DOMAIN)}
      margin={<SocialAvatar avatarSrc={avatarSrc} size={168} shadow={10} />}
      body={
        <SocialImageStack align="flex-start">
          <div
            style={{
              display: "flex",
              fontSize: 124,
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: -5.5,
              marginTop: -8,
            }}
          >
            {staticConfig.app.title}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              maxWidth: 760,
              fontSize: 34,
              lineHeight: 1.45,
              color: color.graphite,
            }}
          >
            Software engineer working with Rust, TypeScript and React. Currently focused on AI, CUDA
            and distributed systems.
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <SocialDomain />
        </SocialImageStack>
      }
    />
  );
}

function coverTitleFontSize(title: string): number {
  if (title.length <= 36) return 96;

  if (title.length <= 64) return 80;

  if (title.length <= 96) return 66;

  return 56;
}

interface BlogPostCoverSocialImageProps extends SiteIdentityProps {
  slug: string;
  title: string;
  publishedDate: string;
  tags: string[];
}

export function BlogPostCoverSocialImage({
  avatarSrc,
  slug,
  title,
  publishedDate,
  tags,
}: BlogPostCoverSocialImageProps) {
  const titleFontSize = coverTitleFontSize(title);

  return (
    <SocialImageFrame
      seed={slugSeed(slug)}
      activeSection="blog"
      margin={
        <SocialImageStack align="flex-end">
          <div style={{ display: "flex", fontSize: 26, marginTop: 4 }}>
            {formatBlogPostDate(publishedDate)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: 10,
              fontSize: 24,
              lineHeight: 1.4,
              color: color.graphite,
            }}
          >
            {tags.map((tag) => (
              <div key={tag} style={{ display: "flex" }}>
                {tag}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <SocialAvatar avatarSrc={avatarSrc} size={92} shadow={7} />
        </SocialImageStack>
      }
      body={
        <SocialImageStack align="flex-start">
          <div
            style={{
              display: "flex",
              fontSize: titleFontSize,
              fontWeight: 300,
              lineHeight: 1.08,
              letterSpacing: -titleFontSize * 0.03,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", flexGrow: 1 }} />
          <SocialDomain />
        </SocialImageStack>
      }
    />
  );
}
