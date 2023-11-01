/// <reference lib="es2020" />
let wasm;
let ICON_ROOT;

interface InitOptions {
    wasm: Response | PromiseLike<Response>,
    icons: string
}

export async function init(opts: InitOptions) {
    ICON_ROOT = opts.icons.endsWith('/') ? opts.icons : opts.icons + '/'

    const { instance } = await WebAssembly.instantiateStreaming(opts.wasm);
    wasm = instance.exports;
}

let textEncoder = new TextEncoder();

function lookupIcon(path: string, fn: (retptr:number, ptr: number, len: number) => void) {
    if (!wasm) throw new Error('Must call init() before using any functions.');

    const view = new Uint8Array(wasm.memory.buffer, 0, 1024);
    const { written } = textEncoder.encodeInto(path, view);

    const retptr = (view.byteOffset + written | 15) + 1;

    fn(retptr, view.byteOffset, written);

    const tag = new Int32Array(wasm.memory.buffer)[retptr / 4];
    const value = new BigInt64Array(wasm.memory.buffer)[retptr / 8 + 1];

    return tag === 0 ? null : `${ICON_ROOT}${BigInt.asUintN(64, value)}.svg`;

}

export function getIconForFile(path: string) {
    return lookupIcon(path, wasm.get_icon_for_file)
}

export function getIconForFolder(path: string) {
    return lookupIcon(path, wasm.get_icon_for_folder)
}