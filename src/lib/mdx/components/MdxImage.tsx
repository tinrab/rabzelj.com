"use client";

import type React from "react";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";

import { cn } from "~/lib/utility";

type MdxImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  alt: string;
};

export function MdxImage({ alt, className, src, ...props }: MdxImageProps) {
  const [open, setOpen] = useState(false);
  const canOpenLightbox = typeof src === "string" && src.length > 0;

  const image = <img alt={alt} className={cn(className, "mx-auto")} src={src} {...props} />;

  return (
    <span className="mx-auto flex flex-col gap-2 text-center">
      {canOpenLightbox ? (
        <>
          <button
            type="button"
            className="mx-auto cursor-zoom-in border-0 bg-transparent p-0"
            aria-label={`Open image: ${alt}`}
            onClick={() => setOpen(true)}
          >
            {image}
          </button>
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            render={{
              buttonPrev: () => null,
              buttonNext: () => null,
            }}
            slides={[
              {
                src,
                alt,
              },
            ]}
          />
        </>
      ) : (
        image
      )}
      <span className="text-muted-foreground text-sm leading-5 font-normal">{alt}</span>
    </span>
  );
}
