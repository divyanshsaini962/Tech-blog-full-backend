/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens:{
        sm:"480px",
        md:"760px",
        lg:"1024px",
      },
      colors :{
        primeColor:"#f7aa1d",
        primeColorLight:"#1e3133",
        secondryColor:"#121d1e",
        paragraphColor:"#888",
        whiteColor:"#d3d3d3",
      }
    },
    container:{
      center:true,
      padding:{
        DEFAULT:"1rem",
        sm:"1.5rem"
      }
    }
  },
  plugins: [],
};
