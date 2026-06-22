/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app: "#020712",
        panel: "#071224",
        "panel-alt": "#0B1730",
        edge: "#173056",
        "edge-soft": "rgba(77,145,255,0.18)",
        "edge-cyan": "rgba(77,226,255,0.18)",
        "edge-error": "rgba(251,113,133,0.70)",
        "brand-blue": "#0B6DFF",
        "brand-cyan": "#4DE2FF",
        "text-main": "#F8FAFC",
        "text-muted": "#94A3B8",
      },
      boxShadow: {
        "neon-sm": "0 0 10px rgba(11,109,255,0.12)",
        "neon-md": "0 0 18px rgba(11,109,255,0.16)",
        "neon-lg": "0 0 24px rgba(11,109,255,0.20)",
        "neon-cyan": "0 0 18px rgba(77,226,255,0.16)",
      },
    },
  },
  plugins: [],
};
