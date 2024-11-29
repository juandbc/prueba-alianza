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
        'blue-600': '#2670C9FF'
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
