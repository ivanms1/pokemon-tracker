module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: "#33aeaf",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
