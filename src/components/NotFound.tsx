import type React from "react";

import { Link } from "@tanstack/react-router";

import { LayoutMain } from "~/components/layout/LayoutMain";
import { LayoutRoot } from "~/components/layout/LayoutRoot";
import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";
import { SiteFooter } from "~/components/SiteFooter";
import { SiteHeader } from "~/components/SiteHeader";
import { Typography } from "~/components/Typography";

interface StatusPageProps {
  code: string;
  message: React.ReactNode;
}

export function StatusPage({ code, message }: StatusPageProps) {
  return (
    <SpineRow className="gap-6 pt-16 pb-24 xl:gap-0 xl:pt-28 xl:pb-40">
      <SpineMargin>
        <p className="text-[2.75rem] leading-none font-light tracking-[-0.03em] tabular-nums">
          {code}
        </p>
      </SpineMargin>
      <SpineBody className="xl:pt-2">
        <p className="text-[1.3125rem] leading-normal">{message}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <Typography variant="a" render={<Link to="/">Go to the home page</Link>} />
          </li>
          <li>
            <Typography variant="a" render={<Link to="/blog">Browse the blog</Link>} />
          </li>
        </ul>
      </SpineBody>
    </SpineRow>
  );
}

export function NotFound() {
  return (
    <StatusPage code="404" message="This page doesn't exist. It may have been moved or renamed." />
  );
}

// Used where no layout route matched, so it brings its own frame.
export function RootNotFound() {
  return (
    <LayoutRoot>
      <SiteHeader />
      <LayoutMain>
        <NotFound />
      </LayoutMain>
      <SiteFooter />
    </LayoutRoot>
  );
}
