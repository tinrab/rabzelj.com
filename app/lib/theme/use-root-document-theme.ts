import { parseCookieHeader } from "@temelj/request";

import { Theme } from "~/lib/theme/types";
import {
	THEME_COOKIE_NAME,
	THEME_LOCAL_STORAGE_KEY,
} from "~/lib/theme/constants";

// export function useRootDocumentTheme(theme?: Theme): Theme | undefined {
// 	let selectedTheme: Theme | undefined = theme;

// 	if (typeof document !== "undefined") {
// 		const cookieTheme = parseCookieHeader(document.cookie).find(
// 			(cookie) => cookie.name === THEME_COOKIE_NAME,
// 		)?.value;
// 		if (cookieTheme) {
// 			selectedTheme = cookieTheme as Theme;
// 		}
// 	}

// 	if (typeof localStorage !== "undefined") {
// 		const storedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY) as Theme;

// 		if (storedTheme) {
// 			selectedTheme = storedTheme;
// 		}
// 	}

// 	if (selectedTheme === Theme.SYSTEM) {
// 		if (typeof window !== "undefined") {
// 			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
// 			if (mediaQuery.matches) {
// 				selectedTheme = Theme.DARK;
// 			} else {
// 				selectedTheme = Theme.LIGHT;
// 			}
// 		}
// 		// else {
// 		// 	selectedTheme = Theme.DARK;
// 		// }
// 	}

// 	return selectedTheme;
// }
