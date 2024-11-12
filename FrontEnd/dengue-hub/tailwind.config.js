/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './pages/**/*.{js,ts,jsx,tsx}', 
    './components/**/*.{js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js",
    "./src/**/*.html', './node_modules/flowbite/**/*.js",
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
          primary: "#000000",
          neutral: "#C7EAC1",
          secondary: "#96CE8C",
          accent: "#CAC4D0",
        },
      },
    ],
  },
  plugins:  [require("daisyui"),
             require('flowbite/plugin')]
};
