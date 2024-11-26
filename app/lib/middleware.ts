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

// export const errorMiddleware = createMiddleware()
//   .client((ctx) => ctx.next())
//   .server(async (ctx) => {
//     try {
//       return await ctx.next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         return makeServerReply<ErrorMiddlewareServerReply>({
//           issues: error.issues,
//         });
//       }
//       if (error instanceof AppError) {
//         return makeServerReply<ErrorMiddlewareServerReply>({
//           appError: error.message,
//         });
//       }
//       if (error instanceof IdentityError) {
//         return makeServerReply<ErrorMiddlewareServerReply>({
//           identityErrorReason: error.reason,
//         });
//       }

//       console.error(error);
//       return makeServerReply<ErrorMiddlewareServerReply>({
//         appError: 'Unknown error',
//       });
//     }
//   })
//   .clientAfter(async (ctx) => {
//     if (ctx.context?.issues) {
//       throw new ZodError(ctx.context.issues);
//     }
//     if (ctx.context?.appError) {
//       throw new AppError(ctx.context.appError);
//     }
//     if (ctx.context?.identityErrorReason) {
//       throw IdentityError.newWithReason(ctx.context.identityErrorReason);
//     }

//     return ctx.next();
//   });
