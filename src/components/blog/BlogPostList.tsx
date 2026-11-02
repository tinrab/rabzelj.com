import { Link } from "@tanstack/react-router";

import type { BlogPostData, BlogPostYearGroup } from "~/lib/blog/post/schema";

import { SpineMargin, SpineRow } from "~/components/layout/Spine";
import { formatBlogPostDay, formatBlogPostMonth } from "~/lib/blog/post/utility";
import { cn } from "~/lib/utility";

interface BlogPostListProps {
  posts: BlogPostYearGroup<BlogPostData>[];
}

export function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div>
      {posts.map((yearGroup) => (
        <SpineRow key={yearGroup.year} className="border-t py-8 xl:py-12">
          <SpineMargin>
            <h2
              id={`h-${yearGroup.year}`}
              className="mb-4 text-5xl leading-none font-light tracking-tight tabular-nums xl:sticky xl:top-10 xl:mb-0"
            >
              <a href={`#h-${yearGroup.year}`}>{yearGroup.year}</a>
            </h2>
          </SpineMargin>

          <BlogPostRows posts={yearGroup.posts} />
        </SpineRow>
      ))}
    </div>
  );
}

interface BlogPostRowsProps {
  posts: BlogPostData[];
  withYear?: boolean;
  className?: string;
}

export function BlogPostRows({ posts, withYear, className }: BlogPostRowsProps) {
  return (
    <ul className={cn("xl:col-span-3 xl:grid xl:grid-cols-subgrid", className)}>
      {posts.map((post) => (
        <li key={post.slug} className="py-2 xl:col-span-3 xl:grid xl:grid-cols-subgrid">
          <div className="flex items-baseline gap-4 px-4 md:px-6 xl:col-span-2">
            <span
              className={cn(
                "text-muted-foreground shrink-0 text-sm tabular-nums",
                withYear ? "w-18" : "w-14",
              )}
            >
              {withYear
                ? formatBlogPostMonth(post.publishedDate)
                : formatBlogPostDay(post.publishedDate)}
            </span>
            <Link
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={cn(
                "decoration-link text-base leading-snug text-balance decoration-2 underline-offset-4 hover:underline md:text-lg",
              )}
            >
              {post.title}
            </Link>
          </div>

          <ul
            className={cn(
              "text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 pr-4 text-sm md:pr-6 xl:mt-0 xl:px-6 xl:pt-0.5",
              withYear ? "pl-26 md:pl-28" : "pl-22 md:pl-24",
            )}
          >
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
        </li>
      ))}
    </ul>
  );
}
