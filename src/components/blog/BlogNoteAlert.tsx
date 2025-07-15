import type React from "react";

import { Alert, AlertDescription } from "~/components/ui/alert";

interface BlogNoteAlertProps extends React.ComponentProps<"div"> {}

export function BlogNoteAlert(props: BlogNoteAlertProps) {
  return (
    <Alert {...props}>
      <AlertDescription>
        These are my notes and thoughts, jotted down for future reference. They
        may be outdated, inaccurate, or completely useless.
      </AlertDescription>
    </Alert>
  );
}
