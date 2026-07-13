/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        maroon: {
          50: "#fbeef1",
          100: "#f5d7de",
          200: "#e9aebd",
          300: "#d97e97",
          400: "#c14f70",
          500: "#a13253",
          600: "#822643",
          700: "#6b1f38",
          800: "#551a2d",
          900: "#3f1421",
        },
        blush: {
          50: "#fffbf9",
          100: "#fdf1f3",
          200: "#fbe3e8",
          300: "#f6d0d8",
        },
        cream: "#fffaf6",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 20px rgba(107, 31, 56, 0.08)",
        cardHover: "0 10px 30px rgba(107, 31, 56, 0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
