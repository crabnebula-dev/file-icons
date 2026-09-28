import { defineConfig } from 'vitest/config'
import { webdriverio } from '@vitest/browser-webdriverio'
import wasm from "vite-plugin-wasm";

export default defineConfig({
    plugins: [wasm()],
    test: {
        browser: {
            provider: webdriverio(),
            enabled: true,
            headless: true,
            instances: [
                { browser: 'firefox' },
            ],
        },
    }
})