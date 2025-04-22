/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // If using Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // If using App Router (Next.js 13+)
  ],
  theme: {
    extend: {
      screens: {
        "xs": "420px", // Extra small
        "3xl": "1600px", // Super large
        "4k": "2560px", // 4K screens
      },
    },
  },
  plugins: [],
};
