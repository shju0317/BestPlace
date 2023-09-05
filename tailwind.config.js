/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        primary: "#373E6A",
        secondary: "#699AFE",
        white: "#ffffff",
        black: "#000000",
      },
      fontFamily: {
        'suit': ['SUIT Variable']
      },
    },
  },
  plugins: [],
}

