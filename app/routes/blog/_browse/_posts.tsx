import { createFileRoute, Outlet } from "@tanstack/react-router";

import { BlogTabList } from "~/components/blog/BlogTabList";
import { Typography } from "~/components/Typography";

export const Route = createFileRoute("/blog/_browse/_posts")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Typography variant="h2" gutter asChild>
				<h1>Blog</h1>
			</Typography>

			<BlogTabList />

			<Outlet />
		</>
	);
}
