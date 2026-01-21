import {
  IconBrandBluesky,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";

import { Typography } from "~/components/Typography";
import type { BlogPostData } from "~/lib/blog/post/schema";
import { cn } from "~/lib/utility";

interface BlogShareProps extends React.ComponentProps<"div"> {
  post: BlogPostData;
}

export function BlogShare({ post, className, ...props }: BlogShareProps) {
  return (
    <section className={cn("flex items-center gap-4", className)} {...props}>
      <Typography className="text-muted-foreground text-sm">
        Share on:{" "}
      </Typography>
      <a
        className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.url)}&text=${encodeURIComponent(post.title)}`}
        aria-label="Share on X, formerly Twitter"
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">X, formerly Twitter</span>
        <IconBrandX className="size-3" aria-hidden="true" />
      </a>
      <a
        className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
        href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${post.title}\n\n${post.url}`)}`}
        aria-label="Share on Bluesky"
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">Bluesky</span>
        <IconBrandBluesky className="size-3" aria-hidden="true" />
      </a>
      <a
        className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.url)}`}
        aria-label="Share on Facebook"
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">Facebook</span>
        <IconBrandFacebook className="size-3" aria-hidden="true" />
      </a>
      <a
        className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.url)}`}
        aria-label="Share on LinkedIn"
        target="_blank"
        rel="noreferrer"
      >
        <span className="sr-only">LinkedIn</span>
        <IconBrandLinkedin className="size-3" aria-hidden="true" />
      </a>
    </section>
  );
}
