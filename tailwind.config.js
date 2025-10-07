/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        'safe-area-pb': 'env(safe-area-inset-bottom)',
      },
      colors: {
        'primary': '#d6af7f',
        'secondary': '#c69563',
        'ink': '#2c2014',
        'muted-ink': '#6b5b42',
        'secondary-ink': '#8b7355',
        'cream': '#f4e2cc',
        'cream-surface': '#f8e9d1',
        'cream-soft': '#fdf5e6',
        'cream-frost': '#fcf3e4',
        'cream-highlight': '#f9efe2',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      keyframes: {
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        slideInLeft: 'slideInLeft 0.6s ease-out forwards',
        fadeInUp: 'fadeInUp 0.5s ease-out forwards',
      },
      boxShadow: {
        'cream': '0 10px 25px -5px rgba(214, 175, 127, 0.1), 0 10px 10px -5px rgba(214, 175, 127, 0.04)',
      },
    },
  },
  plugins: [],
}