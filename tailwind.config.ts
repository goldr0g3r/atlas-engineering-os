import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#08111f",
          panel: "#101b2d",
          panel2: "#162238",
          accent: "#38bdf8",
          green: "#22c55e",
          amber: "#f59e0b",
          red: "#ef4444"
        }
      }
    }
  },
  plugins: []
};

export default config;
