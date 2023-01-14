const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        'animate-pulse': 'pulse 0.1s cubic-bezier(0.4, 0, 0.1, 0.1) infinite',
      }
    },
  },
  plugins: [],
});
