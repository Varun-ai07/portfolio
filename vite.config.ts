import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev
export default defineConfig({
    // Set base to '/' for a root domain deployment (varun-ai07.github.io)
    base: '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        // Recommended for heavy 3D Spline sites to prevent huge chunks
        chunkSizeWarningLimit: 1000,
    },
    server: {
        port: 3000,
        open: true,
    },
});
