import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc",
        card: "#ffffff",
        primary: "#0f172a",
        accent: "#2563eb",
        muted: "#64748b"
      }
    }
  },
  plugins: []
};

export default config;
