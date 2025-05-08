/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        "hero-image": "url('/src/assets/hero.jpg')",
      },
      colors: {
        themeColor: "#FF3155", // purple color code 9333EA
      },
    },
    screens: {
      xs: "480px", // Small mobile devices
      sm: "640px", // Standard mobile devices
      md: "768px", // Tablets
      lg: "1024px", // Small laptops
      xl: "1280px", // Desktops
      xxl: "1536px", // Large screens
    },
  },
  plugins: [],
}
