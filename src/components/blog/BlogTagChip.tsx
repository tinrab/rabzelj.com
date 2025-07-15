import { Link } from "@tanstack/react-router";
import type { VariantProps } from "class-variance-authority";
import type React from "react";

import { Button, type buttonVariants } from "~/components/ui/button";
import type { BlogTagData } from "~/lib/blog/tag/schema";

interface BlogTagChipProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  tag: BlogTagData;
}

export function BlogTagChip({
  tag,
  variant = "outline",
  ...props
}: BlogTagChipProps) {
  return (
    <Button variant={variant} asChild {...props}>
      <Link to="/blog/tags/$slug" params={{ slug: tag.slug }}>
        {tag.title}
      </Link>
    </Button>
  );
}
