/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "375px", //mobile M
        md: "768px", //tablet
        lg: "1024px", //laptop
        xl: "1280px", //laptop L
        "2xl": "2560px", //4k
      },

      backgroundImage: (theme) => ({
        "farmer-working": "url('/State-CEDS-Shawn-Uehira-p29.png')",
        spectrum:
          "linear-gradient(orange, transparent),  linear-gradient(to top left, cyan, transparent), linear-gradient(to top right, purple, transparent)",
        spectrum2:
          "linear-gradient(  steelBlue, black,  transparent), linear-gradient(to bottom left, cyan, transparent), linear-gradient(to top right, plum, transparent)",
      }),
      backgroundSize: {
        bgBig: "100% 110%",
      },
      animation: {
        "slide-in": "slide-in 0.7s ease-out",
      },
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateY(100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 100 },
        },
      },
    },
    colors: {
      green: "#1A9432",
      lightGreen: "#1FCE1F",
      yellowGreen: "#89E21D",
      blue: {
        lighter: "#COD8ED",
        default: "#3276AE",
        darker: "#17364F",
      },
      white: "#FFFFFF",
      gray: "#4C4C4C",
      red: "#F52020",
    },
  },
  plugins: [require("@tailwindcss/forms")],
  mode: "jit",
};
