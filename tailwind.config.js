/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#C2262E",
        primaryColorLighter: "#cd6267",
        primaryColorSec: "#270809",
        primaryColorTet: "#74171C",
        grayText: "#636366",
        lightGray: "#C7C7CC",
        extraLightGray: "#48484A",
        darkNeutral: "#1C1C1E",
        grayNeutral: "#E5E5EA",
        gray50: "#AEAEB2",
        gray100: "#F2F2F7",
        gray200: "#8E8E93",
        gray300: "#D1D1D6",
        customGreen: "#228753",
      },
    },
  },
  plugins: [],
};
