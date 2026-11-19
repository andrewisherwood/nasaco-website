/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["themes/nasaco-theme/layouts/**/*.html"],
  theme: {
    fontFamily: {
      poppins: ["'Poppins', sans-seri"],
      inter: ["'Inter', sans-serif"],
      roboto: ["'Roboto', sans-serif"],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}