/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // for dark mode support
  theme: {
    extend: {
      colors: {
        primary: '#6C63FF',
        accent: '#00C9FF',
        darkText: '#111',
        lightBg: '#F9FAFB',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      
    },
  },
  plugins: [],
};
