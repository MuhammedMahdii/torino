import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#28A745",
          dark: "#1f8a37",
          light: "#e8f7ec",
        },
        secondary: "#10411B",
        muted: "#282828",
        soft: "#7d7d7d",
        line: "#00000026",
        price: "#009eca",
        danger: "#D32F2F",
      },
      fontFamily: {
        vazir: ["var(--font-vazir)", "Tahoma", "sans-serif"],
      },
      boxShadow: {
        card: "0px 0px 2px 0px rgba(0,0,0,0.25)",
        search: "0px 0px 20px 0px #00000014",
      },
      maxWidth: {
        page: "1440px",
      },
    },
  },
  plugins: [],
};

export default config;
