import type React from "react";

import { SiteLink } from "~/components/SiteLink";
import { Button } from "~/components/ui/button";
import type { BlogTagData } from "~/lib/blog/tag/schema";
import { pathLocator } from "~/lib/path-locator";

interface BlogTagChipProps extends React.ComponentProps<typeof Button> {
	tag: BlogTagData;
}

export function BlogTagChip({ tag, ...restProps }: BlogTagChipProps) {
	return (
		<Button variant="outline" asChild {...restProps}>
			<SiteLink to={pathLocator.blog.tags.page(tag.slug)}>{tag.title}</SiteLink>
		</Button>
	);
}
