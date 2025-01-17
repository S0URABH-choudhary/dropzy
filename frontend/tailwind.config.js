/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-sm': { max: '639px' }, // Screens below 640px
        'max-md': { max: '767px' }, // Screens below 768px
        'max-lg': { max: '1023px' }, // Screens below 1024px
        'max-xl': { max: '1279px' }, // Screens below 1280px
      }
    },
  },
  plugins: [],
}

