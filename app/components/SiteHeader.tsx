import { useRouter } from "@tanstack/react-router";
import { MdMenu } from "react-icons/md";

import { Header, HeaderRow, HeaderTitle } from "~/components/layout/header";
import { useHeaderContext } from "~/components/layout/header-context";
import { HeaderMobile } from "~/components/layout/header-mobile";
import { NavigationList } from "~/components/navigation-list/NavigationList";
import { NavigationListGroup } from "~/components/navigation-list/NavigationListGroup";
import { NavigationListLink } from "~/components/navigation-list/NavigationListLink";
import { SiteLink } from "~/components/SiteLink";
import { IconButton } from "~/components/ui/icon-button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "~/components/ui/navigation-menu";
import { changeThemeServerFn } from "~/lib/theme/start";
import { ThemeModeMenu } from "~/lib/theme/ThemeModeMenu";
import { cn } from "~/lib/utility";

interface SiteHeaderLinkData {
	title: string;
	to: string;
}

const links: SiteHeaderLinkData[] = [
	// { title: "Blog", to: pathLocator.blog.index },
];

export function SiteHeader() {
	const router = useRouter();

	return (
		<Header>
			<HeaderRow className="max-w-screen-xl">
				<SiteLink to="/">
					<HeaderTitle />
				</SiteLink>

				<div className="ml-auto flex items-center gap-3 pl-3">
					<NavigationMenu className="hidden md:inline-flex">
						<NavigationMenuList>
							{links.map((link) => (
								<NavigationMenuItem key={link.to}>
									<NavigationMenuLink asChild>
										<SiteLink to={link.to}>{link.title}</SiteLink>
									</NavigationMenuLink>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>

					<ThemeModeMenu
						onThemeChange={async (theme) => {
							await changeThemeServerFn({ data: { theme: theme } });
							router.invalidate();
						}}
					/>

					<HeaderMobileTrigger />
				</div>
			</HeaderRow>

			<HeaderMobile>
				<HeaderTitle className="mb-4" />

				<NavigationList>
					<NavigationListGroup>
						{links.map((link) => (
							<NavigationListLink key={link.to} variant="solid" asChild>
								<SiteLink to={link.to}>{link.title}</SiteLink>
							</NavigationListLink>
						))}
					</NavigationListGroup>
				</NavigationList>
			</HeaderMobile>
		</Header>
	);
}

type HeaderMobileTriggerProps = React.HTMLAttributes<HTMLButtonElement>;

export function HeaderMobileTrigger({
	className,
	...restProps
}: HeaderMobileTriggerProps) {
	const { onMenuOpenChange } = useHeaderContext();
	return (
		<IconButton
			variant="outline"
			className={cn("shrink-0 md:hidden", className)}
			onClick={() => onMenuOpenChange(true)}
			{...restProps}
		>
			<MdMenu />
			<span className="sr-only">Toggle navigation menu</span>
		</IconButton>
	);
}
