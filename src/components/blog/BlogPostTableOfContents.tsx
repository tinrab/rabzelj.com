import type { BlogPostTableOfContentsItem } from "~/lib/blog/post/schema";

import { cn } from "~/lib/utility";

interface BlogPostTableOfContentsProps {
  items: BlogPostTableOfContentsItem[];
}

export function BlogPostTableOfContents({ items }: BlogPostTableOfContentsProps) {
  return (
    <nav aria-labelledby="toc-heading" className="text-sm">
      <h2 id="toc-heading" className="text-muted-foreground">
        Contents
      </h2>

      <ul className="mt-3 flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className={cn(item.level === 3 && "pl-4 xl:pl-0", item.level === 4 && "pl-8 xl:pl-0")}
          >
            <a
              href={`#${item.id}`}
              className={cn(
                "hover:text-foreground leading-snug transition-colors",
                item.level === 2 ? "text-foreground/80" : "text-muted-foreground",
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
