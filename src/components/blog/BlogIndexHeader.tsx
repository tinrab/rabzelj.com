import type React from "react";

import { BlogTabList } from "~/components/blog/BlogTabList";
import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";

interface BlogIndexHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function BlogIndexHeader({ title, children }: BlogIndexHeaderProps) {
  return (
    <SpineRow className="gap-6 pt-12 pb-10 xl:items-end xl:gap-0 xl:pt-20 xl:pb-12">
      <SpineMargin>
        <h1 className="text-[2.75rem] leading-none font-light tracking-[-0.03em] text-balance">
          {title}
        </h1>
      </SpineMargin>
      <SpineBody className="text-[0.9375rem]">
        <BlogTabList />
      </SpineBody>
      {children ? (
        <SpineBody className="mt-2 xl:col-start-2 xl:mt-6">{children}</SpineBody>
      ) : undefined}
    </SpineRow>
  );
}
