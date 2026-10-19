import { useState } from "react";

import { Button } from "~/components/ui/button";

export function MdxDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="flex flex-col items-start gap-4 border p-4">
      <h1>Hello, JSX!</h1>
      <Button onClick={() => setCount((value) => value + 1)}>Button</Button>
      <p>{count}</p>
    </div>
  );
}
