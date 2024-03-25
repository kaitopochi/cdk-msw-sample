import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        globals: true,
        include: ['src/**/*.(test|spec).ts'],
        root: './',
        environment: 'node',
    },
    resolve: {
        alias: {
            'msw/node': resolve(__dirname, './node_modules/msw/lib/node'),
            msw: resolve(__dirname, './node_modules/msw'),
        },
    },
});
