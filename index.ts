import { get_file_icon } from "./.build/index.js";
import { get_folder_icon } from "./.build/index.js";

let CDN_ROOT = null;

export function setCDN(root) {
    CDN_ROOT = root.endsWith('/') ? root : root + '/'
}

function iconUrl(icon) {
    if (CDN_ROOT) {
        return `${CDN_ROOT}${icon}.svg`
    } else {
        throw new Error('CDN not set. Must call setCDN() before using any functions.');
    }
}

export function getIconForFile(path) {
  return iconUrl(get_file_icon(path));
}

export function getIconForFolder(path) {
    return iconUrl(get_folder_icon(path));
}