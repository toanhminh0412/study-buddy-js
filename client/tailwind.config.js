module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      inset: {
        '76': '19rem'
      },
      spacing: {
        '11/12': '91.6%',
      }, 
      height: {
        '90vh': '90vh',
        '97vh': '97vh',
        '98vh': '98vh',
        '83%': '83%'
      },
      boxShadow: {
        'inner-lg': 'box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.1);'
      }
    },
  },
  plugins: [],
}
