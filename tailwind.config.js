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
        primary: {
          DEFAULT: '#00628F', // Deep ocean blue from user's image
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          DEFAULT: '#00C9FF',
          hover: '#00A3CC'
        },
        darkBg: '#0f172a', // slate-900
        darkCard: '#1e293b', // slate-800
        darkText: '#f8fafc', // slate-50
        lightBg: '#f8fafc',
        lightCard: '#ffffff',
        lightText: '#0f172a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'blob': {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'blob': 'blob 7s infinite',
      },
    },
  },
  plugins: [],
};
