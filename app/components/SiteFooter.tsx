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
	{
		title: "Find me on LinkedIn",
		to: clientConfig.social.linkedInUrl,
	},
];

export function SiteFooter() {
	return (
		<LayoutFooter>
			<div>
				{socialLinks.map(({ title, to }) => (
					<Typography
						key={title}
						variant="body1"
						className="block underline"
						asChild
					>
						<SiteLink to={to}>{title}</SiteLink>
					</Typography>
				))}
			</div>
		</LayoutFooter>
	);
}
