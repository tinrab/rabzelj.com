import { Link } from "@tanstack/react-router";

import type { BlogSeriesPostData } from "~/lib/blog/series/schema";

import { Typography } from "~/components/Typography";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/lib/utility";

interface BlogSeriesSectionProps {
  series: BlogSeriesPostData;
  currentSlug: string;
  className?: string;
}

export function BlogSeriesSection({ series, currentSlug, className }: BlogSeriesSectionProps) {
  const currentIndex = series.posts.findIndex((post) => post.slug === currentSlug);

  return (
    <section className={cn("py-4", className)}>
      <Card>
        <CardHeader>
          <CardTitle>{series.title}</CardTitle>
          {series.description && <CardDescription>{series.description}</CardDescription>}
        </CardHeader>

        <CardContent>
          <ol className="space-y-2">
            {series.posts.map((post, index) => {
              const isCurrent = post.slug === currentSlug;
              return (
                <li key={`${post.slug}__${index}`} className="flex items-start gap-2">
                  <Badge variant={isCurrent ? "outline" : "ghost"}>{index + 1}</Badge>
                  {isCurrent ? (
                    <Typography className="text-foreground font-medium">{post.title}</Typography>
                  ) : (
                    <Typography
                      variant="a"
                      render={<Link to="/blog/$slug" params={{ slug: post.slug }} />}
                    >
                      {post.title}
                    </Typography>
                  )}
                </li>
              );
            })}
          </ol>
        </CardContent>

        <CardFooter>
          {series.completed ? (
            <Typography variant="muted" className="mt-3 text-xs">
              Part {currentIndex + 1} of {series.posts.length}
            </Typography>
          ) : (
            <Typography variant="muted" className="mt-3 text-xs">
              Part {currentIndex + 1} of <Typography className="font-bold">unknown</Typography>
            </Typography>
          )}
        </CardFooter>
      </Card>
    </section>
  );
}
