import { Typography } from "~/components/Typography";

export function BlogPostTableOfContents({
  items,
}: {
  items: {
    id: string;
    title: string;
    level: 2 | 3 | 4;
  }[];
}) {
  return (
    <nav
      aria-label="Table of contents"
      className="bg-muted/35 mt-8 rounded-lg border px-4 py-4 sm:px-5"
    >
      <Typography variant="small" className="text-muted-foreground tracking-[0.16em] uppercase">
        On this page
      </Typography>

      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : item.level === 4 ? "ml-8" : undefined}
          >
            <Typography
              variant="mutedLink"
              className="inline text-sm leading-6 no-underline"
              render={<a href={`#${item.id}`}>{item.title}</a>}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
