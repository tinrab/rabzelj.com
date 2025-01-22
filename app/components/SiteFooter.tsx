import { LayoutFooter } from "~/components/layout/LayoutFooter";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { clientConfig } from "~/config/client";

const socialLinks = [
	{
		title: "Follow me on X/Twitter",
		to: clientConfig.social.twitterUrl,
	},
	{
		title: "Follow me on Bluesky",
		to: clientConfig.social.blueskyUrl,
	},
	{
		title: "Find me on GitHub",
		to: clientConfig.social.githubUrl,
	},
];

export function SiteFooter() {
	return (
		<LayoutFooter>
			<div className="flex flex-col gap-2">
				{socialLinks.map(({ title, to }) => (
					<Typography
						key={title}
						variant="a"
						className="block text-muted-foreground underline"
						asChild
					>
						<SiteLink to={to}>{title}</SiteLink>
					</Typography>
				))}
			</div>
		</LayoutFooter>
	);
}
