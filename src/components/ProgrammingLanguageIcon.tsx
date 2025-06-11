import type { IconBaseProps } from "react-icons/lib";
import {
  SiCplusplus,
  SiJson,
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
  ...restProps
}: ProgrammingLanguageIconProps) {
  if (language === "text") {
    return;
  }
  if (language === "typescript" || language === "ts" || language === "tsx") {
    return <SiTypescript {...restProps} />;
  }
  if (language === "rust" || language === "rs") {
    return <SiRust {...restProps} />;
  }
  if (language === "toml") {
    return <SiToml {...restProps} />;
  }
  if (language === "json") {
    return <SiJson {...restProps} />;
  }
  if (language === "yaml" || language === "yml") {
    return <SiYaml {...restProps} />;
  }
  if (
    language === "h" ||
    language === "c" ||
    language === "hpp" ||
    language === "cpp"
  ) {
    return <SiCplusplus {...restProps} />;
  }
  throw new Error(`Unknown language: '${language}'`);
}
