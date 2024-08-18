/** @type {import('tailwindcss').Config} */
export default {
	content: ['./lib/**/*.{js,ts,jsx,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
	theme: {
		extend: {},
	},
	plugins: [require('flowbite/plugin')],
};
