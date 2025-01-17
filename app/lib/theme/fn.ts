import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie, setHeader } from "vinxi/http";
import { z } from "zod";

import { validateZod } from "~/lib/middleware";
import { Theme } from "~/lib/theme/types";
import { THEME_COOKIE_NAME } from "~/lib/theme/constants";

export const changeThemeServerFn = createServerFn({ method: "POST" })
	.validator(validateZod(z.object({ theme: z.nativeEnum(Theme) })))
	.handler(async ({ data: { theme } }) => {
		setCookie(THEME_COOKIE_NAME, theme, { httpOnly: false, sameSite: "lax" });
	});

export const getThemeServerFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const theme = getCookie(THEME_COOKIE_NAME) || Theme.SYSTEM;
		setHeader("Cache-Control", "private, max-age=31536000");
		return theme as Theme;
	},
);
