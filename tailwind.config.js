/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sacromonte-red': '#8B0000',
        'gold': {
          DEFAULT: '#D4AF37',
          100: '#F9F6EB',
          200: '#F3EDD6',
          300: '#EBE1BD',
          400: '#E2D3A1',
          500: '#D4AF37',
          600: '#B8962A',
          700: '#91751E',
          800: '#6E5815',
          900: '#4D3B0B',
        },
        'deep-black': '#0A0A0A',
        'metallic-white': '#F8F9FA'
      },
      screens: {
        'xs': '375px',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
        'mono': ['Fira Code', 'monospace']
      },
      letterSpacing: {
        'wide-3': '0.3em',
        'wide-4': '0.4em',
        'wide-5': '0.5em',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
