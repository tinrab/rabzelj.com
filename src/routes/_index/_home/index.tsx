import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { FaBluesky, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

import { Typography } from "~/components/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
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
    Icon: FaXTwitter,
  },
  {
    title: "Bluesky",
    props: {
      href: clientConfig.social.blueskyUrl,
      "aria-label": "Bluesky",
    },
    Icon: FaBluesky,
  },
  {
    title: "GitHub",
    props: { href: clientConfig.social.githubUrl, "aria-label": "GitHub" },
    Icon: FaGithub,
  },
  {
    title: "Linkedin",
    props: { href: clientConfig.social.linkedinUrl, "aria-label": "Linkedin" },
    Icon: FaLinkedin,
  },
];

function RouteComponent() {
  const [email, setEmail] = useState<string>();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center break-words px-4 pt-6 pb-8 md:pt-12">
      <Avatar className="mb-3 h-28 w-28">
        <AvatarImage src={pathLocator.assets.avatar} alt="Tin Rabzelj" />
        <AvatarFallback>TR</AvatarFallback>
      </Avatar>
      <Typography variant="h1" className="mb-3 text-4xl md:text-5xl">
        Tin Rabzelj
      </Typography>
      <h2 className="mb-6 text-muted-foreground">Software Engineer</h2>

      <div className="mb-5 text-center">
        <Typography>
          Personal blog:{" "}
          <Typography variant="a" asChild>
            <Link to="/blog">/blog</Link>
          </Typography>
          .
        </Typography>
        <Typography>
          Find my OSS projects on{" "}
          <Typography variant="a" asChild>
            <a
              href="https://github.com/tinrab"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </Typography>
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
        asChild
        onClick={() => {
          console.log("email");

          if (!email) {
            setEmail(stringCipher(clientConfig.social.email, -3));
          }
        }}
      >
        {email?.length ? (
          <a href={`mailto:${email}`}>Contact Email</a>
        ) : (
          <span className="cursor-pointer">View Email</span>
        )}
      </Button>
    </div>
  );
}
