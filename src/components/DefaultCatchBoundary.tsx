import type { ErrorComponentProps } from "@tanstack/react-router";

import { SiteLink } from "~/components/SiteLink";
import { Button } from "~/components/ui/button";

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  console.error("DefaultCatchBoundary Error:", error);

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 p-8">
      <div className="text-error text-lg">Something went wrong.</div>
      <p className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Button variant="outline" asChild>
          <SiteLink to="/">Start Over</SiteLink>
        </Button>
      </p>
    </div>
  );
}
