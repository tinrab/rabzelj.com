import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { THEME_LOCAL_STORAGE_KEY } from "~/lib/theme/constants";
import { changeThemeServerFn } from "~/lib/theme/fn";
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
      setTheme(newTheme);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(storageKey, newTheme);
      }

      let resolvedTheme = newTheme;
      if (resolvedTheme === Theme.SYSTEM) {
        resolvedTheme = getSystemTheme();
      }

      if (resolvedTheme === Theme.DARK) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [storageKey],
  );

  // Allow user to change the theme.
  const updateTheme = useCallback(
    (newTheme: Theme) => {
      if (newTheme === theme) {
        return;
      }

      changeThemeServerFn({ data: { theme: newTheme } });

      applyTheme(newTheme);
    },
    [theme, applyTheme],
  );

  // Listen to system theme preference
  const handleMediaQuery = useCallback(
    (event: MediaQueryListEvent | MediaQueryList) => {
      if (initialTheme !== Theme.SYSTEM) {
        return;
      }
      applyTheme(getSystemTheme(event));
    },
    [applyTheme, initialTheme],
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
