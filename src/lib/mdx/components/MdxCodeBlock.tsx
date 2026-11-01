import type React from "react";

import { createContext, useContext, useRef } from "react";

import { ProgrammingLanguageIcon } from "~/components/ProgrammingLanguageIcon";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from "~/components/ui/code-block";
import { MdxInlineCode } from "~/lib/mdx/components/MdxInlineCode";

const CodeBlockContext = createContext(false);

export function MdxCode(props: React.ComponentProps<"code">) {
  // CodeBlockContent owns the code element, including for fences without a language.
  return useContext(CodeBlockContext) ? props.children : <MdxInlineCode {...props} />;
}

type MdxCodeBlockProps = {
  "data-file-name"?: string;
  "data-language"?: string;
} & React.ComponentProps<"pre">;

export function MdxCodeBlock({
  className,
  children,
  "data-file-name": fileName,
  "data-language": language,
  ...props
}: MdxCodeBlockProps) {
  const contentRef = useRef<HTMLPreElement>(null);

  const actions = (
    <CodeBlockActions>
      <CodeBlockCopyButton getValue={() => contentRef.current?.textContent ?? ""} />
    </CodeBlockActions>
  );

  return (
    <CodeBlock className={className}>
      {fileName ? (
        <CodeBlockHeader className="pb-3">
          <CodeBlockTitle>
            {language ? <ProgrammingLanguageIcon language={language} /> : undefined}
            {fileName}
          </CodeBlockTitle>
          {actions}
        </CodeBlockHeader>
      ) : (
        actions
      )}
      <CodeBlockContext value={true}>
        <CodeBlockContent {...props} ref={contentRef} data-language={language} className="shiki">
          {children}
        </CodeBlockContent>
      </CodeBlockContext>
    </CodeBlock>
  );
}
