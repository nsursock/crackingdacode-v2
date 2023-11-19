/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.njk",
    "./src/**/*.md",
  ],
  theme: {
    debugScreens: {
      position: ['bottom', 'right'],
    },
    extend: {
      fontFamily: {
        website: ['Aldrich', 'sans-serif'],
      },
      colors: {
        'gray-850': '#181F2F'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/forms'),
  ],
};

