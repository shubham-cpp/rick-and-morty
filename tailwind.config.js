const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', ...defaultTheme.fontFamily.sans],
      serif: ['Merriweather', ...defaultTheme.fontFamily.serif],
      mono: ['Fira Mono', ...defaultTheme.fontFamily.mono]
    },
    extend: {
      colors: {
        primary: '#002137',
        secondary: '#002e4e',
        third: '#003a61',
        light: '#00406c'
      }
    }
  },
  plugins: []
}
