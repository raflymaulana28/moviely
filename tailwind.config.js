import { environment } from "./src/configs/environment";
const { primaryColor, backgroundMain } = environment;
module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    screens: {
      md: { max: "767px" },
      sm: { max: "639px" },
    },
    extend: {
      colors: {
        primary: primaryColor,
        "primary-background": backgroundMain,
      },
      flex: {
        slider: "0 0 auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
