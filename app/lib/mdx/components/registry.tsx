import type { MdxContentComponents } from "@temelj/mdx-react";
import type React from "react";

import { Typography } from "~/components/Typography";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHead,
	TableCell,
} from "~/components/ui/table";
import { MdxCodeBlock } from "~/lib/mdx/components/MdxCodeBlock";
import { MdxContentHeading } from "~/lib/mdx/components/MdxContentHeading";
import { MdxInlineCode } from "~/lib/mdx/components/MdxInlineCode";
import { cn } from "~/lib/utility";

export function getMdxContentComponents({
	lowerHeadings,
}: { lowerHeadings?: boolean } = {}): MdxContentComponents {
	return {
		p: ({
			className,
			children,
			...restProps
		}: React.HTMLAttributes<HTMLElement>) => (
			<Typography
				gutterBottom
				// className={cn(className, "text-base/7 lg:text-lg/7")}
				className={cn(className)}
				asChild
				{...restProps}
			>
				<p>{children}</p>
			</Typography>
		),
		a: ({
			href,
			children,
			...restProps
		}: React.HTMLAttributes<HTMLElement> & { href?: string }) => (
			<Typography variant="a" asChild {...restProps}>
				<a href={href}>{children}</a>
			</Typography>
		),

		h1: (props: React.HTMLAttributes<HTMLElement>) => (
			<MdxContentHeading
				lowerHeadings={lowerHeadings}
				variant="h1"
				className="underline decoration-link decoration-dashed underline-offset-8"
				{...props}
			/>
		),
		h2: (props: React.HTMLAttributes<HTMLElement>) => (
			<MdxContentHeading
				lowerHeadings={lowerHeadings}
				variant="h2"
				{...props}
			/>
		),
		h3: (props: React.HTMLAttributes<HTMLElement>) => (
			<MdxContentHeading
				lowerHeadings={lowerHeadings}
				variant="h3"
				{...props}
			/>
		),

		blockquote: ({
			className,
			...restProps
		}: React.HTMLAttributes<HTMLElement>) => (
			<blockquote
				className={cn(className, "my-6 border-l-2 pl-6 italic")}
				{...restProps}
			/>
		),
		ul: ({
			className,
			...restProps
		}: React.HTMLAttributes<HTMLUListElement>) => (
			<ul
				className={cn(className, "my-6 ml-6 list-disc [&>li]:mt-2")}
				{...restProps}
			/>
		),
		li: ({ children, ...restProps }: React.HTMLAttributes<HTMLElement>) => (
			<Typography asChild {...restProps}>
				<li>{children}</li>
			</Typography>
		),

		table: ({
			className,
			...restProps
		}: React.HTMLAttributes<HTMLTableElement>) => (
			<Table className={cn(className, "my-6")} {...restProps} />
		),
		thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
			<TableHeader {...props} />
		),
		tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
			<TableBody {...props} />
		),
		tfoot: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
			<TableFooter {...props} />
		),
		tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
			<TableRow {...props} />
		),
		th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
			<TableHead {...props} />
		),
		td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
			<TableCell {...props} />
		),

		pre: ({ className, ...restProps }: React.HTMLAttributes<HTMLElement>) => (
			<MdxCodeBlock className={cn("mb-4", className)} {...restProps} />
		),
		code: (props: React.HTMLAttributes<HTMLElement>) => (
			<MdxInlineCode {...props} />
		),

		img: ({ alt, ...restProps }: React.ImgHTMLAttributes<HTMLImageElement>) => {
			if (!alt) {
				throw new Error("Image must have an alt attribute");
			}
			return (
				<span className="mx-auto flex flex-col gap-2 text-center">
					{/* biome-ignore lint/a11y/useAltText: generated alt text */}
					<img alt={alt} {...restProps} />
					<span className="font-normal text-muted-foreground text-sm leading-5">
						{alt}
					</span>
				</span>
			);
		},
	};
}
