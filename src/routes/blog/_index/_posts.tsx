import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog/_index/_posts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
