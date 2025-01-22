import {
	headingIdPlugin,
	MdxCompiler,
	removeImportsExportsPlugin,
	syntaxHighlightPlugin,
} from "@temelj/mdx";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

async function loadMdxCompiler(): Promise<MdxCompiler> {
	const lightTheme = (await import("shiki/themes/github-light-default.mjs"))
		.default;
	const darkTheme = (await import("shiki/themes/github-dark-default.mjs"))
		.default;

	return (
		new MdxCompiler()
			.withRemarkPlugin(removeImportsExportsPlugin)
			// @ts-ignore invalid types
			.withRemarkPlugin(remarkMath)
			.withRehypePlugin(headingIdPlugin)
			.withRehypePlugin(syntaxHighlightPlugin, {
				includeDataAttributes: ["language"],
				highlight: {},
				lineNumbers: {},
				commandLine: {},
				shikiHastOptions: {
					themes: {
						light: lightTheme,
						dark: darkTheme,
					},
				},
			})
			// @ts-ignore invalid types
			.withRehypePlugin(rehypeKatex)
	);
}

let compiler: MdxCompiler | undefined;

export async function getMdxCompiler(): Promise<MdxCompiler> {
	if (compiler) {
		return compiler;
	}
	compiler = await loadMdxCompiler();
	return compiler;
}
