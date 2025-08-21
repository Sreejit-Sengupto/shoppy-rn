/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway_400Regular', 'sans-serif'], // Add your font here
        quicksand: ['Quicksand_400Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
