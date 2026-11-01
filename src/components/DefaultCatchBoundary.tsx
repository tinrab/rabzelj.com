import type { ErrorComponentProps } from "@tanstack/react-router";

import { StatusPage } from "~/components/NotFound";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  console.error("DefaultCatchBoundary Error:", error);

  return <StatusPage code="Error" message="Something went wrong while loading this page." />;
}
