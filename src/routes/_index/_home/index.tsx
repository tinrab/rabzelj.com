import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useState } from "react";

import { BlogPostRows } from "~/components/blog/BlogPostList";
import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";
import { Typography } from "~/components/Typography";
import { clientConfig } from "~/config/client";
import { loadBlogPosts } from "~/lib/blog/post/loader";
import { pageMiddleware } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";
import { stringCipher } from "~/lib/string";

const RECENT_POST_COUNT = 6;

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .handler(async () => {
    const posts = await loadBlogPosts({ selectNotes: false });

    return { recentPosts: posts.slice(0, RECENT_POST_COUNT) };
  });

export const Route = createFileRoute("/_index/_home/")({
  component: RouteComponent,
  loader: () => loadRouteData(),
});

const socialLinks = [
  { title: "GitHub", href: clientConfig.social.githubUrl },
  { title: "X", href: clientConfig.social.twitterUrl },
  { title: "Bluesky", href: clientConfig.social.blueskyUrl },
  { title: "LinkedIn", href: clientConfig.social.linkedinUrl },
];

function RouteComponent() {
  const { recentPosts } = Route.useLoaderData();
  const [email, setEmail] = useState<string>();

  return (
    <>
      <SpineRow className="gap-8 pt-12 pb-14 md:pt-20 xl:gap-0 xl:pt-28 xl:pb-24">
        <SpineMargin className="flex xl:justify-end">
          <img
            className="size-24 shrink-0 shadow-[6px_6px_0_0_var(--color-foreground)] xl:size-32 xl:shadow-[8px_8px_0_0_var(--color-foreground)]"
            src={`${clientConfig.app.url}${pathLocator.assets.avatar}`}
            alt="Portrait of Tin Rabzelj"
            width={128}
            height={128}
          />
        </SpineMargin>

        <SpineBody wide>
          <h1 className="text-5xl leading-[0.95] font-light tracking-tighter md:text-7xl">
            Tin Rabzelj
          </h1>
          <p className="text-muted-foreground mt-6 max-w-xl text-xl leading-normal text-pretty">
            Software engineer working with Rust, TypeScript and React. Currently focused on AI, CUDA
            and distributed systems.
          </p>
          <ul className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-base">
            {socialLinks.map(({ title, href }) => (
              <li key={title}>
                <Typography
                  variant="a"
                  render={
                    <a href={href} target="_blank" rel="noreferrer">
                      {title}
                    </a>
                  }
                />
              </li>
            ))}
            <li>
              {email ? (
                <Typography variant="a" render={<a href={`mailto:${email}`}>{email}</a>} />
              ) : (
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  onClick={() => setEmail(stringCipher(clientConfig.social.email, -3))}
                >
                  Show email address
                </button>
              )}
            </li>
          </ul>
        </SpineBody>
      </SpineRow>

      <SpineRow className="border-t py-8 xl:py-12">
        <SpineMargin>
          <h2 className="text-muted-foreground mb-3 pt-1 text-sm xl:mb-0">Recent writing</h2>
        </SpineMargin>

        <BlogPostRows posts={recentPosts} withYear />

        <SpineBody className="mt-4 xl:col-start-2">
          <Typography variant="a" className="text-sm" render={<Link to="/blog">All posts</Link>} />
        </SpineBody>
      </SpineRow>
    </>
  );
}
