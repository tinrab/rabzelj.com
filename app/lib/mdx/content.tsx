import type { MdxContentComponents } from "@temelj/mdx-react";

import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { getMdxContentComponents } from "~/lib/mdx/components/registry";

const siteComponents: MdxContentComponents = {
	a: ({ href, ref: _, ...restProps }) => {
		if (typeof href !== "string") {
			throw new TypeError("href must be a string");
		}
		return (
			<Typography variant="a" asChild {...restProps}>
				<SiteLink to={href} {...restProps} />
			</Typography>
		);
	},
};

export const mdxPageComponents: MdxContentComponents = {
	...getMdxContentComponents(),
	...siteComponents,
};

export const mdxPageLowerHeadingComponents: MdxContentComponents = {
	...getMdxContentComponents({ lowerHeadings: true }),
	...siteComponents,
};
