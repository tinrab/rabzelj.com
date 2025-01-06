import { createMiddleware } from "@tanstack/start";
import { setHeader } from "vinxi/http";
import type { z } from "zod";

export function validateZod<T extends z.ZodSchema>(
	schema: T,
): (input: unknown) => z.infer<T> {
	return (input: unknown) => schema.parse(input);
}

// From @tanstack/start
export type ServerResultWithContext<TContext, TClientAfterContext> = {
	"use functions must return the result of next()": true;
	context: TContext;
	clientAfterContext: TClientAfterContext;

	sendContext?: unknown;
};

export function makeServerReply<
	TClientAfterContext = undefined,
	TContext = undefined,
>(
	clientAfterContext: TClientAfterContext,
	context?: TContext,
): ServerResultWithContext<TContext, TClientAfterContext> {
	return {
		"use functions must return the result of next()": true,
		// @ts-ignore undefined
		context,
		sendContext: clientAfterContext,
		clientAfterContext,
	};
}

export const publicMiddleware = createMiddleware().server(async (ctx) => {
	setHeader("cache-control", "public, max-age=3600");
	return ctx.next();
});
