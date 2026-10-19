import type { MathComponentProps, MdxComponentProps } from "@temelj/mdx-react";
import type React from "react";
// The renderer supplies node metadata; it is never a DOM attribute.
/* oxlint-disable no-unused-vars */

import { Link } from "@tanstack/react-router";
import { defineMdxRegistry } from "@temelj/mdx-react";
import katex from "katex";

import { Typography } from "~/components/Typography";
import { Alert, AlertDescription } from "~/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { MdxCodeBlock } from "~/lib/mdx/components/MdxCodeBlock";
import { MdxContentHeading } from "~/lib/mdx/components/MdxContentHeading";
import { MdxDemo } from "~/lib/mdx/components/MdxDemo";
import { MdxImage } from "~/lib/mdx/components/MdxImage";
import { MdxInlineCode } from "~/lib/mdx/components/MdxInlineCode";
import { cn } from "~/lib/utility";

type ElementProps<Tag extends keyof React.JSX.IntrinsicElements> =
  React.ComponentPropsWithoutRef<Tag> & MdxComponentProps;

function Note({ children }: React.PropsWithChildren) {
  return (
    <Alert className="mb-4">
      <AlertDescription className="[&>p]:m-0">{children}</AlertDescription>
    </Alert>
  );
}

function Math({ source, style }: MathComponentProps) {
  const html = katex.renderToString(source, {
    displayMode: style === "display",
    throwOnError: false,
    trust: false,
  });
  return style === "display" ? (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  );
}

export const mdxPageRegistry = defineMdxRegistry({
  html: {
    p: ({ node: _, ...props }: ElementProps<"p">) => (
      <Typography variant="body" gutter {...props} />
    ),
    a: ({ node: _, href, ...props }: ElementProps<"a">) => {
      const isExternal = href?.startsWith("http") || href?.startsWith("mailto:");
      return (
        <Typography
          variant="a"
          render={
            <Link
              to={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            />
          }
          {...props}
        />
      );
    },
    h1: ({ node: _, ...props }: ElementProps<"h1">) => (
      <MdxContentHeading lowerHeadings variant="h1" {...props} />
    ),
    h2: ({ node: _, ...props }: ElementProps<"h2">) => (
      <MdxContentHeading lowerHeadings variant="h2" {...props} />
    ),
    h3: ({ node: _, ...props }: ElementProps<"h3">) => (
      <MdxContentHeading lowerHeadings variant="h3" {...props} />
    ),
    blockquote: ({ node: _, className, ...props }: ElementProps<"blockquote">) => (
      <blockquote className={cn(className, "mt-4 border-l-2 pl-4 italic")} {...props} />
    ),
    ul: ({ node: _, className, ...props }: ElementProps<"ul">) => (
      <ul className={cn(className, "mt-4 ml-4 list-disc [&>li]:mt-2")} {...props} />
    ),
    ol: ({ node: _, className, ...props }: ElementProps<"ol">) => (
      <ol className={cn(className, "mt-4 ml-4 list-decimal [&>li]:mt-2")} {...props} />
    ),
    li: ({ node: _, ...props }: ElementProps<"li">) => <Typography render={<li />} {...props} />,
    table: ({ node: _, className, ...props }: ElementProps<"table">) => (
      <Table className={cn(className, "mt-4")} {...props} />
    ),
    thead: ({ node: _, ...props }: ElementProps<"thead">) => <TableHeader {...props} />,
    tbody: ({ node: _, ...props }: ElementProps<"tbody">) => <TableBody {...props} />,
    tfoot: ({ node: _, ...props }: ElementProps<"tfoot">) => <TableFooter {...props} />,
    tr: ({ node: _, ...props }: ElementProps<"tr">) => <TableRow {...props} />,
    th: ({ node: _, ...props }: ElementProps<"th">) => <TableHead {...props} />,
    td: ({ node: _, ...props }: ElementProps<"td">) => <TableCell {...props} />,
    pre: ({ node: _, className, ...props }: ElementProps<"pre">) => (
      <MdxCodeBlock className={cn("mt-4", className)} {...props} />
    ),
    code: ({ node: _, className, ...props }: ElementProps<"code">) =>
      className?.split(/\s+/).some((name) => name.startsWith("language-")) ? (
        <code className={className} {...props} />
      ) : (
        <MdxInlineCode className={className} {...props} />
      ),
    img: ({ node: _, alt, ...props }: ElementProps<"img">) => {
      if (!alt) {
        throw new Error("Image must have an alt attribute");
      }
      return <MdxImage alt={alt} {...props} />;
    },
  },
  jsx: {
    Note: { component: Note },
    ...(import.meta.env.DEV ? { Demo: { component: MdxDemo } } : {}),
  },
  math: Math,
});
