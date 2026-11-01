import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { HtmlContent } from "@temelj/mdx-react";
import { z } from "zod";

import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogPostTableOfContents } from "~/components/blog/BlogPostTableOfContents";
import { BlogSeriesSection } from "~/components/blog/BlogSeriesSection";
import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";
import { Typography } from "~/components/Typography";
import { clientConfig } from "~/config/client";
import { loadBlogPost } from "~/lib/blog/post/loader";
import { formatBlogPostDate } from "~/lib/blog/post/utility";
import { loadBlogSeriesWithPosts } from "~/lib/blog/series/loader";
import { blogTagIsNote } from "~/lib/blog/tag/utility";
import { mdxPageRegistry } from "~/lib/mdx/components/registry";
import { pageMiddleware } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";
import { makeSeo, type SeoProperties } from "~/lib/seo";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .validator(
    z.object({
      slug: z.string().min(1),
    }),
  )
  .handler(async ({ data: { slug } }) => {
    const post = await loadBlogPost(slug, {
      includeContent: true,
      includeRelated: true,
    });

    if (!post) {
      throw notFound();
    }

    const series = post.series ? await loadBlogSeriesWithPosts(post.series) : undefined;

    const isOutdated =
      new Date(post.publishedDate).getTime() < Date.now() - 1000 * 60 * 60 * 24 * 180;

    return { post, series, isOutdated };
  });

export const Route = createFileRoute("/blog/_post/_post/$slug")({
  component: RouteComponent,
  loader: ({ params }) => loadRouteData({ data: { slug: params.slug } }),
  head: ({ match, loaderData }) => {
    if (loaderData === undefined) {
      return {};
    }

    const { post } = loaderData;

    const properties: SeoProperties = {
      "article:published_time": post.publishedDate,
    };

    if (post.modifiedDate) {
      properties["article:modified_time"] = post.modifiedDate;
    }

    return {
      meta: makeSeo({
        path: match.pathname,
        title: post.title,
        description: post.description,
        image: `${clientConfig.app.url}${pathLocator.assets.blogPostCover(post.slug)}`,
        properties,
      }),
    };
  },
});

function RouteComponent() {
  const { post, series, isOutdated } = Route.useLoaderData();

  const isNote = post.tags.some(blogTagIsNote);
  const toc = post.toc;
  const related = post.related ?? [];

  return (
    <article>
      <SpineRow className="gap-6 pt-12 pb-10 md:pt-16 xl:gap-0 xl:pt-24 xl:pb-12">
        <SpineBody className="xl:col-start-2 xl:row-start-1">
          <Typography variant="h1">{post.title}</Typography>
          {!isNote ? (
            <Typography variant="lead" className="mt-5 max-w-xl text-pretty">
              {post.description}
            </Typography>
          ) : undefined}
        </SpineBody>

        <SpineMargin className="text-[0.9375rem] xl:col-start-1 xl:row-start-1 xl:pt-[0.55rem]">
          <time dateTime={post.publishedDate}>{formatBlogPostDate(post.publishedDate)}</time>
          <ul className="text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 xl:justify-end">
            {post.tags.map((tag) => (
              <li key={tag.slug}>
                <Link
                  to="/blog/tags/$slug"
                  params={{ slug: tag.slug }}
                  className="hover:text-foreground transition-colors"
                >
                  {tag.title}
                </Link>
              </li>
            ))}
          </ul>
          {isOutdated ? (
            <p className="text-muted-foreground mt-4 text-sm leading-relaxed xl:ml-auto xl:max-w-56">
              Published over six months ago. Some details may be out of date.
            </p>
          ) : undefined}
          {isNote ? <BlogNoteAlert className="mt-4 text-sm xl:ml-auto xl:max-w-56" /> : undefined}
        </SpineMargin>
      </SpineRow>

      <SpineRow className="pb-16 xl:pb-24">
        {series || toc?.length ? (
          <SpineMargin className="mb-10 xl:mb-0">
            <div className="flex flex-col gap-10 xl:sticky xl:top-10">
              {series ? <BlogSeriesSection series={series} currentSlug={post.slug} /> : undefined}
              {toc?.length ? <BlogPostTableOfContents items={toc} /> : undefined}
            </div>
          </SpineMargin>
        ) : undefined}

        <SpineBody wide className="xl:col-start-2">
          {post.cover ? (
            <img
              className="mb-10 w-full"
              alt=""
              src={post.cover.src}
              width={post.cover.width}
              height={post.cover.height}
            />
          ) : undefined}

          {post.content ? (
            <div className="prose-spine">
              <HtmlContent tree={post.content} registry={mdxPageRegistry} />
            </div>
          ) : undefined}
        </SpineBody>
      </SpineRow>

      {related.length >= 2 ? (
        <SpineRow className="border-t py-8 xl:py-12">
          <SpineMargin>
            <h2 className="text-muted-foreground mb-3 pt-[0.2rem] text-[0.9375rem] xl:mb-0">
              Related posts
            </h2>
          </SpineMargin>
          <SpineBody>
            <ul className="flex flex-col gap-3">
              {related.map((relatedPost) => (
                <li key={relatedPost.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: relatedPost.slug }}
                    className="decoration-link text-[1.1875rem] leading-snug text-balance underline-offset-[0.3em] hover:underline"
                  >
                    {relatedPost.title}
                  </Link>
                </li>
              ))}
            </ul>
          </SpineBody>
        </SpineRow>
      ) : undefined}
    </article>
  );
}
