import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

import { THEME_LOCAL_STORAGE_KEY } from "~/lib/theme/constants";
import { Theme } from "~/lib/theme/types";

type ThemeProviderState = {
	theme: Theme;
	setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
	children: React.ReactNode;
	storageKey?: string;
	initialTheme?: Theme;
};

const THEME_MEDIA_QUERY = "(prefers-color-scheme: dark)";

const initialState: ThemeProviderState = {
	theme: Theme.SYSTEM,
	setTheme: () => {},
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
	children,
	storageKey = THEME_LOCAL_STORAGE_KEY,
	initialTheme,
	...otherProps
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => initialTheme ?? getStoredTheme(storageKey),
	);

	// Applies theme to the document.
	const applyTheme = useCallback(
		(newTheme: Theme) => {
			if (typeof document === "undefined") {
				return;
			}
			try {
				let resolvedTheme = newTheme;
				if (resolvedTheme === Theme.SYSTEM) {
					resolvedTheme = getSystemTheme();
				}

				const element = document.documentElement;
				element.dataset.theme = resolvedTheme;
				element.classList.remove(Theme.LIGHT, Theme.DARK);
				element.classList.add(resolvedTheme);

				if (typeof localStorage !== "undefined") {
					localStorage.setItem(storageKey, newTheme);
				}
			} catch {}
		},
		[storageKey],
	);

	// Applies theme to the document on mount.
	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}
		const element = document.documentElement;
		if (
			!element.classList.contains(Theme.LIGHT) &&
			!element.classList.contains(Theme.DARK)
		) {
			applyTheme(theme);
		}
	}, [applyTheme, theme]);

	// Allow user to override system theme preference and save it to localStorage.
	const updateTheme = useCallback(
		(newTheme: Theme) => {
			if (newTheme !== theme) {
				setTheme(newTheme);
				if (typeof localStorage !== "undefined") {
					localStorage.setItem(storageKey, newTheme);
				}
			}
			applyTheme(newTheme);
		},
		[storageKey, applyTheme, theme],
	);

	// Listen to system theme preference
	const handleMediaQuery = useCallback(
		(event: MediaQueryListEvent | MediaQueryList) => {
			if (theme !== Theme.SYSTEM) {
				return;
			}
			applyTheme(getSystemTheme(event));
		},
		[applyTheme, theme],
	);
	useEffect(() => {
		const media = window.matchMedia(THEME_MEDIA_QUERY);

		// Intentionally use deprecated listener methods to support iOS & old browsers
		media.addListener(handleMediaQuery);
		handleMediaQuery(media);

		return () => media.removeListener(handleMediaQuery);
	}, [handleMediaQuery]);

	return (
		<ThemeProviderContext.Provider
			{...otherProps}
			value={{
				theme,
				setTheme: updateTheme,
			}}
		>
			{children}
		</ThemeProviderContext.Provider>
	);
}

function getStoredTheme(key: string): Theme {
	if (typeof localStorage === "undefined") {
		return Theme.SYSTEM;
	}
	let theme: Theme | undefined;
	try {
		theme = (localStorage.getItem(key) as Theme) || undefined;
	} catch {
		// Unsupported
	}
	return theme || Theme.SYSTEM;
}

function getSystemTheme(
	mediaQuery?: MediaQueryList | MediaQueryListEvent,
): Theme {
	let matchedMedia = mediaQuery;
	if (typeof window !== "undefined") {
		matchedMedia = window.matchMedia(THEME_MEDIA_QUERY);
	}
	if (!matchedMedia) {
		return Theme.DARK;
	}
	const isDark = matchedMedia.matches;
	return isDark ? Theme.DARK : Theme.LIGHT;
}

export function useThemeProviderContext(): ThemeProviderState | undefined {
	return useContext(ThemeProviderContext);
}

export function useTheme(): ThemeProviderState {
	const context = useContext(ThemeProviderContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
