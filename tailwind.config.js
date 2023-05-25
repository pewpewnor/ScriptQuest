/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				vt: ["'VT323'"],
				press: ["'Press Start 2P'"],
			},
			colors: {
				lime: "#d9f24f",
				electric: "#4f26e9",
				dark: "#222222",
				clay: "#F2E8DE",
			},
			screens: {
				halfxl: "1475px",
			},
		},
	},
	plugins: [],
};
