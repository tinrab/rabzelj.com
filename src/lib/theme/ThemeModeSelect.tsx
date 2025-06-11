import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { useThemeProviderContext } from "~/lib/theme/theme-context";
import { Theme } from "~/lib/theme/types";

type ThemeModeSelectProps = {
  theme?: Theme;
  themes?: Theme[];
  getThemeLabel?: (theme: Theme) => string;
  slotProps?: {
    trigger?: React.ComponentPropsWithoutRef<typeof SelectTrigger>;
  };
} & React.ComponentPropsWithoutRef<typeof Select>;

export function ThemeModeSelect({
  theme,
  themes = [Theme.LIGHT, Theme.DARK, Theme.SYSTEM],
  getThemeLabel = (theme) =>
    theme === Theme.LIGHT ? "Light" : theme === Theme.DARK ? "Dark" : "System",
  slotProps = {},
  ...restProps
}: ThemeModeSelectProps) {
  const themeProvider = useThemeProviderContext();

  const resolvedTheme = theme ?? themeProvider?.theme;

  const handleThemeChange = (newTheme: Theme): void => {
    if (themeProvider === undefined) {
      return;
    }

    themeProvider.setTheme(newTheme);
  };

  return (
    <Select
      {...restProps}
      value={resolvedTheme}
      onValueChange={handleThemeChange}
    >
      <SelectTrigger {...(slotProps?.trigger ?? {})}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme}>
            {getThemeLabel(theme)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
