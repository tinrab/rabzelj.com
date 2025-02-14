import { createMiddleware } from "@tanstack/start";
import { setHeader } from "vinxi/http";
import * as v from "valibot";

export function validateValibot<
	T extends v.ObjectSchema<v.ObjectEntries, undefined>,
>(schema: T): (input: unknown) => v.InferOutput<T> {
	return (input: unknown) => v.parse(schema, input);
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
	setHeader(
		"cache-control",
		"public, max-age=86400, stale-while-revalidate=3600",
	);
	return ctx.next();
});
