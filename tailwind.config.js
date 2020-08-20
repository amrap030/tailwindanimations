const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    linearGradientDirections: {
      // defaults to these values
      t: "to top",
      tr: "to top right",
      r: "to right",
      br: "to bottom right",
      b: "to bottom",
      bl: "to bottom left",
      l: "to left",
      tl: "to top left",
    },
    linearGradientColors: {
      // defaults to {}
      red: "#f00",
      "red-blue": ["hsl(272, 50%, 52%)", "hsl(258, 50%, 52%)"],
      "red-green-blue": ["hsl(258, 50%, 52%)", "hsl(272, 50%, 52%)"],
      "black-white-with-stops": ["#000", "#000 45%", "#fff 55%", "#fff"],
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    themeVariants: ["dark"],
  },
  variants: {
    linearGradients: ["hover", "responsive"],
    outline: ["focus", "responsive", "hover"],
    backgroundColor: ["responsive", "hover", "focus", "dark"],
    textColor: ["responsive", "hover", "focus", "dark"],
    borderColor: ["responsive", "dark"],
    borderStyle: ["responsive", "dark"],
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("tailwindcss-gradients"),
    require("@tailwindcss/ui"),
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
    require("tailwindcss-multi-theme"),
  ],
};
