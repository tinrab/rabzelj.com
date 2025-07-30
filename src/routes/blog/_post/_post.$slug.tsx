import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createMdxContent } from "@temelj/mdx-react";
import { MdReportProblem } from "react-icons/md";
import { z } from "zod";

import { BlogNoteAlert } from "~/components/blog/BlogNoteAlert";
import { BlogTagChip } from "~/components/blog/BlogTagChip";
import { Typography } from "~/components/Typography";
import { Separator } from "~/components/ui/separator";
import { clientConfig } from "~/config/client";
import { loadBlogPost } from "~/lib/blog/post/loader";
import {
  BLOG_TAG_SLUG_NOTES,
  BLOG_TAG_SLUG_PAPER_NOTES,
} from "~/lib/blog/tag/constants";
import { mdxPageLowerHeadingComponents } from "~/lib/mdx/components/registry";
import { pageMiddleware } from "~/lib/middleware";
import { pathLocator } from "~/lib/path-locator";
import { makeSeo } from "~/lib/seo";

const loadRouteData = createServerFn({ method: "GET" })
  .middleware([pageMiddleware])
  .validator(
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

    return { post };
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
  const { post } = Route.useLoaderData();

  const content = post.artifact?.compiled
    ? createMdxContent(
        {
          artifact: post.artifact,
        },
        mdxPageLowerHeadingComponents,
      )
    : undefined;
  const isNote = post.tags.some(
    (tag) =>
      tag.slug === BLOG_TAG_SLUG_NOTES ||
      tag.slug === BLOG_TAG_SLUG_PAPER_NOTES,
  );

  return (
    <article className="mx-auto max-w-3xl break-words px-4 py-8 md:py-12">
      <Typography className="text-balance" variant="h1">
        {post.title}
      </Typography>

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

      {new Date(post.publishedDate).getTime() <
        Date.now() - 1000 * 60 * 60 * 24 * 180 && (
        <Typography className="mb-4 flex items-center gap-2 text-error text-sm">
          <MdReportProblem />
          This blog post is more than 6 months old and may contain outdated
          information.
        </Typography>
      )}

      <div className="flex flex-wrap gap-2">
        <Typography className="mr-auto text-muted-foreground text-sm">
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
        <Typography className="mt-4 text-muted-foreground italic">
          {post.description}
        </Typography>
      ) : undefined}

      <section className="pt-6">{content}</section>

      <Separator className="my-4" />

      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <BlogTagChip key={tag.slug} tag={tag} />
        ))}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Typography className="mr-auto text-muted-foreground text-sm">
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
                  className="text-balance text-lg"
                  asChild
                >
                  <Link
                    to="/blog/$slug"
                    params={{
                      slug: relatedPost.slug,
                    }}
                  >
                    {relatedPost.title}
                  </Link>
                </Typography>
              </li>
            ))}
          </ul>
        </section>
      ) : undefined}
    </article>
  );
}
