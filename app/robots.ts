import { defineEventHandler } from "vinxi/http";

import { loadServerConfig } from "~/config/server";

export default defineEventHandler(() => {
	const serverConfig = loadServerConfig();
	return new Response(
		`
User-Agent: *
Allow: /

Host: ${serverConfig.app.url}
Sitemap: ${serverConfig.app.url}/sitemap.xml
    `.trim(),
		{
			headers: {
				"content-type": "text/plain",
				"cache-control": "public, max-age=3600",
			},
		},
	);
});
