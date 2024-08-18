# NPM package development with Vite

link to the article is here [&#128279;](https://dev.to/brifiction/npm-package-development-with-vite-4jc6)

## create vite app with vanilla ts template

```node
pnpm create vite app-name
```

## add following code in package.json file

```json
{
	"exports": {
		".": {
			"import": "./dist/main.es.js",
			"require": "./dist/main.cjs.js"
		}
	},
	"main": "./dist/main.cjs.js",
	"module": "./dist/main.es.js",
	"typings": "./dist/main.d.ts",
	"files": ["dist"]
}
```

## install following dev-dependencies

- @rollup/plugin-typescript
- @types/node
- prettier
- rollup-plugin-typescript-paths
- tslib

```nodejs
pnpm add -D @rollup/plugin-typescript @types/node prettier rollup-plugin-typescript-paths tslib
```

## add following code in tsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": false,
    "types": ["vite/client", "node"],
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "jsx": "preserve",
    "baseUrl": "./",
    "paths": {
      "~/*": ["src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

add vite.config.ts file

```ts
import { defineConfig } from "vite";

import typescript from "@rollup/plugin-typescript";
import path from "path";
import { typescriptPaths } from "rollup-plugin-typescript-paths";

export default defineConfig({
  plugins: [],
  resolve: {
    alias: [
      {
        find: "~",
        replacement: path.resolve(__dirname, "./src"),
      },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      fileName: "main",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [],
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          sourceMap: false,
          declaration: true,
          outDir: "dist",
        }),
      ],
    },
  },
});
```

update main.ts file

```typescript
const hello = (name: string) => {
  return `Hello there, ${name}!`;
};

export { hello };
```

## Almost done, some cleaning up

Lastly, let's get rid of files we don't need at this time:

- style.css
- index.html


## Rapid testing (without unit testing)

Looks like our first npm package is ready for testing. But how do we do a quick test, without jest or vitest?

There are two module testing suggestions, using yalc or npm link (yalc is preferred).

We execute `npm` link in our `awesome-vite-module` project.

```nodejs
npm link
```

Then, we are now able to use it, in another project.
