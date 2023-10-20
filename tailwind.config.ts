import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "15px",
      },
    },
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#393A47",
      },
      backgroundImage: {
        explosion: 'url("/images/bg-explosion.png")',
        circles: 'url("/images/bg-circles.png")',
        site: 'url("/images/site-bg.svg")',
      },
      fontFamily: {
        roboto: [`var(--font-roboto)`, "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
