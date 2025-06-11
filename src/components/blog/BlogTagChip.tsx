import type { VariantProps } from "class-variance-authority";
import type React from "react";

import { SiteLink } from "~/components/SiteLink";
import { Button, type buttonVariants } from "~/components/ui/button";
import type { BlogTagData } from "~/lib/blog/tag/schema";
import { pathLocator } from "~/lib/path-locator";

interface BlogTagChipProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof buttonVariants> {
  tag: BlogTagData;
}

export function BlogTagChip({
  tag,
  variant = "outline",
  ...restProps
}: BlogTagChipProps) {
  return (
    <Button variant={variant} asChild {...restProps}>
      <SiteLink to={pathLocator.blog.tags.page(tag.slug)}>{tag.title}</SiteLink>
    </Button>
  );
}
