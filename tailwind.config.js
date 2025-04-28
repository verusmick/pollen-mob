/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#49129C",
        secondary: {
          DEFAULT: "#B40086",
          100: "#C51297",
          200: "#831266",
        },
        tertiary: "#EF2967",
      },
      fontFamily: {
        "work-black": ["Rubik-Black", "sans-serif"],
        "work-light": ["Rubik-Light", "sans-serif"],
        "work-medium": ["Rubik-Medium", "sans-serif"],
        "work-regular": ["Rubik-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
