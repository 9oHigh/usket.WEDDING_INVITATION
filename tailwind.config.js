/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'noto-sans-kr': ['"Noto Sans KR"', 'sans-serif'],
        'nanum-myeongjo': ['"Nanum Myeongjo"', 'serif'],
      },
    },
  },
  plugins: [],
};
