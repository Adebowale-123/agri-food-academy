/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A6B',
          light: '#2C5499',
          dark: '#142850',
          50: '#EEF3FA',
          100: '#D3E0F5',
          200: '#A7C1EB',
          300: '#7BA2E0',
          400: '#4F83D5',
          500: '#2C5499',
          600: '#1E3A6B',
          700: '#142850',
          800: '#0D1B38',
          900: '#060D1E',
        },
        accent: {
          DEFAULT: '#6B9427',
          light: '#7BAF2E',
          dark: '#507019',
          50: '#F2F7E8',
          100: '#D9EDB0',
        },
        secondary: {
          DEFAULT: '#4A8C2A',
          light: '#5BA834',
        },
        surface: {
          DEFAULT: '#F8F9FC',
          dark: '#EEF2F8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
