/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		colors: {
			primary: colors.sky[100],
			secondary: colors.sky[700],
			code: colors.green[700]
		},
		backgroundColor: {
			primary: colors.gray[900],
			code: colors.black
		}
	},
	plugins: [require('@tailwindcss/typography')],
}
