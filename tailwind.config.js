/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './pages/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        brand: '#0d6efd',
        brandDark: '#0b5ed7',
        brandRing: '#7fb6ff'
      }
    }
  },
  plugins: []
};
