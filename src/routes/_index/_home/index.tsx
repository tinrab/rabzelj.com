import {
  IconBrandBluesky,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
} from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Typography } from "~/components/Typography";
import { Button } from "~/components/ui/button";
import { clientConfig } from "~/config/client";
import { pathLocator } from "~/lib/path-locator";
import { stringCipher } from "~/lib/string";

export const Route = createFileRoute("/_index/_home/")({
  component: RouteComponent,
});

const socialLinks = [
  {
    title: "X / Twitter",
    props: {
      href: clientConfig.social.twitterUrl,
      "aria-label": "X, formerly Twitter",
    },
    Icon: IconBrandX,
  },
  {
    title: "Bluesky",
    props: {
      href: clientConfig.social.blueskyUrl,
      "aria-label": "Bluesky",
    },
    Icon: IconBrandBluesky,
  },
  {
    title: "GitHub",
    props: { href: clientConfig.social.githubUrl, "aria-label": "GitHub" },
    Icon: IconBrandGithub,
  },
  {
    title: "Linkedin",
    props: { href: clientConfig.social.linkedinUrl, "aria-label": "Linkedin" },
    Icon: IconBrandLinkedin,
  },
];

function RouteComponent() {
  const [email, setEmail] = useState<string>();

  return (
    <div className="wrap-break-word mx-auto flex max-w-3xl flex-col items-center px-4 pt-6 pb-8 md:pt-12">
      <img
        className="relative mb-3 flex aspect-square shrink-0 rounded-full"
        src={`${clientConfig.app.url}${pathLocator.assets.avatar}`}
        alt="Tin Rabzelj"
        width={128}
        height={128}
      />
      <Typography variant="h1" className="mb-3 text-4xl md:text-5xl">
        Tin Rabzelj
      </Typography>
      <h2 className="mb-6 text-muted-foreground">Software Engineer</h2>

      <div className="mb-5 text-center">
        <Typography variant="body">
          Personal blog:{" "}
          <Typography variant="a" render={<Link to="/blog">/blog</Link>} />.
        </Typography>
        <Typography variant="body">
          Find my OSS projects on{" "}
          <Typography
            variant="a"
            render={
              <a
                href="https://github.com/tinrab"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            }
          />
          .
        </Typography>
      </div>

      <blockquote className="mb-8 max-w-md border-l-2 pl-6 text-lg italic">
        Working with Rust, TypeScript, React.js. Focusing on distributed
        systems, microservices, AI, CUDA, graphics programming, osdev, and
        no-code.
      </blockquote>

      <div className="mb-5 flex space-x-6">
        {socialLinks.map(({ title, props, Icon }) => (
          <a
            key={title}
            {...props}
            className="text-base text-foreground/60 transition-colors hover:text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            <span className="sr-only">{title}</span>
            <Icon className="size-8" aria-hidden="true" />
          </a>
        ))}
      </div>

      <Button
        variant="secondary"
        onClick={() => {
          if (!email) {
            setEmail(stringCipher(clientConfig.social.email, -3));
          }
        }}
        nativeButton={false}
        render={
          email?.length ? (
            <a href={`mailto:${email}`}>Contact Email</a>
          ) : (
            <span className="cursor-pointer">View Email</span>
          )
        }
      />
    </div>
  );
}
