import { useMutation } from "@tanstack/react-query";
import type React from "react";
import { useId } from "react";
import { MdCheck, MdContentCopy } from "react-icons/md";

import { IconButton } from "~/components/IconButton";
import { ProgrammingLanguageIcon } from "~/components/ProgrammingLanguageIcon";
import { cn } from "~/lib/utility";

type MdxCodeBlockProps = {
  "data-file-name"?: string;
  "data-language"?: string;
} & React.ComponentProps<"div">;

export function MdxCodeBlock({
  className,
  children,
  "data-file-name": fileName,
  "data-language": language,
  style: _style,
  ...props
}: MdxCodeBlockProps) {
  const codeId = useId();
  const copyMutation = useMutation({
    mutationKey: ["copy", codeId],
    mutationFn: async () => {
      const code = document.getElementById(codeId)?.textContent;
      if (!code) {
        return;
      }
      await navigator.clipboard.writeText(code);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    },
  });

  const handleCopyClick = (): void => {
    copyMutation.mutate();
  };

  return (
    <div className={cn(className, "relative rounded-sm")} {...props}>
      {fileName ? (
        <div className="relative flex rounded-t-sm border-border border-t-2 border-r-2 border-l-2 p-2 text-muted-foreground">
          <div className="ml-2 flex grow items-center gap-2 self-center text-muted-foreground text-sm">
            {language ? (
              <ProgrammingLanguageIcon language={language} />
            ) : undefined}
            {fileName}
          </div>

          <IconButton
            variant="outline"
            size="sm"
            aria-label="copy code"
            onClick={handleCopyClick}
            disabled={copyMutation.isPending}
          >
            {copyMutation.isPending ? <MdCheck /> : <MdContentCopy />}
          </IconButton>
        </div>
      ) : undefined}

      <div className="group relative">
        <pre
          id={codeId}
          className={cn(
            "relative flex overflow-auto rounded-sm border-2 border-border font-mono font-normal text-sm leading-relaxed [&_code]:bg-transparent",
            fileName ? "rounded-t-none" : "",
            "shiki",
          )}
        >
          {children}
        </pre>
        {!fileName ? (
          <div className="absolute top-0 right-0 z-10 hidden p-2 text-muted-foreground group-hover:block">
            <IconButton
              variant="outline"
              size="sm"
              aria-label="copy code"
              onClick={handleCopyClick}
              disabled={copyMutation.isPending}
            >
              {copyMutation.isPending ? <MdCheck /> : <MdContentCopy />}
            </IconButton>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
