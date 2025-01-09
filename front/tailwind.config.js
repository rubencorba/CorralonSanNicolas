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
    function({ addBase }) {
      addBase({
        /* Ocultar las flechas en navegadores Webkit (Chrome, Safari, Edge) */
        'input[type="number"]::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        /* Ocultar las flechas en Firefox */
        'input[type="number"]': {
          '-moz-appearance': 'textfield',
        },
      });
    },
  ],
}

