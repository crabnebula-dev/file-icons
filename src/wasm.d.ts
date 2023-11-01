declare module "*.wasm" {
    export const memory: WebAssembly.Memory;
    export function get_icon_for_file(retptr: number, ptr: number, len: number): void;
    export function get_icon_for_folder(retptr: number, ptr: number, len: number): void;
}