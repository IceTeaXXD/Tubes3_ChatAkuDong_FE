/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : '#4849A3',
        secondary : '#2c2d63',
        bg : '#F9F9FB',
    },
  },
  plugins: [],
}
}