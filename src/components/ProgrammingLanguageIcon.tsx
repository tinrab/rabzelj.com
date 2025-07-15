import type { IconBaseProps } from "react-icons/lib";
import {
  SiCplusplus,
  SiJson,
  SiPython,
  SiRust,
  SiToml,
  SiTypescript,
  SiYaml,
} from "react-icons/si";

interface ProgrammingLanguageIconProps extends IconBaseProps {
  language: string;
}

export function ProgrammingLanguageIcon({
  language,
  ...props
}: ProgrammingLanguageIconProps) {
  if (language === "text") {
    return;
  }
  if (language === "typescript" || language === "ts" || language === "tsx") {
    return <SiTypescript {...props} />;
  }
  if (language === "rust" || language === "rs") {
    return <SiRust {...props} />;
  }
  if (language === "python" || language === "py") {
    return <SiPython {...props} />;
  }
  if (language === "toml") {
    return <SiToml {...props} />;
  }
  if (language === "json") {
    return <SiJson {...props} />;
  }
  if (language === "yaml" || language === "yml") {
    return <SiYaml {...props} />;
  }
  if (
    language === "h" ||
    language === "c" ||
    language === "hpp" ||
    language === "cpp"
  ) {
    return <SiCplusplus {...props} />;
  }
  throw new Error(`Unknown language: '${language}'`);
}
