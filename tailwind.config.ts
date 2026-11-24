import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#101522", // Ink Navy
          surface: "#171F30", // Deep Surface
          elevated: "#202B40", // Elevated Surface
          border: "#293752", // Border Surface
          borderMuted: "#1E2A40",
          pearl: "#F4F1FF", // Pearl White
          muted: "#AEB8CC", // Muted Text
          coral: "#FF6B72", // Electric Coral
          violet: "#7867FF", // Violet
          cyan: "#39D8E8", // Cyan Accent
        },
        linear: {
          indigo: "#5E6AD2",
          bg: "#08090C",
          surface: "#14151B",
          surfaceHover: "#1C1E26",
          border: "#242632",
          borderLight: "#313545",
          text: "#EEEEF0",
          muted: "#8A8F98",
          urgent: "#EB5757",
          high: "#F2994A",
          medium: "#F2C94C",
          low: "#5E6AD2",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "monospace",
        ],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
        "3xl": "24px",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        pulseGlow: "pulseGlow 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
