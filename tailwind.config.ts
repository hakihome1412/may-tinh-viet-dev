import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "product-card":
          "0 1px 3px -2px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)",
      },
      keyframes: {
        moveDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        loadingLight: {
          "0%": {
            color: "black",
            "text-shadow": "none",
          },
          "90%": {
            color: "black",
            "text-shadow": "none",
          },
          "100%": {
            color: "black",
            "text-shadow": "0 0 7px #FFF900, 0 0 50px #FF6C00",
          },
        },
      },
      animation: {
        "move-down": "moveDown .5s",
        "loading-light": "loadingLight 3s",
      },
      colors: {
        primary: "#0284c7",
      },
      backgroundColor: {
        primary: "#0284c7",
        "primary-hover": "#0098db",
        secondary: "#FBBF03",
        "secondary-hover": "#FCCD45",
      },
      borderColor: {
        primary: "#0284c7",
        "primary-hover": "#0098db",
      },
    },
  },
  plugins: [],
  important: true,
};
export default config;
