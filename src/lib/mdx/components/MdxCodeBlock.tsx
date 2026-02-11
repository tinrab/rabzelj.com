import type React from "react";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useId } from "react";

import { ProgrammingLanguageIcon } from "~/components/ProgrammingLanguageIcon";
import { Button } from "~/components/ui/button";
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
        <div className="border-border text-muted-foreground relative flex rounded-t-sm border-t-2 border-r-2 border-l-2 p-2">
          <div className="text-muted-foreground ml-2 flex grow items-center gap-2 self-center text-sm">
            {language ? <ProgrammingLanguageIcon language={language} /> : undefined}
            {fileName}
          </div>

          <Button
            variant="outline"
            size="icon-sm"
            aria-label="copy code"
            onClick={handleCopyClick}
            disabled={copyMutation.isPending}
          >
            {copyMutation.isPending ? <IconCheck /> : <IconCopy />}
          </Button>
        </div>
      ) : undefined}

      <div className="group relative">
        <pre
          id={codeId}
          className={cn(
            "border-border relative flex overflow-auto rounded-sm border-2 font-mono text-sm leading-relaxed font-normal [&_code]:bg-transparent",
            fileName ? "rounded-t-none" : "",
            "shiki",
          )}
        >
          {children}
        </pre>
        {!fileName ? (
          <div className="text-muted-foreground absolute top-0 right-0 z-10 hidden p-2 group-hover:block">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="copy code"
              onClick={handleCopyClick}
              disabled={copyMutation.isPending}
            >
              {copyMutation.isPending ? <IconCheck /> : <IconCopy />}
            </Button>
          </div>
        ) : undefined}
      </div>
    </div>
  );
}
