/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        editorial: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      colors: {
        ivory: '#F3F0E9',
        'off-white': '#FBF9F5',
        'soft-black': '#171613',
        terracotta: {
          DEFAULT: '#B65D3A',
          light: '#C97B5A',
          dark: '#9C4A2C',
        },
        'warm-grey': '#88867D',
        sand: '#DED8CD',
        'warm-ink': '#2A2823',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
