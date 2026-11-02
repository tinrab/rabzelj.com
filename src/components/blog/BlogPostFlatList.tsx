import type React from "react";

import type { BlogPostCommon } from "~/lib/blog/post/schema";

interface BlogPostFlatListProps<T extends BlogPostCommon> {
  posts: T[];
  renderPost: (post: T) => React.ReactNode;
}

export function BlogPostFlatList<T extends BlogPostCommon>({
  posts,
  renderPost,
}: BlogPostFlatListProps<T>) {
  return (
    <div className="w-full font-sans">
      <div className="relative">
        <ul className="list-disc pl-4 md:pl-8">
          {posts.map((post) => (
            <li key={post.url} className="mb-2 text-xl text-balance md:text-2xl">
              {renderPost(post)}
            </li>
          ))}
        </ul>
        <div className="bg-border absolute top-0 -left-0.5 h-full w-1 shrink-0 overflow-hidden" />
      </div>
    </div>
  );
}
