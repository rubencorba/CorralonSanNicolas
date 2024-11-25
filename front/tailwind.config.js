/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Esto incluye todos los archivos JS, JSX, TS y TSX dentro de 'src'
    ],
  theme: {
    extend: {
      screens: {
        custom: '640px', // Desde 360px en adelante
        mid: '834px',    // Hasta 834px
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

