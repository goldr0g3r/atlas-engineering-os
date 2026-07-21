import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          bg: "#f6fafb",
          panel: "#ffffff",
          panel2: "#eef5f5",
          accent: "#22b8a7",
          green: "#16a36f",
          amber: "#f59e0b",
          red: "#e84d61",
          ink: "#16202a",
          muted: "#687583",
          line: "#dfe7ec",
        },
      },
      boxShadow: {
        atlas: "0 12px 36px rgba(64,92,109,.08)",
        "atlas-lg": "0 32px 90px rgba(31,60,80,.22)",
      },
      borderRadius: {
        atlas: "24px",
        "atlas-lg": "30px",
      },
    },
  },
  plugins: [],
};

export default config;
