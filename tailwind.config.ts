import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// Saudi Event Management — Tailwind Config
// Theme: Dynamic Luxury Corporate (Variables for Off-White / Dark)
// ─────────────────────────────────────────────────────────────────────────────

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      // ── COLORS ──────────────────────────────────────────────────────────────
      colors: {

        // Core variable mappings (set in globals.css)
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ── Primary Gold Accent ──────────────────────────────────────────────
        gold: {
          50:  "#FAF7F2",
          100: "#F3EFE6",
          200: "#E7DEC9",
          300: "#DBCDAE",
          400: "#C5A880",      // ← MAIN BRAND MUTED GOLD
          500: "#B0926A",      // ← HOVER GOLD
          600: "#9A7E56",
          700: "#7F6642",
          800: "#655032",
          900: "#4A3B24",
          950: "#302516",
        },

        // ── Emerald Green Accent ─────────────────────────────────────────────
        emerald: {
          50:  "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "var(--emerald)",      // ← MAIN EMERALD (#0B4F30)
          900: "var(--emerald-hover)", // ← HOVER EMERALD (#064E3B)
          950: "#022c22",
        },

        // ── Background Surfaces ──────────────────────────────────────────────
        ink: {
          950: "#0B0C10",      // Main background (Deep charcoal)
          900: "#121318",      // Lifted background (Slightly lighter dark gray)
          800: "#181920",      // Main card surface
          700: "#1F2029",      // Hover card surface
          600: "#27272A",      // Main border color
          500: "#18181B",      // Subtle divider color
        },

        // ── Typography Colors ────────────────────────────────────────────────
        sand: {
          50:  "#FAFAFA",            // Primary headings (zinc-50)
          100: "#D4D4D8",            // Body text (zinc-300)
          200: "#A1A1AA",            // Medium text (zinc-400)
          300: "#71717A",            // Muted text (zinc-500)
          400: "#52525B",            // Placeholders (zinc-600)
          500: "#3F3F46",            // Disabled elements (zinc-700)
        },

        // ── Legacy aliases for compatibility ─────────────────────────────────
        charcoal: {
          950: "var(--background)",
          900: "var(--surface-raised)",
          800: "var(--surface)",
          700: "var(--surface-lifted)",
          600: "var(--border)",
          500: "var(--border-subtle)",
          400: "var(--foreground-faint)",
          300: "var(--foreground-muted)",
          200: "var(--foreground-medium)",
          100: "var(--foreground)",
          50:  "var(--heading)",
        },
        primary: {
          DEFAULT: "var(--gold)",
          hover:   "var(--gold-hover)",
          muted:   "var(--gold-muted)",
        },
      },

      // ── TYPOGRAPHY ──────────────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],      // Playfair Display
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],  // DM Sans
        mono:    ["ui-monospace", "SFMono-Regular", "monospace"],
      },

      // ── FONT SIZE SCALE ──────────────────────────────────────────────────────
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],       // 10px — labels
        "xs":  ["0.75rem",  { lineHeight: "1.25rem" }],    // 12px — captions
        "sm":  ["0.875rem", { lineHeight: "1.5rem" }],     // 14px — secondary text
        "base":["1rem",     { lineHeight: "1.75rem" }],    // 16px — body
        "lg":  ["1.125rem", { lineHeight: "1.75rem" }],    // 18px — lead text
        "xl":  ["1.25rem",  { lineHeight: "1.75rem" }],    // 20px — card titles
        "2xl": ["1.5rem",   { lineHeight: "2rem" }],       // 24px — section subtitles
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],    // 30px — section headings
        "4xl": ["2.25rem",  { lineHeight: "2.75rem" }],    // 36px — hero heading MAX
      },

      // ── SPACING ──────────────────────────────────────────────────────────────
      spacing: {
        "section":    "6rem",   // 96px  — between major page sections
        "section-sm": "4rem",   // 64px  — tighter sections
        "section-lg": "8rem",   // 128px — hero / featured sections
      },

      // ── BACKGROUND GRADIENTS ────────────────────────────────────────────────
      backgroundImage: {
        "page-gradient":    "linear-gradient(180deg, var(--background) 0%, var(--surface-raised) 100%)",
        "card-gradient":    "linear-gradient(135deg, var(--surface) 0%, var(--surface-raised) 100%)",
        "gold-shimmer":     "linear-gradient(90deg, var(--gold) 0%, var(--gold-200) 50%, var(--gold) 100%)",
        "gold-border":      "linear-gradient(135deg, rgba(197,168,128,0.3), rgba(197,168,128,0.05))",
        "hero-overlay":     "linear-gradient(to bottom, rgba(248,250,252,0.35) 0%, rgba(248,250,252,0.7) 100%)",
        "fade-up":          "linear-gradient(to top, var(--background), transparent)",
        "fade-down":        "linear-gradient(to bottom, var(--background), transparent)",
      },

      // ── BORDER RADIUS ───────────────────────────────────────────────────────
      borderRadius: {
        "none": "0",
        "sm":   "3px",
        DEFAULT:"4px",
        "md":   "4px",
        "lg":   "8px",
        "xl":   "12px",
        "2xl":  "16px",
        "3xl":  "24px",
        "full": "9999px",
      },

      // ── BOX SHADOWS ─────────────────────────────────────────────────────────
      boxShadow: {
        "card":       "0 1px 3px rgba(15,23,42,0.05), 0 4px 16px rgba(15,23,42,0.03)",
        "card-hover": "0 8px 30px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04)",
        "gold":       "0 0 20px rgba(197,168,128,0.1), 0 0 40px rgba(197,168,128,0.02)",
        "gold-sm":    "0 0 8px rgba(197,168,128,0.15)",
        "inner-gold": "inset 0 0 0 1px rgba(197,168,128,0.15)",
        "none":       "none",
      },

      // ── ANIMATIONS ──────────────────────────────────────────────────────────
      animation: {
        "fade-in":      "fadeIn 0.6s ease-out forwards",
        "fade-up":      "fadeUp 0.7s ease-out forwards",
        "shimmer":      "shimmer 2.5s ease-in-out infinite",
        "marquee":      "marquee 35s linear infinite",
        "marquee-slow": "marquee 55s linear infinite",
        "gold-pulse":   "goldPulse 3s ease-in-out infinite",
        "float":        "float 7s ease-in-out infinite",
      },

      // ── KEYFRAMES ───────────────────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition:  "200% center" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        goldPulse: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(197,168,128,0.1)" },
          "50%":       { boxShadow: "0 0 24px rgba(197,168,128,0.25)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
      },

      // ── CONTAINER ───────────────────────────────────────────────────────────
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          sm:      "2rem",
          md:      "3rem",
          lg:      "4rem",
          xl:      "5rem",
          "2xl":   "6rem",
        },
      },

    },
  },
  plugins: [],
};

export default config;