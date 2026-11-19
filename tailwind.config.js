/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["themes/nasaco-theme/layouts/**/*.html", "static/js/**/*.js", "content/**/*.md"],
  theme: {
    fontFamily: {
      serif: ["'Source Serif 4'", "Georgia", "'Times New Roman'", "serif"],
      sans: ["'IBM Plex Sans'", "'Helvetica Neue'", "Arial", "sans-serif"],
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#07263D",
          deep: "#041A2B",
          soft: "#1C3D55",
        },
        sulfur: {
          DEFAULT: "#F4B400",
          light: "#FFD24D",
        },
        ink: "#0F2233",
        slate: "#46535E",
        mist: "#EEF2F4",
        rule: "#D3DAE0",
      },
      maxWidth: {
        measure: "68ch",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
