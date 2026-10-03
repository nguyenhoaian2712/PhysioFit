/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepOcean: '#31465A',
        matchaGreen: '#C7DFA3',
        vanillaMilk: '#FFFDF7',
        airyBlue: '#89B9E6',
        frozenAqua: '#D9F0FF',
      },
    },
  },
  plugins: [],
}
