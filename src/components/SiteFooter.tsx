import { SpineBody, SpineMargin, SpineRow } from "~/components/layout/Spine";
import { clientConfig } from "~/config/client";
import { pathLocator } from "~/lib/path-locator";

const links = [
  { title: "GitHub", href: clientConfig.social.githubUrl, external: true },
  { title: "X", href: clientConfig.social.twitterUrl, external: true },
  { title: "Bluesky", href: clientConfig.social.blueskyUrl, external: true },
  { title: "LinkedIn", href: clientConfig.social.linkedinUrl, external: true },
  { title: "RSS", href: pathLocator.blog.rss, external: false },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t text-sm">
      <SpineRow className="gap-3 py-8 xl:gap-0">
        <SpineMargin className="text-muted-foreground">Tin Rabzelj</SpineMargin>
        <SpineBody>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(({ title, href, external }) => (
              <li key={title}>
                <a
                  href={href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                >
                  {title}
                </a>
              </li>
            ))}
          </ul>
        </SpineBody>
      </SpineRow>
    </footer>
  );
}
