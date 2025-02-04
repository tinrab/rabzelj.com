import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "~/routeTree.gen";
import { DefaultCatchBoundary } from "~/components/DefaultCatchBoundary";
import { NotFound } from "~/components/NotFound";
import { LinearLoader } from "~/components/LinearLoader";

export function createRouter() {
	const router = createTanStackRouter({
		routeTree,
		defaultPreload: "intent",
		defaultErrorComponent: DefaultCatchBoundary,
		trailingSlash: "never",
		scrollRestoration: true,
		defaultNotFoundComponent: () => <NotFound />,
		defaultPendingComponent: () => (
			<LinearLoader className="absolute inset-0 w-full" square />
		),
		defaultPendingMinMs: 100,
		defaultPendingMs: 300,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}
