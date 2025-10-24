/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf8f3',
          100: '#faf0e6',
          200: '#f4ddc4',
          300: '#edc89a',
          400: '#e5b071',
          500: '#d4965a',
          600: '#c8823d',
          700: '#a76a32',
          800: '#86552e',
          900: '#6d4727',
        },
        secondary: {
          50: '#fefbf3',
          100: '#fdf6e3',
          200: '#faedc4',
          300: '#f7e09a',
          400: '#f4ce6e',
          500: '#f0b84d',
          600: '#e39d2f',
          700: '#c07c25',
          800: '#996122',
          900: '#7a4f21',
        },
        accent: {
          50: '#fef9f3',
          100: '#fef3e6',
          200: '#fde5c5',
          300: '#fbd49a',
          400: '#f9be6d',
          500: '#f7a84d',
          600: '#f08d2f',
          700: '#d4721f',
          800: '#ae5b1a',
          900: '#8d4a19',
        },
      },
      cursor: {
        'none': 'none',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #f0b84d, 0 0 10px #f0b84d, 0 0 15px #f0b84d' },
          '100%': { boxShadow: '0 0 10px #f0b84d, 0 0 20px #f0b84d, 0 0 30px #f0b84d' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
