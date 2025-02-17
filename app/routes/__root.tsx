import {
	HeadContent,
	Outlet,
	ScriptOnce,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import mainCss from "~/styles/main.css?url";
import { pathLocator } from "~/lib/path-locator";
import { ThemeProvider } from "~/lib/theme/theme-context";
import { Toaster } from "~/components/ui/toaster";
import { loadClientConfig } from "~/config/client";
import { makeClientConfigScript } from "~/config/utility";
import { publicMiddleware } from "~/lib/middleware";
import { getThemeServerFn } from "~/lib/theme/fn";
import { Theme } from "~/lib/theme/types";

const loadClientConfigServerFn = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.handler(async () => {
		return loadClientConfig();
	});

export const Route = createRootRoute({
	loader: async () => {
		return {
			theme: await getThemeServerFn(),
			config: await loadClientConfigServerFn(),
		};
	},
	head: () => {
		const { app } = loadClientConfig();
		if (!app || !app.url) {
			return {};
		}

		let tagline = app.description.trim();
		if (tagline.endsWith(".")) {
			tagline = tagline.slice(0, -1);
		}

		return {
			meta: [
				{
					charSet: "utf-8",
				},
				{
					name: "viewport",
					content: "width=device-width, initial-scale=1",
				},

				{ title: `${app.title}: ${tagline}` },
				{ name: "description", content: app.description },
				{ base: new URL(app.url) },

				{ name: "robots", content: "index, follow" },
				{
					name: "googlebot",
					content:
						"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
				},

				{ property: "og:title", content: tagline },
				{ property: "og:description", content: app.description },
				{ name: "author", content: app.title },
				{ property: "og:url", content: app.url },
				{ property: "og:site_name", content: app.title },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:type", content: "website" },
				{
					property: "og:image",
					content: `${app.url}${pathLocator.assets.featured}`,
				},
			],
			links: [
				{ rel: "stylesheet", href: mainCss },
				{
					rel: "icon",
					href: "/favicon.ico",
					type: "image/x-icon",
					sizes: "256x256",
				},
				{
					rel: "icon",
					href: "/icon.png",
					sizes: "516x516",
				},
				{
					rel: "apple-touch-icon",
					type: "image/png",
					sizes: "516x516",
					href: "/apple-icon.png",
				},
				{ rel: "manifest", href: "/manifest.json" },
				{ rel: "icon", href: "/favicon.ico" },

				// Importing fonts with postcss and Tailwind v4 doesn't work anymore for whatever reason.
				// This is temporary until I figure out what's going on.
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossOrigin: "",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap",
				},
				// Katex
				// <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib" crossorigin="anonymous">
				{
					rel: "stylesheet",
					href: "https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css",
					integrity:
						"sha384-zh0CIslj+VczCZtlzBcjt5ppRcsAmDnRem7ESsYwWwg3m/OaJ2l4x7YBZl9Kxxib",
					crossOrigin: "anonymous",
				},
			],
		};
	},
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

const queryClient = new QueryClient({
	defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const data = Route.useLoaderData();
	const themeClass = data.theme === Theme.DARK ? "dark" : "";

	return (
		<html
			lang="en"
			data-theme={themeClass}
			className={themeClass}
			suppressHydrationWarning
		>
			<head>
				{data.theme === Theme.SYSTEM ? (
					<ScriptOnce
						// biome-ignore lint/correctness/noChildrenProp: need to inject theme
						children={`window.matchMedia('(prefers-color-scheme: dark)').matches ? document.documentElement.classList.add('dark') : null`}
					/>
				) : undefined}
				<HeadContent />
			</head>
			<ThemeProvider initialTheme={data.theme}>
				<QueryClientProvider client={queryClient}>
					<body>
						{children}
						<Toaster slotProps={{ viewport: { className: "top-auto" } }} />
						<script
							// biome-ignore lint/security/noDangerouslySetInnerHtml: setting window.CONFIG
							dangerouslySetInnerHTML={{
								__html: makeClientConfigScript(data.config),
							}}
						/>
						<Scripts />
					</body>
				</QueryClientProvider>
			</ThemeProvider>
		</html>
	);
}
