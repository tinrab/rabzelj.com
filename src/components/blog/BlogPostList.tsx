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
              className="mb-4 text-[2.75rem] leading-none font-light tracking-[-0.03em] tabular-nums xl:sticky xl:top-10 xl:mb-0"
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
          <div className="flex gap-4 px-4 md:px-6 xl:col-span-2">
            <span
              className={cn(
                "text-muted-foreground shrink-0 pt-[0.2rem] text-[0.9375rem] tabular-nums",
                withYear ? "w-[4.5rem]" : "w-14",
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
                "decoration-link text-[1.1875rem] leading-snug text-balance underline-offset-[0.3em] hover:underline",
                post.priority === 1 && "font-medium",
              )}
            >
              {post.title}
            </Link>
          </div>

          <ul
            className={cn(
              "text-muted-foreground mt-1 flex flex-wrap gap-x-3 gap-y-1 pr-4 text-sm md:pr-6 xl:mt-0 xl:px-6 xl:pt-[0.3rem]",
              withYear ? "pl-[6.5rem] md:pl-[7rem]" : "pl-[5.5rem] md:pl-[6rem]",
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
