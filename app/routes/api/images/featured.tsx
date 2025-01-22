import { createAPIFileRoute } from "@tanstack/start/api";

import { serverConfig } from "~/config/server";
import { pathLocator } from "~/lib/path-locator";
import { renderImage } from "~/lib/render-image";

export const APIRoute = createAPIFileRoute("/api/images/featured")({
	GET: async () => {
		const slashCount = 6;
		const width = 1200;
		const height = 630;

		const image = await renderImage(
			<div
				style={{
					fontFamily: "Roboto",
				}}
				tw="px-16 w-full h-full relative flex flex-col items-center justify-center bg-[rgb(10,10,10)] text-white"
			>
				{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
				<svg
					style={{
						position: "absolute",
						left: 0,
						top: 0,
					}}
					width={width}
					height={height}
				>
					<pattern
						id="pattern-checkers"
						x="0"
						y="0"
						width="60"
						height="60"
						patternUnits="userSpaceOnUse"
					>
						<rect
							fill="rgba(26,26,26,0.2)"
							x="0"
							y="0"
							width="30"
							height="30"
						/>
						<rect
							fill="rgba(26,26,26,0.5)"
							x="30"
							y="30"
							width="30"
							height="30"
						/>
					</pattern>
					<rect
						x="0"
						y="0"
						width={width}
						height={height}
						fill="url(#pattern-checkers)"
					/>
				</svg>

				{Array.from({ length: slashCount }, (_, i) => {
					const size = 2000;
					return (
						<div
							key={i}
							style={{
								position: "absolute",
								width: `${size}px`,
								height: `${size * 0.2}px`,
								backgroundColor: `rgba(26,26,26,${(0.1 * slashCount) / (i + 1)})`,
								top: "50%",
								left: "50%",
								transform: `translate(-50%, -50%) scale(1) rotate(${i * 13 - 7}deg)`,
								border: "8px solid rgba(82,82,82,0.04)",
							}}
						/>
					);
				})}

				<div tw="flex flex-row items-center justify-center -mt-10">
					<img
						tw="mr-8 rounded-full border-2"
						src={`${serverConfig.app.url}${pathLocator.assets.avatar}`}
						alt={serverConfig.app.title}
						width="210"
						height="210"
						style={{
							borderColor: "#737373",
						}}
					/>
					<div tw="flex flex-col">
						<div
							tw="text-6xl mb-10"
							style={{
								lineHeight: "1.75rem",
							}}
						>
							{serverConfig.app.title}
						</div>
						<div
							tw="text-6xl"
							style={{
								lineHeight: "1.75rem",
								color: "#737373",
							}}
						>
							Software Engineer
						</div>
					</div>
				</div>
			</div>,
			{
				width,
				height,
			},
		);

		return new Response(image, {
			status: 200,
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=604800, state-while-revalidate=86400",
			},
		});
	},
});
