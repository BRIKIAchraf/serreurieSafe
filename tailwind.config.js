/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      cursor: {
        'none': 'none',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #ea580c, 0 0 10px #ea580c, 0 0 15px #ea580c' },
          '100%': { boxShadow: '0 0 10px #ea580c, 0 0 20px #ea580c, 0 0 30px #ea580c' },
        },
      },
    },
  },
  plugins: [],
};
