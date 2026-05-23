import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#A3A87C',
        background: '#E8DFD0',
        accent: '#E8A948',
        'text-dark': '#3B2F2F',
        'text-light': '#F5F0E8',
        'soft-highlight': '#D5CBBD',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
