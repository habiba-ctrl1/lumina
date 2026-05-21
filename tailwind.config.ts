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
          50:  "var(--gold-50)",
          100: "var(--gold-100)",
          200: "var(--gold-200)",
          300: "var(--gold-300)",
          400: "var(--gold)",      // ← MAIN BRAND MUTED GOLD (#C5A880)
          500: "var(--gold-hover)",  // ← HOVER GOLD (#B0926A)
          600: "var(--gold-600)",
          700: "var(--gold-700)",
          800: "var(--gold-800)",
          900: "var(--gold-900)",
          950: "var(--gold-950)",
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
          950: "var(--background)",      // Main background (slate-50 #F8FAFC in off-white)
          900: "var(--surface-raised)",  // Lifted background (slate-100 #F1F5F9 in off-white)
          800: "var(--surface)",         // Main card surface (white #FFFFFF in off-white)
          700: "var(--surface-lifted)",  // Hover card surface (slate-200 #E2E8F0 in off-white)
          600: "var(--border)",          // Main border color (slate-200 #E2E8F0 in off-white)
          500: "var(--border-subtle)",   // Subtle divider color (slate-100 #F1F5F9 in off-white)
        },

        // ── Typography Colors ────────────────────────────────────────────────
        sand: {
          50:  "var(--heading)",            // Primary headings (#0F172A slate-900)
          100: "var(--foreground)",         // Body text (#334155 slate-700)
          200: "var(--foreground-medium)",  // Medium text (#475569 slate-600)
          300: "var(--foreground-muted)",   // Muted text (#64748B slate-500)
          400: "var(--foreground-faint)",   // Placeholders (#94A3B8 slate-400)
          500: "var(--foreground-disabled)",// Disabled elements (#CBD5E1 slate-300)
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