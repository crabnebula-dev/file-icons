declare module "*.wasm" {
  export const memory: WebAssembly.Memory;
  export function _fi(
    retptr: number,
    ptr: number,
    len: number,
  ): void;
  export function _fo(
    retptr: number,
    ptr: number,
    len: number,
  ): void;
}
