/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#FF4D00", // Vibrant Saffron
        secondary: "#FFD700", // Gold
        accent: "#8B0000", // Deep Maroon from logo
        saffron: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          500: "#FF4D00",
        },
        glass: "rgba(255, 255, 255, 0.15)",
      },
      fontFamily: {
        outfit: ["Outfit"],
      },
    },
  },
  plugins: [],
};
