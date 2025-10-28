// vite.config.ts

import path from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        include: ['src/**/*.test.ts'],
        globals: true,
        setupFiles: [
            './src/tests/setup.ts',
        ],
        environment: 'jsdom',
    },
})
