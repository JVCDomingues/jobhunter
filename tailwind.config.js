/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        thin: 200,
        normal: 500,
        bold: 700,
        medium: 600,
      },
    },
  },
  plugins: [],
};
