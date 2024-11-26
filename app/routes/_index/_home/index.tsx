import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { pathLocator } from "~/lib/path-locator";
import { IconButton } from "~/components/ui/icon-button";

export const Route = createFileRoute("/_index/_home/")({
	component: HomeComponent,
});

function HomeComponent() {
	return (
		// <div className="-mt-14 relative min-h-[calc(50vh_-_theme(spacing.16))] pt-14">
		<div className="flex flex-col items-center px-4 py-6 md:py-24">
			<Avatar className="h-28 w-28">
				<AvatarImage
					src={pathLocator.images.file("icon.png")}
					alt="Tin Rabzelj"
				/>
				<AvatarFallback>TR</AvatarFallback>
			</Avatar>
			<h1 className="my-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Tin Rabzelj
			</h1>
			<h2 className="text-sm text-muted-foreground mb-6">Software Engineer</h2>

			{/* <div className="mb-5 leading-5 text-lg text-center">
				<p>I like Rust and TypeScript.</p>
			</div> */}

			<div className="mb-5 leading-7 text-center">
				<p>
					Check out my blog on <a href="https://flinect.com/blog">Flinect</a>.
				</p>
				<p>
					Find my OSS projects on <a href="https://github.com/tinrab">GitHub</a>
					.
				</p>
				<p>
					My old blog: <a href="https://outcrawl.com/">outcrawl.com</a>.
				</p>
			</div>

			<div className="flex space-x-2">
				<IconButton asChild>
					<a href="https://twitter.com/tinrab">
						<FaXTwitter />
					</a>
				</IconButton>
				<IconButton asChild>
					<a href="https://github.com/tinrab">
						<FaGithub />
					</a>
				</IconButton>
			</div>
		</div>
	);
}
