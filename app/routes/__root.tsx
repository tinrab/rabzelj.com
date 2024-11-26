import {
	Outlet,
	ScrollRestoration,
	createRootRoute,
} from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type React from "react";

import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import mainCss from "~/styles/main.css?url";
import { pathLocator } from "~/lib/path-locator";
import { getThemeServerFn, useRootDocumentTheme } from "~/lib/theme/start";
import { ThemeProvider } from "~/lib/theme/theme-context";
import { Toaster } from "~/components/ui/toaster";
import { loadClientConfig } from "~/config/client";

export const Route = createRootRoute({
	head: () => {
		const clientConfig = loadClientConfig();
		const site = clientConfig.app;
		let tagline = site.description.trim();
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

				{ title: `${site.title}: ${tagline}` },
				{ name: "description", content: site.description },
				{ base: new URL(clientConfig.app.url) },

				{ name: "robots", content: "index, follow" },
				{
					name: "googlebot",
					content:
						"index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1",
				},

				{ property: "og:title", content: tagline },
				{ property: "og:description", content: site.description },
				{ property: "og:url", content: clientConfig.app.url },
				{ property: "og:site_name", content: site.title },
				{ property: "og:locale", content: "en_US" },
				{ property: "og:type", content: "website" },
				{
					property: "og:image",
					content: `${clientConfig.app.url}${pathLocator.images.file("featured.png")}`,
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
	headers: () => ({
		"cache-control": "public, max-age=3600",
	}),
	loader: async () => {
		return {
			theme: await getThemeServerFn(),
		};
	},
	errorComponent: (props) => {
		return (
			// <RootDocument>
			<DefaultCatchBoundary {...props} />
			// </RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
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
	const theme = useRootDocumentTheme(data.theme);

	return (
		<html
			lang="en"
			data-theme={theme}
			className={theme}
			suppressHydrationWarning={true}
		>
			<head>
				<Meta />
			</head>
			<ThemeProvider initialTheme={theme}>
				<QueryClientProvider client={queryClient}>
					<body>
						{children}
						<Toaster slotProps={{ viewport: { className: "top-auto" } }} />
						<ScrollRestoration />
						<Scripts />
					</body>
				</QueryClientProvider>
			</ThemeProvider>
		</html>
	);
}
