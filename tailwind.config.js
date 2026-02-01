/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-purple': '#1a0033',
        'navy-blue': '#000428',
        'rose-gold': '#B76E79',
        'gold': '#FFD700',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
        'body': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
