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
        // Main fonts - Whimsical Theme
        fredoka: ['Fredoka', 'sans-serif'],      // PRIMARY: Playful, rounded, perfect for cottage theme
        quicksand: ['Quicksand', 'sans-serif'],   // SECONDARY: Soft, clean, readable
        comfortaa: ['Comfortaa', 'sans-serif'],   // ALTERNATIVE: Geometric rounded
        pacifico: ['Pacifico', 'cursive'],        // DECORATIVE: Hand-drawn script
        britney: ['Britney', 'cursive'],          // OLD: Can keep or remove
      },
      colors: {
        // Whimsical color palette matching cottage illustration
        cottage: {
          sky: '#87CEEB',       // Sky blue
          grass: '#90EE90',     // Light green
          pink: '#FFB6C1',      // Light pink
          coral: '#FF6B7A',     // Coral/salmon
          lavender: '#C9A0DC',  // Soft purple
          cream: '#FFF9F0',     // Warm cream
          peach: '#FFDAB9',     // Peach
        }
      },
      animation: {
        'fade-out': 'fadeOut 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-in forwards',
        'float': 'float 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'whimsy': '0 8px 32px rgba(219, 165, 183, 0.2), 0 2px 8px rgba(201, 160, 220, 0.1)',
        'whimsy-lg': '0 20px 60px rgba(219, 165, 183, 0.3), 0 4px 16px rgba(201, 160, 220, 0.15)',
      },
    },
  },
  plugins: [],
}
