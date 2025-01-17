import {
	Outlet,
	ScrollRestoration,
	createRootRoute,
} from "@tanstack/react-router";
import { createServerFn, Meta, Scripts } from "@tanstack/start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import mainCss from "~/styles/main.css?url";
import { pathLocator } from "~/lib/path-locator";
import { ThemeProvider } from "~/lib/theme/theme-context";
import { Toaster } from "~/components/ui/toaster";
import { loadClientConfig } from "~/config/client";
import { makeClientConfigScript } from "~/config/utility";
import { publicMiddleware } from "~/lib/middleware";
import { useRootDocumentTheme } from "~/lib/theme/use-root-document-theme";
import { getThemeServerFn } from "~/lib/theme/fn";
import { THEME_LOCAL_STORAGE_KEY } from "~/lib/theme/constants";

const loadClientConfigServerFn = createServerFn({ method: "GET" })
	.middleware([publicMiddleware])
	.handler(async () => {
		return loadClientConfig();
	});

export const Route = createRootRoute({
	beforeLoad: async () => {
		let theme = useRootDocumentTheme();
		if (theme === undefined && typeof window !== "undefined") {
			theme = await getThemeServerFn();
		}

		return {
			theme,
			config: await loadClientConfigServerFn(),
		};
	},
	head: () => {
		const { app } = loadClientConfig();
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
				{ property: "og:url", content: app.url },
				{ property: "og:site_name", content: app.title },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:type", content: "website" },
				{
					property: "og:image",
					content: `${app.url}${pathLocator.images.file("featured.png")}`,
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
	const data = Route.useRouteContext();
	const theme = useRootDocumentTheme(data.theme);

	return (
		<html
			lang="en"
			data-theme={theme}
			className={theme}
			suppressHydrationWarning
		>
			<head>
				<Meta />
			</head>
			<ThemeProvider storageKey={THEME_LOCAL_STORAGE_KEY} initialTheme={theme}>
				<QueryClientProvider client={queryClient}>
					<body>
						{children}
						<Toaster slotProps={{ viewport: { className: "top-auto" } }} />
						<ScrollRestoration />
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
