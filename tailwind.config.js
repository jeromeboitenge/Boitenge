/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00628B',
          50: '#eff8fb',
          100: '#d8eef5',
          200: '#b5dce9',
          300: '#83c3d8',
          400: '#4aa5c1',
          500: '#1a82a4',
          600: '#00628B',
          700: '#004f70',
          800: '#06415b',
          900: '#0b3549',
          950: '#062434',
        },
        accent: {
          DEFAULT: '#00C9FF',
          hover: '#00A3CC'
        },
        darkBg: '#0f172a',
        darkCard: '#1e293b',
        darkText: '#f8fafc',
        lightBg: '#f8fafc',
        lightCard: '#ffffff',
        lightText: '#0f172a',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-outfit)', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
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
