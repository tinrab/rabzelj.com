import {
	FaXTwitter,
	FaFacebookF,
	FaLinkedin,
	FaBluesky,
} from "react-icons/fa6";

import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import type { BlogPostData } from "~/lib/blog/post/schema";
import { cn } from "~/lib/utility";

interface BlogShareProps extends React.HTMLAttributes<HTMLDivElement> {
	post: BlogPostData;
}

export function BlogShare({ post, className, ...restProps }: BlogShareProps) {
	return (
		<section
			className={cn("flex items-center gap-4", className)}
			{...restProps}
		>
			<Typography variant="body1" className="text-muted-foreground text-sm">
				Share on:{" "}
			</Typography>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://twitter.com/intent/tweet?url=${encodeURIComponent(post.url)}&text=${encodeURIComponent(post.title)}`}
				aria-label="Share on X, formerly Twitter"
			>
				<span className="sr-only">X, formerly Twitter</span>
				<FaXTwitter className="size-3" aria-hidden="true" />
			</SiteLink>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${post.title}\n\n${post.url}`)}`}
				aria-label="Share on Bluesky"
			>
				<span className="sr-only">Bluesky</span>
				<FaBluesky className="size-3" aria-hidden="true" />
			</SiteLink>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(post.url)}`}
				aria-label="Share on Facebook"
			>
				<span className="sr-only">Facebook</span>
				<FaFacebookF className="size-3" aria-hidden="true" />
			</SiteLink>
			<SiteLink
				className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
				to={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(post.url)}`}
				aria-label="Share on LinkedIn"
			>
				<span className="sr-only">LinkedIn</span>
				<FaLinkedin className="size-3" aria-hidden="true" />
			</SiteLink>
		</section>
	);
}
