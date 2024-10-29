/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
    colors:{
        sidebar: '#C7EAC1',
        button: '#96CE8C',
        background: '#F5F5F5',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#000",
        },
      },
    ],
  },
  plugins:  [require("daisyui")],
};
