# create react component library

link to the article is [here](https://medium.com/@mevlutcantuna/building-a-modern-react-component-library-a-guide-with-vite-typescript-and-tailwind-css-862558516b8d)

In this article, I’ll show you how to make a React component library using Vite, TypeScript, and Tailwind CSS. I used pnpm in the example, but you can go with npm or yarn if you prefer.

---

Let’s start by creating a React project with Vite.

```nodejs
pnpm create vite react-component-library --template react-ts
```

```nodejs
pnpm install
```


After creating the project, we will delete unnecessary files like below, because we don’t need to run the project.

- App.tsx
- App.css
- main.tsx
- index.html
- vite-env-d.ts (if you have .env files, you need to keep it.)

I want to rename my ‘src’ directory to ‘lib’ and ensure I have an ‘index.ts’ file in the ‘lib’ directory to export a specific component. Let’s create it in the ‘lib’ directory.

---

Once the files are created and cleaned up, let’s install Tailwind CSS for styling. Follow the instructions below;

```nodejs
pnpm install -D tailwindcss postcss autoprefixer
```

```nodejs
npx tailwindcss init -p
```

Then, change your `tailwind.config.js` file with the below codes.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

And don’t forget to add the Tailwind directives to your ‘index.css’ file. Then, make sure to import the ‘index.css’ file into your ‘index.ts’ file.

For instance, let’s create a ‘Button’ component in `lib/components/Button.tsx`.

```javascript
 const Button = () => {
  return <button className="bg-red-300 text-red-900">Button</button>;
};
export default Button;
```

Then import and export Button.tsx file in the index.ts file.

```javascript
import "./index.css";
import MyButtonComponent from "./components/Button";

export { MyButtonComponent };
```

Now, let’s configure the `package.json` file with the following codes:

```json
{
  "name": "react-component-library",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    },
    "./dist/style.css": "./dist/style.css"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

Then, let’s configure the ‘tsconfig.json’ file with the following codes:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "declaration": true,
    "jsx": "react-jsx",
    "typeRoots": ["./dist/index.d.ts"],
    
    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["lib"],
  "references": [{ "path": "./tsconfig.node.json" }]
} 
```

Finally, let’s set up the `vite.config.js` file. If you’re using TypeScript, make sure to install `vite-plugin-dts` and `@types/node`.

Simply run the following code in your terminal:

```nodejs
pnpm install -D @types/node vite-plugin-dts
```

Next, set up your `vite.config.js` as shown below:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "react-beautiful-timeline",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "tailwindcss"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts({ rollupTypes: true })],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
```

To test your component library, first run npm run build, and npm link in your library's terminal.

Then, create another react project to test the component, and execute npm link your-package-name in the terminal. Now, you can import and use your components and styles like below:

```javascript
import 'react-component-library/dist/style.css';
import { MyButtonComponent } from "react-component-library"
```

For publishing on npm, use the following commands:

If you’re not logged in, make sure to log in to npm first.

```nodejs
npm login
```

```nodejs
npm run build
```

```nodejs
npm publish
```

That’s all! Install your React component package from npm. For more details, refer to the repository linked below.

GitHub Repository: https://github.com/mevlutcantuna/react-beautiful-**timeline**
