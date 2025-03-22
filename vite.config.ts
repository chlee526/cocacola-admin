import react from '@vitejs/plugin-react';
import { defineConfig, UserConfig } from 'vite';
// import mkcert from 'vite-plugin-mkcert';

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
    const isProduction = mode === 'production';

    return {
        base: '/',
        plugins: [react()],
        resolve: {
            alias: [{ find: '@/', replacement: '/src/' }],
        },
        css: {
            modules: {
                localsConvention: 'camelCaseOnly',
            },
        },
        build: {
            outDir: '@dist',
            minify: isProduction,
            sourcemap: !isProduction,
            target: 'esnext',
        },
        // server: {
        //     host: 'fe.cocacola.devel.com',
        //     port: 8701,
        //     open: true,
        // },
    };
});
