const defaultTheme = require(`tailwindcss/defaultTheme`)
module.exports = {
  purge: [`./pages/**/*.tsx`, `./src/**/*.tsx`],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: `transparent`,
        primary: {
          100: `#ecf2f6`,
          200: `#c5d9e4`,
          300: `#9ebfd2`,
          400: `#78a6c0`,
          500: `#518cae`,
          600: `#3f6d87`,
          700: `#2d4e61`,
          800: `#1b2f3a`,
          900: `#091013`,
          DEFAULT: `#518cae`,
        },
        secondary: {
          100: `#fde5ea`,
          200: `#f8b1bf`,
          300: `#f37e95`,
          400: `#ee4a6a`,
          500: `#e91640`,
          600: `#b51132`,
          700: `#810c24`,
          800: `#4d0715`,
          900: `#1a0207`,
          DEFAULT: `#e91640`,
        },
      },
    },
    screens: {
      xs: `475px`,
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
