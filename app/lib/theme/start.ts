import { createServerFn } from "@tanstack/start";
import { getCookie, setCookie } from "vinxi/http";
import { parseCookieHeader } from "@flinect/temelj/request";
import { z } from "zod";

import { validateZod } from "~/lib/middleware";
import { Theme } from "~/lib/theme/types";

export const THEME_COOKIE_NAME = "tinrab__app-theme";

export const getThemeServerFn = createServerFn({ method: "GET" }).handler(
	async () => {
		return getCookie(THEME_COOKIE_NAME) as Theme | undefined;
	},
);

export const changeThemeServerFn = createServerFn({ method: "POST" })
	.validator(validateZod(z.object({ theme: z.string() })))
	.handler(async ({ data: { theme } }) => {
		setCookie(THEME_COOKIE_NAME, theme, { httpOnly: false, sameSite: "lax" });
	});

export function useRootDocumentTheme(theme?: Theme): Theme | undefined {
	let selectedTheme: Theme = theme ?? Theme.SYSTEM;

	if (typeof document !== "undefined") {
		const cookieTheme = parseCookieHeader(document.cookie).find(
			(cookie) => cookie.name === THEME_COOKIE_NAME,
		)?.value;

		if (cookieTheme) {
			selectedTheme = cookieTheme as Theme;
		}
	}
	if (typeof localStorage !== "undefined") {
		const storedTheme = localStorage.getItem("app-ui-theme") as Theme;

		if (storedTheme) {
			selectedTheme = storedTheme;
		}
	}

	return selectedTheme;
}
