/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#222831",  // Darker shade
          200: "#31363F",  // Medium shade
          300: "#76ABAE",  // Accent color
        },
        white: "#EEEEEE", // Light shade for text/background
        black: "#000",
        bg: "#F9F9F9",
        textbg: "#f2f2f3",
        secondary: "#ff9900", // You can keep or change this
        presgreen: "#16978E",
        presred: "#FF095C",
      },
      spacing: {},
      fontFamily: {
        "open-sans": "'Open Sans'",
        inter: "Inter",
        "mystery-quest": "'Mystery Quest'",
      },
      borderRadius: {
        "3xs": "10px",
      },
      boxShadow: {
        "3xl": "-2px 3px 13px 4px rgba(189, 204, 219, 0.5)",
        "4xl": "0 1px 8px 1px rgba(189, 204, 219, 0.5)",
      },
    },
    fontSize: {
      "4xl": "20px",
      "5xl": "24px",
      lgi: "19px",
      "13xl": "32px",
      "7xl": "26px",
      xs: "12px",
      xl: "20px",
      base: "16px",
      "29xl": "48px",
      "10xl": "29px",
      "19xl": "38px",
      "21xl": "40px",
      inherit: "inherit",
    },
  },
  plugins: [],
};
