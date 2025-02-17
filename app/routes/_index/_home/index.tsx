import { createFileRoute } from "@tanstack/react-router";
import { FaBluesky, FaGithub, FaXTwitter } from "react-icons/fa6";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { pathLocator } from "~/lib/path-locator";
import { clientConfig } from "~/config/client";
import { SiteLink } from "~/components/SiteLink";
import { Typography } from "~/components/Typography";
import { Button } from "~/components/ui/button";
import { stringCipher } from "~/lib/string";

export const Route = createFileRoute("/_index/_home/")({
	component: RouteComponent,
});

const socialLinks = [
	{
		title: "X / Twitter",
		props: {
			to: clientConfig.social.twitterUrl,
			"aria-label": "X, formerly Twitter",
		},
		Icon: FaXTwitter,
	},
	{
		title: "Bluesky",
		props: {
			to: clientConfig.social.blueskyUrl,
			"aria-label": "Bluesky",
		},
		Icon: FaBluesky,
	},
	{
		title: "GitHub",
		props: { to: clientConfig.social.githubUrl, "aria-label": "GitHub" },
		Icon: FaGithub,
	},
];

function RouteComponent() {
	const [email, setEmail] = useState<string>();

	return (
		<div className="mx-auto flex max-w-3xl flex-col items-center break-words px-4 pt-6 pb-8 md:pt-12">
			<Avatar className="mb-3 h-28 w-28">
				<AvatarImage src={pathLocator.assets.avatar} alt="Tin Rabzelj" />
				<AvatarFallback>TR</AvatarFallback>
			</Avatar>
			<Typography variant="h1" asVariant className="mb-3 text-4xl md:text-5xl">
				Tin Rabzelj
			</Typography>
			<h2 className="mb-6 text-muted-foreground">Software Engineer</h2>

			<div className="mb-5 text-center">
				<Typography asVariant>
					Personal blog:{" "}
					<Typography variant="a" asChild>
						<SiteLink to="/blog">/blog</SiteLink>
					</Typography>
					.
				</Typography>
				<Typography asVariant>
					Check out my blog on{" "}
					<Typography variant="a" asChild>
						<SiteLink to="https://flinect.com/blog">Flinect</SiteLink>
					</Typography>
					.
				</Typography>
				<Typography asVariant>
					Find my OSS projects on{" "}
					<Typography variant="a" asChild>
						<SiteLink to="https://github.com/tinrab">GitHub</SiteLink>
					</Typography>
					.
				</Typography>
				<Typography asVariant>
					My old blog:{" "}
					<Typography variant="a" asChild>
						<SiteLink to="https://outcrawl.com/">outcrawl.com</SiteLink>
					</Typography>
					.
				</Typography>
			</div>

			<blockquote className="mb-8 max-w-md border-l-2 pl-6 text-lg italic">
				Working with Rust, TypeScript, React.js. Focusing on distributed
				systems, microservices, AI, CUDA, graphics programming, osdev, and
				no-code.
			</blockquote>

			<div className="mb-5 flex space-x-6">
				{socialLinks.map(({ title, props, Icon }) => (
					<SiteLink
						key={title}
						{...props}
						className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
					>
						<span className="sr-only">{title}</span>
						<Icon className="size-8" aria-hidden="true" />
					</SiteLink>
				))}
			</div>

			<Button
				variant="secondary"
				asChild
				onClick={() => {
					if (!email) {
						setEmail(stringCipher(clientConfig.social.email, -3));
					}
				}}
			>
				{email?.length ? (
					<SiteLink to={`mailto:${email}`}>Contact Email</SiteLink>
				) : (
					<span className="cursor-pointer">View Email</span>
				)}
			</Button>
		</div>
	);
}
