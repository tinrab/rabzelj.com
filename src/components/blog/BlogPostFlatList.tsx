import type React from "react";

import type { BlogPostCommon } from "~/lib/blog/post/schema";
import { cn } from "~/lib/utility";

interface BlogPostFlatListProps<T extends BlogPostCommon> {
  posts: T[];
  renderPost: (post: T) => React.ReactNode;
  anchorSuffix?: string;
}

export function BlogPostFlatList<T extends BlogPostCommon>({
  posts,
  renderPost,
  anchorSuffix = "",
}: BlogPostFlatListProps<T>) {
  return (
    <div className="w-full font-sans">
      <div className="relative">
        <ul className="list-disc pl-4 md:pl-8">
          {posts.map((post) => (
            <li
              key={post.url}
              className={cn(
                "mb-2 text-balance",
                post.priority === 1
                  ? "text-2xl md:text-3xl"
                  : "text-xl md:text-2xl",
              )}
            >
              {renderPost(post)}
            </li>
          ))}
        </ul>
        <div className="-left-[2px] absolute top-0 h-full w-[4px] shrink-0 overflow-hidden bg-border" />
      </div>
    </div>
  );
}
