import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        // generate manifest.json in outDir
        manifest: true,
        rollupOptions: {
          // overwrite default .html entry
          input: '/path/to/main.js',
        },
    },
});
