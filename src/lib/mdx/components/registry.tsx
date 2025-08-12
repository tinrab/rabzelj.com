import { Link } from "@tanstack/react-router";
import type { MdxContentComponents } from "@temelj/mdx-react";

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
import { MdxInlineCode } from "~/lib/mdx/components/MdxInlineCode";
import { cn } from "~/lib/utility";

export function getMdxContentComponents({
  lowerHeadings,
}: {
  lowerHeadings?: boolean;
} = {}): MdxContentComponents {
  return {
    p: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <Typography gutter asChild {...props}>
        <p>{children}</p>
      </Typography>
    ),
    a: ({
      href,
      children,
      ...props
    }: React.HTMLAttributes<HTMLElement> & { href?: string }) => (
      <Typography variant="a" asChild {...props}>
        <a href={href}>{children}</a>
      </Typography>
    ),

    h1: (props: React.HTMLAttributes<HTMLElement>) => (
      <MdxContentHeading
        lowerHeadings={lowerHeadings}
        variant="h1"
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
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <blockquote
        className={cn(className, "mt-4 border-l-2 pl-4 italic")}
        {...props}
      />
    ),
    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul
        className={cn(className, "mt-4 ml-4 list-disc [&>li]:mt-2")}
        {...props}
      />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol
        className={cn(className, "mt-4 ml-4 list-decimal [&>li]:mt-2")}
        {...props}
      />
    ),
    li: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <Typography asChild {...props}>
        <li>{children}</li>
      </Typography>
    ),

    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <Table className={cn(className, "mt-4")} {...props} />
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

    pre: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <MdxCodeBlock className={cn("mt-4", className)} {...props} />
    ),
    code: (props: React.HTMLAttributes<HTMLElement>) => (
      <MdxInlineCode {...props} />
    ),

    img: ({
      alt,
      className,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => {
      if (!alt) {
        throw new Error("Image must have an alt attribute");
      }
      return (
        <span className="mx-auto flex flex-col gap-2 text-center">
          <img alt={alt} className={cn(className, "mx-auto")} {...props} />
          <span className="font-normal text-muted-foreground text-sm leading-5">
            {alt}
          </span>
        </span>
      );
    },

    Note: ({ children, ...props }) => {
      return (
        <Alert variant="primary" className="mb-4" {...props}>
          <AlertDescription className="[&>p]:m-0">{children}</AlertDescription>
        </Alert>
      );
    },
  };
}

const siteComponents: MdxContentComponents = {
  a: ({ href, ref: _, ...props }) => {
    if (typeof href !== "string") {
      throw new TypeError("href must be a string");
    }

    const isExternal =
      typeof href === "string" &&
      (href.startsWith("http") || href.startsWith("mailto:"));

    return (
      <Typography variant="a" asChild {...props}>
        <Link
          to={href}
          {...props}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        />
      </Typography>
    );
  },
};

export const mdxPageComponents: MdxContentComponents = {
  ...getMdxContentComponents(),
  ...siteComponents,
};

export const mdxPageLowerHeadingComponents: MdxContentComponents = {
  ...getMdxContentComponents({ lowerHeadings: true }),
  ...siteComponents,
};
