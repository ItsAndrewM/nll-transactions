import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	safelist: [
		// Background colors
		"bg-albany",
		"bg-albany-secondary",
		"bg-lasvegas",
		"bg-lasvegas-secondary",
		"bg-sandiego",
		"bg-sandiego-secondary",
		"bg-toronto",
		"bg-toronto-secondary",
		"bg-rochester",
		"bg-rochester-secondary",
		"bg-philadelphia",
		"bg-philadelphia-secondary",
		"bg-calgary",
		"bg-calgary-secondary",
		"bg-colorado",
		"bg-colorado-secondary",
		"bg-saskatchewan",
		"bg-saskatchewan-secondary",
		"bg-buffalo",
		"bg-buffalo-secondary",
		"bg-halifax",
		"bg-halifax-secondary",
		"bg-vancouver",
		"bg-vancouver-secondary",
		"bg-ottawa",
		"bg-ottawa-secondary",
		"bg-georgia",
		"bg-georgia-secondary",
		// Border colors
		"border-albany",
		"border-albany-secondary",
		"border-lasvegas",
		"border-lasvegas-secondary",
		"border-sandiego",
		"border-sandiego-secondary",
		"border-toronto",
		"border-toronto-secondary",
		"border-rochester",
		"border-rochester-secondary",
		"border-philadelphia",
		"border-philadelphia-secondary",
		"border-calgary",
		"border-calgary-secondary",
		"border-colorado",
		"border-colorado-secondary",
		"border-saskatchewan",
		"border-saskatchewan-secondary",
		"border-buffalo",
		"border-buffalo-secondary",
		"border-halifax",
		"border-halifax-secondary",
		"border-vancouver",
		"border-vancouver-secondary",
		"border-ottawa",
		"border-ottawa-secondary",
		"border-georgia",
		"border-georgia-secondary",
		// Border utility
		"border",
		// Text colors
		"text-buffalo",
		"text-buffalo-secondary",
		"text-lasvegas",
		"text-lasvegas-secondary",
		"text-sandiego",
		"text-sandiego-secondary",
		"text-toronto",
		"text-toronto-secondary",
		"text-rochester",
		"text-rochester-secondary",
		"text-philadelphia",
		"text-philadelphia-secondary",
		"text-calgary",
		"text-calgary-secondary",
		"text-colorado",
		"text-colorado-secondary",
		"text-saskatchewan",
		"text-saskatchewan-secondary",
		"text-buffalo",
		"text-buffalo-secondary",
		"text-halifax",
		"text-halifax-secondary",
		"text-vancouver",
		"text-vancouver-secondary",
		"text-ottawa",
		"text-ottawa-secondary",
		"text-georgia",
		"text-georgia-secondary",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				albany: {
					DEFAULT: "hsl(var(--alb-primary))",
					secondary: "hsl(var(--alb-secondary))",
				},
				lasvegas: {
					DEFAULT: "hsl(var(--lv-primary))",
					secondary: "hsl(var(--lv-secondary))",
				},
				sandiego: {
					DEFAULT: "hsl(var(--sd-primary))",
					secondary: "hsl(var(--sd-secondary))",
				},
				toronto: {
					DEFAULT: "hsl(var(--tor-primary))",
					secondary: "hsl(var(--tor-secondary))",
				},
				rochester: {
					DEFAULT: "hsl(var(--roc-primary))",
					secondary: "hsl(var(--roc-secondary))",
				},
				philadelphia: {
					DEFAULT: "hsl(var(--phi-primary))",
					secondary: "hsl(var(--phi-secondary))",
				},
				calgary: {
					DEFAULT: "hsl(var(--cgy-primary))",
					secondary: "hsl(var(--cgy-secondary))",
				},
				colorado: {
					DEFAULT: "hsl(var(--col-primary))",
					secondary: "hsl(var(--col-secondary))",
				},
				saskatchewan: {
					DEFAULT: "hsl(var(--sas-primary))",
					secondary: "hsl(var(--sas-secondary))",
				},
				buffalo: {
					DEFAULT: "hsl(var(--buf-primary))",
					secondary: "hsl(var(--buf-secondary))",
				},
				halifax: {
					DEFAULT: "hsl(var(--hfx-primary))",
					secondary: "hsl(var(--hfx-secondary))",
				},
				vancouver: {
					DEFAULT: "hsl(var(--van-primary))",
					secondary: "hsl(var(--van-secondary))",
				},
				ottawa: {
					DEFAULT: "hsl(var(--obb-primary))",
					secondary: "hsl(var(--obb-secondary))",
				},
				georgia: {
					DEFAULT: "hsl(var(--ga-primary))",
					secondary: "hsl(var(--ga-secondary))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			animation: {
				"pulse-ring":
					"pulse-ring 1.25s cubic-bezier(0.24, 0, 0.38, 1) infinite",
			},
			keyframes: {
				"pulse-ring": {
					"0%": { transform: "scale(0.7)", opacity: "0" },
					"50%": { transform: "scale(1)", opacity: "0.2" },
					"100%": { transform: "scale(1.3)", opacity: "0" },
				},
			},
			fontFamily: {
				adumu: ["Adumu"],
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
