import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie, setHeader } from "vinxi/http";
import * as v from "valibot";

import { Theme } from "~/lib/theme/types";
import { THEME_COOKIE_NAME } from "~/lib/theme/constants";
import { validateValibot } from "~/lib/middleware";

export const changeThemeServerFn = createServerFn({ method: "POST" })
	.validator(validateValibot(v.object({ theme: v.enum(Theme) })))
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
