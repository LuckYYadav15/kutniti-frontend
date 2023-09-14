module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
         'custom-red' : '#FF0000',
         'custom-orange' : '#FFC100',
         'custom-yellow' :'#FFFF00',
         'custom-yellowishGreen' : '#D6FF00',
         'custom-green' : '#04CE00'
      },
      fontFamily: {
      custom: ['Montserrat', 'sans-serif'],
      boxShadow: {
        'all-sides': '0 0 10px rgba(0, 0, 0, 0.2)', // Customize the shadow here
      },
    },
    
},
  },
  plugins: [],
};
