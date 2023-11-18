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
        'gray-850': '#181F2F'
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

