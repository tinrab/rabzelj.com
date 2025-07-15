import { createMiddleware } from "@tanstack/react-start";
import { setHeader } from "@tanstack/react-start/server";

export const pageMiddleware = createMiddleware({ type: "function" }).server(
  (ctx) => {
    setHeader(
      "cache-control",
      "public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600",
    );
    return ctx.next({});
  },
);
