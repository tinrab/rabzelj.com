import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/_index/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/resources/"!</div>;
}
