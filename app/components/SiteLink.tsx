import { Link, useLocation } from "@tanstack/react-router";
import React from "react";

import { cn } from "~/lib/utility";

export interface SiteLinkProps
	extends React.ComponentPropsWithoutRef<typeof Link> {
	activeClassName?: string;
}

export const SiteLink = React.forwardRef<HTMLAnchorElement, SiteLinkProps>(
	function SiteLink(props, ref) {
		const {
			to,
			className: classNameProp,
			activeClassName = "active",
			...otherProps
		} = props;

		const location = useLocation();
		const className = cn(classNameProp, {
			[activeClassName]: location.pathname === to && activeClassName,
		});

		const isExternal =
			typeof to === "string" &&
			(to.startsWith("http") || to.startsWith("mailto:"));

		if (isExternal) {
			return (
				<Link
					ref={ref}
					className={className}
					to={to}
					target="_blank"
					rel="noreferrer"
					{...otherProps}
				/>
			);
		}
		return <Link ref={ref} className={className} to={to} {...otherProps} />;
	},
);
