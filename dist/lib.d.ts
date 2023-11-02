/// <reference lib="esnext" />
export declare function setCDN(root: string): void;
/**
 * Returns the URL of the icon for a given file or `null` if no matching icon could be found.
 * You **MUST** call `setCDN` before calling this function with a valid URL to where the icons from this package are hosted.
 */
export declare function getIconForFile(path: string): string | null;
/**
 * Returns the URL of the icon for a given folder or `null` if no matching icon could be found.
 * You **MUST** call `setCDN` before calling this function with a valid URL to where the icons from this package are hosted.
 */
export declare function getIconForFolder(path: string): string | null;
