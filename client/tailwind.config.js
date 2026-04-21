/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1F2E4A",
        gold: "#C8A96A",
        light: "#F5F3EF",
        darkText: "#222222",
        muted: "#A0A0A0",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(to bottom right, #1F2E4A, #2A3F66, #1b1a18)",
      },
    },
  },

  plugins: [],
}
