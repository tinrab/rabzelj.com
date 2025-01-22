import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useId } from "react";
import { FaCheck, FaCopy } from "react-icons/fa6";

import { ProgrammingLanguageIcon } from "~/components/ProgrammingLanguageIcon";
import { IconButton } from "~/components/ui/icon-button";
import { cn } from "~/lib/utility";

type MdxCodeBlockProps = {
	"data-file-name"?: string;
	"data-language"?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function MdxCodeBlock({
	className,
	children,
	"data-file-name": fileName,
	"data-language": language,
	style: _style,
	...restProps
}: MdxCodeBlockProps) {
	const codeId = useId();
	const copyMutation = useMutation({
		mutationKey: ["copy", codeId],
		mutationFn: async () => {
			const code = document.getElementById(codeId)?.textContent;
			if (!code) {
				return;
			}
			await navigator.clipboard.writeText(code);
			await new Promise((resolve) => setTimeout(resolve, 2000));
		},
	});

	const handleCopyClick = (): void => {
		copyMutation.mutate();
	};

	return (
		<div className="relative rounded-sm" {...restProps}>
			{fileName ? (
				<div className="relative flex rounded-t-sm border-border border-t-2 border-r-2 border-l-2 p-2 text-muted-foreground">
					<div className="ml-2 flex grow items-center gap-2 self-center text-muted-foreground text-sm">
						{language ? (
							<ProgrammingLanguageIcon language={language} />
						) : undefined}
						{fileName}
					</div>

					<IconButton
						variant="outline"
						size="sm"
						aria-label="copy code"
						onClick={handleCopyClick}
						disabled={copyMutation.isPending}
					>
						{copyMutation.isPending ? <FaCheck /> : <FaCopy />}
					</IconButton>
				</div>
			) : undefined}

			<div className="relative">
				<pre
					id={codeId}
					className={cn(
						"group relative flex overflow-auto rounded-sm border-2 border-border font-mono font-normal text-sm leading-relaxed [&_code]:bg-transparent",
						fileName ? "rounded-t-none" : "",
						"shiki",
						className,
					)}
				>
					{children}

					{!fileName ? (
						<div className="absolute top-0 right-0 z-10 hidden p-2 text-muted-foreground group-hover:block">
							<IconButton
								variant="outline"
								size="sm"
								aria-label="copy code"
								onClick={handleCopyClick}
								disabled={copyMutation.isPending}
							>
								{copyMutation.isPending ? <FaCheck /> : <FaCopy />}
							</IconButton>
						</div>
					) : undefined}
				</pre>
			</div>
		</div>
	);
}
