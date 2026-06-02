declare module "*?url" {
  const content: string;
  export default content;
}

declare module "*?arraybuffer" {
  const content: Buffer;
  export default content;
}

declare module "*.wasm" {
  const content: WebAssembly.Module;
  export default content;
}
