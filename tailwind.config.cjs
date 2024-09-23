/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        hierrtheme: {
          primary: "#89E21D",

          "primary-content": "#071200",

          secondary: "#FFFFFF",

          "secondary-content": "#161616",

          accent: "#17364F",

          "accent-content": "#ccd3da",

          neutral: "#001113",

          "neutral-content": "#c4c9ca",

          "base-100": "#4682b4",

          "base-200": "#2a6697",

          "base-300": "#225680",

          "base-content": "#ffffff",

          info: "#f0f0f0",

          "info-content": "#000b14",

          success: "#aef84e",

          "success-content": "#0b1502",

          warning: "#ed7600",

          "warning-content": "#140500",

          error: "#e61635",

          "error-content": "#ffd9d6",
        },
      },
    ],
  },
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
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  mode: "jit",
};
