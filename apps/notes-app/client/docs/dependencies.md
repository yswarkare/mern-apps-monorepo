# Dependencies

## create a react app with vite

```nodejs
pnpm create vite@latest notes-app
```

## install tailwind css

Install `tailwindcss` and its peer dependencies.

```nodejs
pnpm add -D tailwindcss postcss autoprefixer
```

### create tailwind.config.ts file

generate your `tailwind.config.js` and `postcss.config.js` files.

```nodejs
pnpm dlx tailwindcss init -p
```

### Configure your template paths

Add the paths to all of your template files in your `tailwind.config.js` file.

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Add the Tailwind directives to your CSS

Add the `@tailwind` directives for each of Tailwind’s layers to your `./src/index.css` file.

```css file='index.css'
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install daisyUI as a Node package

```nodejs
pnpm add -D daisyui@latest
```

### Add daisyUI to tailwind.config.js

common.js

```js
module.exports = {
  //...
  plugins: [
    require('daisyui'),
  ],
}
```

ESM

```js
import daisyui from "daisyui"
module.exports = {
  //...
  plugins: [
    daisyui,
  ],
}
```
