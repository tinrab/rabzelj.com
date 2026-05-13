import { IconAlertTriangle } from "@tabler/icons-react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createMdxContent } from "@temelj/mdx-react";
import { z } from "zod";

import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogPostTableOfContents } from "~/components/blog/BlogPostTableOfContents";
import { BlogSeriesSection } from "~/components/blog/BlogSeriesSection";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { Typography } from "~/components/Typography";
import { Separator } from "~/components/ui/separator";
import { clientConfig } from "~/config/client";
import { loadBlogPost } from "~/lib/blog/post/loader";
import { loadBlogSeriesWithPosts } from "~/lib/blog/series/loader";
import { blogTagIsNote } from "~/lib/blog/tag/utility";
import { mdxPageLowerHeadingComponents } from "~/lib/mdx/components/registry";
import { pageMiddleware } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";
import { makeSeo } from "~/lib/seo";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .inputValidator(
    z.object({
      slug: z.string().min(1),
    }),
  )
  .handler(async ({ data: { slug } }) => {
    const post = await loadBlogPost(slug, {
      includeArtifact: true,
      includeRelated: true,
    });
    if (!post) {
      throw notFound();
    }

    const series = post.series ? await loadBlogSeriesWithPosts(post.series) : undefined;

    return { post, series };
  });

export const Route = createFileRoute("/blog/_post/_post/$slug")({
  component: RouteComponent,
  loader: ({ params }) => loadRouteData({ data: { slug: params.slug } }),
  head: ({ match, loaderData }) => {
    if (loaderData === undefined) {
      return {};
    }
    const { post } = loaderData;

    return {
      meta: makeSeo({
        path: match.pathname,
        title: post.title,
        description: post.description,
        image: `${clientConfig.app.url}${pathLocator.assets.blogPostCover(post.slug)}`,
        properties: {
          "article:published_time": post.publishedDate,
          ...(post.modifiedDate
            ? {
                "article:modified_time": post.modifiedDate,
              }
            : {}),
        },
      }),
    };
  },
});

function RouteComponent() {
  const { post, series } = Route.useLoaderData();

  const content = post.artifact?.compiled
    ? createMdxContent(
        {
          artifact: post.artifact,
        },
        mdxPageLowerHeadingComponents,
      )
    : undefined;
  const isNote = post.tags.some(blogTagIsNote);
  const toc = post.toc;

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 break-words md:py-12">
      <Typography className="text-balance" variant="h1">
        {post.title}
      </Typography>

      {series ? (
        <BlogSeriesSection className="mt-6" series={series} currentSlug={post.slug} />
      ) : undefined}

      {isNote ? <BlogNoteAlert className="mt-4" /> : undefined}

      {post.cover?.srcSet ? (
        <img
          className="mx-auto mt-4 flex flex-col gap-2 text-center"
          alt="cover"
          srcSet={post.cover.srcSet}
          width={post.cover.width}
          height={post.cover.height}
        />
      ) : undefined}

      <Separator className="my-4" />

      {new Date(post.publishedDate).getTime() < Date.now() - 1000 * 60 * 60 * 24 * 180 && (
        <Typography className="text-error mb-4 flex items-center gap-2 text-sm">
          <IconAlertTriangle />
          This blog post is more than 6 months old and may contain outdated information.
        </Typography>
      )}

      <div className="flex flex-wrap gap-2">
        <Typography className="text-muted-foreground mr-auto text-sm">
          {new Date(post.publishedDate).toLocaleDateString()}
        </Typography>
        {/* <BlogShare className="hidden sm:flex" post={post} /> */}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <BlogTagChip key={tag.slug} tag={tag} />
        ))}
      </div>

      {!isNote ? (
        <Typography variant="body" gutter className="text-muted-foreground mt-4 italic">
          {post.description}
        </Typography>
      ) : undefined}

      {toc?.length ? <BlogPostTableOfContents items={toc} /> : undefined}

      <section className="pt-6">{content}</section>

      <Separator className="my-4" />

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <BlogTagChip key={tag.slug} tag={tag} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Typography className="text-muted-foreground mr-auto text-sm">
          {new Date(post.publishedDate).toLocaleDateString()}
        </Typography>
        {/* <BlogShare className="hidden sm:flex" post={post} /> */}
      </div>

      {post.related?.length && post.related?.length >= 2 ? (
        <section className="mt-12">
          <Typography variant="h2" gutterBottom>
            Read more
          </Typography>
          <ul className="my-6 ml-6 list-disc">
            {post.related.map((relatedPost) => (
              <li key={relatedPost.slug}>
                <Typography
                  variant="a"
                  className="text-lg text-balance"
                  render={
                    <Link
                      to="/blog/$slug"
                      params={{
                        slug: relatedPost.slug,
                      }}
                    >
                      {relatedPost.title}
                    </Link>
                  }
                />
              </li>
            ))}
          </ul>
        </section>
      ) : undefined}
    </article>
  );
}
