import { Link } from "@tanstack/react-router";

import { Button } from "~/components/ui/button";

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 p-8">
      <div className="text-gray-600 text-lg dark:text-gray-400">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Button variant="outline" asChild>
          <Link to="/">Start Over</Link>
        </Button>
      </p>
    </div>
  );
}
