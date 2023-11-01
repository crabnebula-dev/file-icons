/// <reference lib="esnext" />

import * as _wasm from '../target/wasm32-unknown-unknown/release/file_icons.wasm'

const wasm = _wasm;
let ICON_ROOT;

export async function setCDN(root: string) {
    ICON_ROOT = root.endsWith('/') ? root : root + '/'
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