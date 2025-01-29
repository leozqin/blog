/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			primary: "#c0caf5",
			secondary: "#bb9af7",
			tertiary: "#ff007c",
			code: "#8dc6f9" // github dark high contrast
		},
		backgroundColor: {
			primary: "#1a1b26",
			code: "#0a0c10" // github dark high contrast
		}
	},
	plugins: [require('@tailwindcss/typography')],
}
