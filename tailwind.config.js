/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        arini: {
          blue: {
            DEFAULT: "#1f3355",
            50: "#f5f8fb",
            100: "#d0dced",
            200: "#9bb0c9",
          },
          accent: "#59a2f4",
        },
      },
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        inter: ["var(--font-inter)"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'hero-pattern': "url('/images/noise-transparent.png')",
        'gradient-blue': 'linear-gradient(180deg, rgba(208, 220, 237, 0) 0%, rgba(208, 220, 237, 1) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
