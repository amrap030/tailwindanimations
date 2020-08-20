const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.html",
    "./src/**/*.vue",
    "./src/**/*.jsx",
    "./src/App.vue",
    // etc.
  ],
  whitelist: [
    "border-teal-400",
    "border-pink-400",
    "border-blue-400",
    "border-purple-400",
    "border-green-400",
    "border-indigo-400",
    "text-teal-800",
    "text-pink-800",
    "text-blue-800",
    "text-purple-800",
    "text-green-800",
    "text-indigo-800",
    "bg-teal-100",
    "bg-pink-100",
    "bg-blue-100",
    "bg-purple-100",
    "bg-green-100",
    "bg-indigo-100",
  ],

  // This is the function used to extract class names from your templates
  defaultExtractor: (content) => {
    // Capture as liberally as possible, including things like `h-(screen-1.5)`
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];

    // Capture classes within other delimiters like .block(class="w-1/2") in Pug
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];

    return broadMatches.concat(innerMatches);
  },
});

module.exports = {
  plugins: [
    // ...
    require("tailwindcss"),
    require("autoprefixer"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [purgecss]),
    // ...
  ],
};
