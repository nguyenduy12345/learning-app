/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'book-img' : "url(/images/home-img/1426929.webp)"
      },
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}

