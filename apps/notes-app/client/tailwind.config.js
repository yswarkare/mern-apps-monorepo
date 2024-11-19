const {customThemes} = require('yw-daisyui')

const themes = ["emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter", "dim", "nord", "sunset",]

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	// daisyUI config (optional - here are the default values)
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			...themes,
			customThemes,
			{
				darkAlt: {
					primary: '#fce7f3',
					'primary-content': '#161314',
					secondary: '#FFDC7F',
					'secondary-content': '#161106',
					accent: '#A0937D',
					'accent-content': '#090805',
					neutral: '#373A40',
					'neutral-content': '#d3d4d5',
					'base-100': '#1E201E',
					'base-200': '#191a19',
					'base-300': '#131513',
					'base-content': '#cdcdcd',
					info: '#0F67B1',
					'info-content': '#d1e0f1',
					success: '#399918',
					'success-content': '#010800',
					warning: '#FFB22C',
					'warning-content': '#160c01',
					error: '#E4003A',
					'error-content': '#ffd8d6',
				},
			},
		], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root', // The element that receives theme color CSS variables
	},
};
