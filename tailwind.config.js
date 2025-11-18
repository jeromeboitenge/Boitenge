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
      fontSize: {
        xs: '0.8125rem',    // 13px
        sm: '0.9375rem',    // 15px
        base: '1.125rem',   // 18px
        lg: '1.25rem',      // 20px
        xl: '1.375rem',     // 22px
        '2xl': '1.625rem',  // 26px
        '3xl': '1.9375rem', // 31px
        '4xl': '2.3125rem', // 37px
        '5xl': '3.0625rem', // 49px
        '6xl': '3.8125rem', // 61px
      },
    },
  },
  plugins: [],
};
