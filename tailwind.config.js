const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
    },
    themeVariants: ["dark"],
  },
  variants: {
    outline: ["focus", "responsive", "hover"],
    backgroundColor: ["responsive", "hover", "focus", "dark"],
    textColor: ["responsive", "hover", "focus", "dark"],
    borderColor: ["responsive", "dark"],
    borderStyle: ["responsive", "dark"],
  },
  plugins: [
    require("@tailwindcss/custom-forms"),
    require("@tailwindcss/ui"),
    require("@tailwindcss/ui")({
      layout: "sidebar",
    }),
    require("tailwindcss-multi-theme"),
  ],
};
