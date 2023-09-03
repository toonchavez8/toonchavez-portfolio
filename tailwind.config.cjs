/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx,astro,jsx}",
		"./components/**/*.{ts,tsx,astro,jsx}",
		"./app/**/*.{ts,tsx,astro,jsx}",
		"./src/**/*.{ts,tsx,astro,jsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		mytheme: {
			primary: "#09bc8a",

			secondary: "#3095cc",

			accent: "#a87ffb",

			neutral: "#2a323c",

			"base-100": "#111824",

			info: "#3abff8",

			success: "#36d399",

			warning: "#fbbd23",

			error: "#f87272",
		},
		extend: {
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), require("daisyui")],
};
