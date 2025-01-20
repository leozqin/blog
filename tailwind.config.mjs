/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			primary: colors.sky[100],
			secondary: colors.sky[400],
			code: "#8dc6f9" // github dark high contrast
		},
		backgroundColor: {
			primary: colors.gray[900],
			code: "#0a0c10" // github dark high contrast
		}
	},
	plugins: [require('@tailwindcss/typography')],
}
