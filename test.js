import { init, getIconForFile } from './dist/lib.js'

await init({
    icons: './icons',
    wasm: fetch(' file:////Users/crabnejonas/Documents/GitHub/file-icons/dist/file_icons.wasm'),
})

console.log(getIconForFile('test.js'))