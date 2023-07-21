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
      },
    },
  },
  plugins: [],
};
