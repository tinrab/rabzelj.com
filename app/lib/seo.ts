import { clientConfig } from "~/config/client";

interface SeoOptions {
	path: string;
	title: string;
	description?: string;
	image?: string;
	properties?: Record<string, string>;
}

export function makeSeo({
	path,
	title,
	description,
	image,
	properties,
}: SeoOptions): Array<React.JSX.IntrinsicElements["meta"]> {
	const pageUrl = `${clientConfig.app.url}${path}`;

	const pageTitle = `${title} | ${clientConfig.app.title}`;

	const tags = [
		{ title: pageTitle },

		{ property: "og:title", content: pageTitle },
		{ property: "og:url", content: pageUrl },
		{ property: "og:site_name", content: pageTitle },
	];

	if (description) {
		let pageDescription = description.trim();
		if (!pageDescription.endsWith(".")) {
			pageDescription += ".";
		}

		tags.push({ property: "og:description", content: pageDescription });
	}

	if (image) {
		tags.push({ property: "og:image", content: image });
	}

	if (properties) {
		tags.push(
			...Object.entries(properties).map(([key, value]) => ({
				property: key,
				content: value,
			})),
		);
	}

	return tags;
}
