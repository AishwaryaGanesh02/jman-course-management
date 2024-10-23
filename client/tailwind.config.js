/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "200px",
      xm: "500px",
      sm: "640px",

      md: "768px",

      lg: "1024px",

      xl: "1280px",

      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          100: "#222831", // Darker shade
          200: "#31363F", // Medium shade
          300: "#76ABAE", // Accent color
        },
        mainbg: "#EEEEEE", // Light shade for text/background
        black: "#000",
        bg: "#f2f2f2",
        textbg: "#f3f3f3",
      },
      spacing: {},
      fontFamily: {
        "open-sans": "'Open Sans'",
        inter: "Inter",
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
