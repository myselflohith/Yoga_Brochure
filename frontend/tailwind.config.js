/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#4C6FBF',
        'blue-light': '#83A2E9'
      }
    },
  },
  plugins: [],
}