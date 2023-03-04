/** @type {import('tailwindcss').Config} */
// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "farmer-working": "url('/State-CEDS-Shawn-Uehira-p29.png')",
      }),
    },
    colors: {
      green: "#1A9432",
      blue: {
        lighter: "#COD8ED",
        default: "#3276AE",
        darker: "#17364F",
      },
      white: "#FFFFFF",
      gray: "#4C4C4C",
    },
  },
  plugins: [],
  mode: "jit",
};
