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
        charcoal: {
          950: "#050505",
          900: "#0a0a0a",
          800: "#111111",
          700: "#1a1a1a",
          600: "#222222",
        },
        gold: {
          300: "#f0d878",
          400: "#e6c353",
          500: "#D4AF37",
          600: "#b5952f",
          700: "#967a26",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      backgroundImage: {
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
        "gold-gradient": "linear-gradient(135deg, #D4AF37, #f0d878, #D4AF37)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
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
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.4)" },
          "50%": { boxShadow: "0 0 0 15px rgba(212,175,55,0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(212,175,55,0.1)" },
          "100%": { boxShadow: "0 0 40px rgba(212,175,55,0.3)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
