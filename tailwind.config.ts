import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C46A3A", // Burnt orange
          dark: "#9F532D",
          light: "#E1A07A",
        },
        secondary: {
          DEFAULT: "#1A120E", // Warm espresso
          dark: "#0F0A08",
          light: "#2B1E18",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
}
export default config
