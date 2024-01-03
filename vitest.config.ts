import { defineConfig } from 'vitest/config'
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [wasm()],
    test: {
        browser: {
            provider: 'webdriverio',
            enabled: true,
            headless: true,
            name: 'firefox', // browser name is required
        },
    }
})