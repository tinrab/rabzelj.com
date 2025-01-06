import { FaXTwitter, FaFacebookF, FaLinkedin } from "react-icons/fa6";

import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import type { BlogPostData } from "~/lib/blog/post/schema";

interface BlogShareProps {
	post: BlogPostData;
}

export function BlogShare({ post }: BlogShareProps) {
	return (
		<section className="flex items-center gap-4">
			<Typography variant="body1" className="text-muted-foreground text-sm">
				Share on:{" "}
			</Typography>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://twitter.com/intent/tweet?url=${post.url}&text=${post.title}`}
				aria-label="Share on X, formerly Twitter"
			>
				<span className="sr-only">X, formerly Twitter</span>
				<FaXTwitter className="size-3" aria-hidden="true" />
			</SiteLink>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://www.facebook.com/sharer/sharer.php?u=${post.url}`}
				aria-label="Share on Facebook"
			>
				<span className="sr-only">Facebook</span>
				<FaFacebookF className="size-3" aria-hidden="true" />
			</SiteLink>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://www.linkedin.com/sharing/share-offsite/?url=${post.url}`}
				aria-label="Share on LinkedIn"
			>
				<span className="sr-only">LinkedIn</span>
				<FaLinkedin className="size-3" aria-hidden="true" />
			</SiteLink>
		</section>
	);
}
