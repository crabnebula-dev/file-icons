declare module "*.wasm" {
    export const memory: WebAssembly.Memory;
    export function _get_icon_for_file(retptr: number, ptr: number, len: number): void;
    export function _get_icon_for_folder(retptr: number, ptr: number, len: number): void;
}