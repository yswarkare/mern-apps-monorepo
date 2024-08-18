import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { extname, relative, resolve } from 'path';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
    dts({ include: ['src/**/!(*.spec|*.test).{ts,tsx}'] }),
  ],
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/main.ts'),
			formats: ['es'],
		},
		rollupOptions: {
      plugins: [
				typescriptPaths({
					preserveExtensions: true,
				}),
				typescript({
					sourceMap: false,
					declaration: true,
					outDir: 'dist',
				}),
			],
			input: Object.fromEntries(
				glob
					.sync('src/**/*.{ts,tsx}', {
						ignore: ['src/**/*.d.ts'],
					})
					.map((file) => [
						// The name of the entry point
						// src/nested/foo.ts becomes nested/foo
						relative('src', file.slice(0, file.length - extname(file).length)),
						// The absolute path to the entry file
						// src/nested/foo.ts becomes /project/src/nested/foo.ts
						fileURLToPath(new URL(file, import.meta.url)),
					])
			),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      }
		},
    sourcemap: false,
    emptyOutDir: true,
	},
});
