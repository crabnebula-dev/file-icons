/// <reference lib="es2020" />
interface InitOptions {
    wasm: Response | PromiseLike<Response>;
    icons: string;
}
declare function init(opts: InitOptions): Promise<void>;
declare function getIconForFile(path: string): string;
declare function getIconForFolder(path: string): string;

export { getIconForFile, getIconForFolder, init };
