/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.njk",
    "./src/**/*.md",
  ],
  theme: {
    extend: {
      fontFamily: {
        website: ['Aldrich', 'sans-serif'],
      },
      colors: {
        'gray-950': '#080c14',
        'gray-850': '#2b3348'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

