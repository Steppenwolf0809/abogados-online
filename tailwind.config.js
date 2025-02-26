/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/background-texture.jpg')",
      },
      colors: {
        brand: {
          DEFAULT: '#024089',
          50: '#e6f0f9',
          100: '#cce1f4',
          200: '#99c3e9',
          300: '#66a5de',
          400: '#3387d3',
          500: '#024089',
          600: '#01306a',
          700: '#01204c',
          800: '#00102d',
          900: '#00050f',
        },
        yellow: {
          DEFAULT: '#E7B347',
          50: '#fdf8ef',
          100: '#fbefd8',
          200: '#f5dbb1',
          300: '#efc47d',
          400: '#e7b347',
          500: '#d99b2a',
          600: '#b37a1e',
          700: '#8c5c19',
          800: '#724a19',
          900: '#5f3d18',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      animation: {
        'fadeIn': 'fadeIn 1.2s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'scaleIn': 'scaleIn 0.35s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
