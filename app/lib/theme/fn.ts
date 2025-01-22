import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie, setHeader } from "vinxi/http";
import { z } from "zod";

import { validateZod } from "~/lib/middleware";
import { Theme } from "~/lib/theme/types";
import { THEME_COOKIE_NAME } from "~/lib/theme/constants";

export const changeThemeServerFn = createServerFn({ method: "POST" })
	.validator(validateZod(z.object({ theme: z.nativeEnum(Theme) })))
	.handler(async ({ data }) => {
		setCookie(THEME_COOKIE_NAME, data.theme, {
			httpOnly: false,
			path: "/",
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			maxAge: 60 * 60 * 24 * 365,
		});
	});

export const getThemeServerFn = createServerFn().handler(async () => {
	const theme = getCookie(THEME_COOKIE_NAME) || Theme.SYSTEM;
	setHeader("Cache-Control", "private, max-age=31536000");
	return theme as Theme;
});
