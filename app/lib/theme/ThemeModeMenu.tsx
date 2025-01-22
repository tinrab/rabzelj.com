import type React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { IconButton } from "~/components/ui/icon-button";
import { useThemeProviderContext } from "~/lib/theme/theme-context";
import { Theme } from "~/lib/theme/types";

type ThemeModeMenuProps = {
	themes?: Theme[];
	getThemeLabel?: (theme: Theme) => string;
} & React.HTMLAttributes<HTMLDivElement>;

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
			<DropdownMenuTrigger asChild>
				<IconButton variant="ghost">
					<MdLightMode className="dark:-rotate-90 rotate-0 scale-100 transition-all dark:scale-0" />
					<MdDarkMode className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{themes.map((theme) => (
					<DropdownMenuItem
						key={theme}
						onClick={() => handleThemeChange(theme)}
					>
						{getThemeLabel(theme)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
