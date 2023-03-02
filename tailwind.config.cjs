/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				gray_700: "#0D0D0D",
				gray_600: "#1a1a1a",
				gray_500: "#262626",
				gray_400: "#333333",
				gray_300: "#808080",
				gray_200: "#d9d9d9",
				gray_100: "#f2f2f2",

				purple: "#8284fa",
				purple_dark: "#5e60ce",

				blue: "#4ea8de",
				blue_dark: "#1e6f9f",

				danger: "#e25858",
			},
			fontFamily: {
				Inter: "Inter",
			},
			fontSize: {
				verySmall: "0.75rem",
				small: "0.875rem",
				normal: "1rem",
			},
		},
	},
	plugins: [],
};
