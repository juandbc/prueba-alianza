/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/main/webapp/**/*.{html,ts}"],
  safelist: [
    'underline',
    'bg-gray-100'
  ],
  theme: {
    extend: {
      backgroundColor: {
        'blue-600': '#0088cc',
        'yellow-600': '#d2d654'
      },
      fontWeight: {
        'normal': '700',
        'medium': '700'
      }
    },
    container: {
      center: true,
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}
