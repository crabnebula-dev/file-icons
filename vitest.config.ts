import { defineConfig } from 'vitest/config'
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [topLevelAwait(), wasm()],
    test: {
        browser: {
            provider: 'webdriverio',
            enabled: true,
            headless: true,
            name: 'firefox', // browser name is required
        },
    }
})