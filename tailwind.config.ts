import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#020f21",
          900: "#03152e",
          800: "#041E42",
          700: "#062a5c",
          600: "#083675",
        },
        champagne: {
          100: "#fdf8f0",
          200: "#f9edd6",
          300: "#f0d5a3",
          400: "#e7bd70",
          500: "#D4AF37",
        },
        plum: {
          900: "#2D0A2E",
          800: "#3D0E3D",
          700: "#4A154B", // Deep Plum
        },
        sage: {
          100: "#E8EBE8",
          200: "#D1D9D1",
          500: "#8FA28F", // Sage Green
        },
        gray: {
          50: "#F8F9FA",
          100: "#F1F3F5",
          200: "#E9ECEF",
          300: "#DEE2E6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
        "navy-gradient": "linear-gradient(135deg, #041E42, #062a5c, #041E42)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-navy": "pulseNavy 2s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        pulseNavy: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(4, 30, 66, 0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(4, 30, 66, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(4, 30, 66, 0.05)" },
          "100%": { boxShadow: "0 0 40px rgba(4, 30, 66, 0.1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
