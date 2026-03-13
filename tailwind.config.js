/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chillax: ['Chillax', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        britney: ['Britney', 'cursive'],
        greatvibes: ['Great Vibes', 'cursive'],
      },
      animation: {
        'fade-out': 'fadeOut 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-in forwards',
      },
      keyframes: {
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', display: 'none' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
