import { Link } from "@tanstack/react-router";

import type { BlogSeriesPostData } from "~/lib/blog/series/schema";

import { cn } from "~/lib/utility";

interface BlogSeriesSectionProps {
  series: BlogSeriesPostData;
  currentSlug: string;
  className?: string;
}

export function BlogSeriesSection({ series, currentSlug, className }: BlogSeriesSectionProps) {
  const currentIndex = series.posts.findIndex((post) => post.slug === currentSlug);
  const total = series.completed ? String(series.posts.length) : "an unfinished series";

  return (
    <nav aria-label="Series" className={cn("text-[0.9375rem]", className)}>
      <p className="text-muted-foreground text-sm">
        Part {currentIndex + 1} of {total}
      </p>
      <p className="mt-1 font-medium text-balance">{series.title}</p>

      <ol className="mt-3 flex flex-col gap-2 text-sm">
        {series.posts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;

          return (
            <li key={post.slug} className="flex gap-3 xl:flex-row-reverse">
              <span
                className={cn(
                  "w-4 shrink-0 tabular-nums xl:text-right",
                  isCurrent ? "text-link" : "text-muted-foreground",
                )}
              >
                {index + 1}
              </span>
              {isCurrent ? (
                <span aria-current="page" className="text-foreground">
                  {post.title}
                </span>
              ) : (
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {post.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
