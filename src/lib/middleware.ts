import { createMiddleware } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";

export const pageMiddleware = createMiddleware({ type: "function" }).server(
  (ctx) => {
    setResponseHeader(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400",
    );
    return ctx.next({});
  },
);
