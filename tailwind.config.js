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
    animation: {
      none: "none",
      spin: "spin 1s linear infinite",
      ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
      pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      bounce: "bounce 1s infinite",
    },
    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
      ping: {
        "0%": { transform: "scale(1)", opacity: "1" },
        "75%, 100%": { transform: "scale(2)", opacity: "0" },
      },
      pulse: {
        "0%, 100%": { opacity: "1" },
        "50%": { opacity: ".5" },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateY(-25%)",
          animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
        },
        "50%": {
          transform: "translateY(0)",
          animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
        },
      },
    },
  },
  variants: {
    outline: ["focus", "responsive", "hover"],
    backgroundColor: ["responsive", "hover", "focus", "dark"],
    textColor: ["responsive", "hover", "focus", "dark"],
    borderColor: ["responsive", "dark"],
    borderStyle: ["responsive", "dark"],
    animation: ["responsive"],
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
