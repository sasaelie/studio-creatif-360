/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rose-poudre': '#F4DFE3',
        'ivoire': '#FCFAF8',
        'sauge': '#8DA399',
        'sauge-fonce': '#4E665B',
        'texte-fonce': '#2D2A26',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        manuscrite: ['var(--font-caveat)', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
