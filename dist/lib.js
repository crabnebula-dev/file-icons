// src/lib.ts
import * as _wasm from "./file_icons-4DY5MFVA.wasm";
var wasm = _wasm;
var ICON_ROOT;
function setCDN(root) {
  ICON_ROOT = root.endsWith("/") ? root : root + "/";
}
var textEncoder = new TextEncoder();
function lookupIcon(path, fn) {
  if (!wasm)
    throw new Error("Must call init() before using any functions.");
  const view = new Uint8Array(wasm.memory.buffer, 0, 1024);
  const { written } = textEncoder.encodeInto(path, view);
  const retptr = (view.byteOffset + written | 15) + 1;
  fn(retptr, view.byteOffset, written);
  const tag = new Int32Array(wasm.memory.buffer)[retptr / 4];
  const value = new BigInt64Array(wasm.memory.buffer)[retptr / 8 + 1];
  return tag === 0 ? null : `${ICON_ROOT}${BigInt.asUintN(64, value)}.svg`;
}
function getIconForFile(path) {
  return lookupIcon(path, wasm._get_icon_for_file);
}
function getIconForFolder(path) {
  return lookupIcon(path, wasm._get_icon_for_folder);
}
export {
  getIconForFile,
  getIconForFolder,
  setCDN
};
