# Node.JS Express.JS app in TypeScript

detailed information about how to setup an express.js app in typescript.

## Articles

- [TypeScript Express: Building Robust APIs with Node.js](https://dev.to/wizdomtek/typescript-express-building-robust-apis-with-nodejs-1fln)
- [How to set up TypeScript with Node.js and Express](https://blog.logrocket.com/how-to-set-up-node-typescript-express/)

create a package with following cli.

```nodejs
pnpm init
```

install following dependencies



then add following scripts in `package.json` file.

```json
{
	"scripts": {
		"build": "npx tsc",
		"start": "node dist/index.js",
		"dev": "nodemon src/index.ts",
		"test": "echo \"Error: no test specified\" && exit 1"
	}
}
```

add following code in `tsconfig.json` file

```json
{
	"compilerOptions": {
		"target": "es6",
		"module": "commonjs",
		"outDir": "./dist",
		"strict": true,
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true
	},
	"include": ["src/**/*.ts"],
	"exclude": ["node_modules"]
}
```
