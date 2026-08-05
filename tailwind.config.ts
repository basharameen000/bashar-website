import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html,css,scss,md}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        emerald: {
          500: "#10b981",
          400: "#34e07a",
          300: "#4ade86",
          200: "#68efc6",
          100: "#a7f3d0",
        },
      },
    },
  },
  plugins: [],
};

export default config;