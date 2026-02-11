import {
  IconBrandCpp,
  IconBrandPython,
  IconBrandRust,
  IconBrandTypescript,
  IconJson,
  IconToml,
} from "@tabler/icons-react";

interface ProgrammingLanguageIconProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  language: string;
}

export function ProgrammingLanguageIcon({ language, ...props }: ProgrammingLanguageIconProps) {
  if (language === "text") {
    return;
  }
  if (language === "typescript" || language === "ts" || language === "tsx") {
    return <IconBrandTypescript {...props} />;
  }
  if (language === "rust" || language === "rs") {
    return <IconBrandRust {...props} />;
  }
  if (language === "python" || language === "py") {
    return <IconBrandPython {...props} />;
  }
  if (language === "toml") {
    return <IconToml {...props} />;
  }
  if (language === "json") {
    return <IconJson {...props} />;
  }
  if (language === "yaml" || language === "yml") {
    return <IconYaml {...props} />;
  }
  if (language === "h" || language === "c" || language === "hpp" || language === "cpp") {
    return <IconBrandCpp {...props} />;
  }
  throw new Error(`Unknown language: '${language}'`);
}

interface IconYamlProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

export function IconYaml({ ...props }: IconYamlProps) {
  return (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <title>YAML</title>
      <path d="m0 .97 4.111 6.453v4.09h2.638v-4.09L11.053.969H8.214L5.58 5.125 2.965.969Zm12.093.024-4.47 10.544h2.114l.97-2.345h4.775l.804 2.345h2.26L14.255.994Zm1.133 2.225 1.463 3.87h-3.096zm3.06 9.475v10.29H24v-2.199h-5.454v-8.091zm-12.175.002v10.335h2.217v-7.129l2.32 4.792h1.746l2.4-4.96v7.295h2.127V12.696h-2.904L9.44 17.37l-2.455-4.674Z" />
    </svg>
  );
}
