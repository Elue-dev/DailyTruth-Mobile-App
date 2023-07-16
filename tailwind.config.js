/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#C2262E",
        primaryColorSec: "#270809",
        grayText: "#636366",
      },
    },
  },
  plugins: [],
};
