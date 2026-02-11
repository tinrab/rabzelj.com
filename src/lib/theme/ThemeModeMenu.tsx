import type React from "react";

import { IconMoonStars, IconSun } from "@tabler/icons-react";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useThemeProviderContext } from "~/lib/theme/theme-context";
import { Theme } from "~/lib/theme/types";

type ThemeModeMenuProps = {
  themes?: Theme[];
  getThemeLabel?: (theme: Theme) => string;
} & React.ComponentProps<"div">;

export function ThemeModeMenu({
  themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM],
  getThemeLabel = (theme) =>
    theme === Theme.LIGHT ? "Light" : theme === Theme.DARK ? "Dark" : "System",
}: ThemeModeMenuProps) {
  const themeProvider = useThemeProviderContext();

  const handleThemeChange = (newTheme: Theme): void => {
    if (themeProvider === undefined) {
      return;
    }

    themeProvider.setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon">
            <IconSun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <IconMoonStars className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => handleThemeChange(theme)}>
            {getThemeLabel(theme)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
