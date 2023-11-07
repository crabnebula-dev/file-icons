/// <reference lib="esnext" />

// @ts-ignore this path is dynamically defined
import * as _wasm from "file_icons.wasm";

const wasm = _wasm;
let ICON_ROOT;

export function setCDN(root: string) {
  ICON_ROOT = root.endsWith("/") ? root : root + "/";
}

let textEncoder = new TextEncoder();

function lookupIcon(
  path: string,
  fn: (retptr: number, ptr: number, len: number) => void,
): string | null {
  if (!ICON_ROOT) {
    throw new Error("Must call setCDN() before using any functions.");
  }

  const view = new Uint8Array(wasm.memory.buffer, 0, 1024);
  const { written } = textEncoder.encodeInto(path, view);

  const retptr = (view.byteOffset + written | 15) + 1;

  fn(retptr, view.byteOffset, written);

  const tag = new Int32Array(wasm.memory.buffer)[retptr / 4];
  const value = new BigInt64Array(wasm.memory.buffer)[retptr / 8 + 1];

  return tag === 0 ? null : `${ICON_ROOT}${BigInt.asUintN(64, value)}.svg`;
}

/**
 * Returns the URL of the icon for a given file or `null` if no matching icon could be found.
 * You **MUST** call `setCDN` before calling this function with a valid URL to where the icons from this package are hosted.
 */
export function getIconForFile(path: string): string | null {
  return lookupIcon(path, wasm._get_icon_for_file);
}

/**
 * Returns the URL of the icon for a given folder or `null` if no matching icon could be found.
 * You **MUST** call `setCDN` before calling this function with a valid URL to where the icons from this package are hosted.
 */
export function getIconForFolder(path: string): string | null {
  return lookupIcon(path, wasm._get_icon_for_folder);
}
