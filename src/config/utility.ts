export function makeClientConfigScript<T>(config: T): string {
  return `window.CONFIG = ${JSON.stringify(config)}`;
}

export function extractClientConfig<T>(): T | undefined {
  if (typeof window !== "undefined" && "CONFIG" in window) {
    return window.CONFIG as T;
  }
  return undefined;
}
