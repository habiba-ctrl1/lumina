import type { Config } from "tailwindcss";

// ─────────────────────────────────────────────────────────────────────────────
// Saudi Event Management — Tailwind Config
// Theme: Dark Luxury Corporate (Deep Charcoal + Gold)
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

        // CSS variable tokens (set in globals.css)
        background: "var(--background)",
        foreground: "var(--foreground)",

        // ── Primary Gold Accent ──────────────────────────────────────────────
        // Use: borders, highlights, CTA text, decorative lines
        gold: {
          50:  "#FDFBF0",
          100: "#FAF3CC",
          200: "#F4E68A",
          300: "#EDD648",
          400: "#D4AF37",  // ← MAIN BRAND GOLD (use this most)
          500: "#B8962E",
          600: "#997C24",
          700: "#7A621B",
          800: "#5C4813",
          900: "#3D300C",
          950: "#1F1806",
        },

        // ── Background Scale (Dark Luxury) ───────────────────────────────────
        // Use: page bg → section bg → card bg → elevated card
        // Goes from deepest black to slightly lifted surfaces
        ink: {
          950: "#08080C",  // deepest page background
          900: "#0F0F14",  // primary section bg
          800: "#141419",  // card bg
          700: "#1A1A21",  // elevated card / hover state
          600: "#22222B",  // borders, dividers
          500: "#2E2E38",  // subtle dividers
        },

        // ── Text Scale ───────────────────────────────────────────────────────
        // Use: headings → body → muted → disabled
        sand: {
          50:  "#FAFAF7",  // headings (near white, warm tint)
          100: "#F0EFE8",  // primary body text
          200: "#D4D2C8",  // secondary text
          300: "#A8A69A",  // muted / captions
          400: "#706E65",  // placeholder / disabled
          500: "#4A4840",  // very muted
        },

        // ── Status Colors ────────────────────────────────────────────────────
        success: { DEFAULT: "#2D6A4F", light: "#52B788" },
        error:   { DEFAULT: "#9B2226", light: "#E63946" },
        warning: { DEFAULT: "#7F4F24", light: "#E9C46A" },

        // ── Legacy aliases (keep for backwards compat during migration) ──────
        // These point to the new tokens so old class names still work
        charcoal: {
          950: "#08080C",
          900: "#0F0F14",
          800: "#141419",
          700: "#1A1A21",
          600: "#22222B",
          500: "#2E2E38",
          400: "#706E65",
          300: "#A8A69A",
          200: "#D4D2C8",
          100: "#F0EFE8",
          50:  "#FAFAF7",
        },
        primary: {
          DEFAULT: "#D4AF37",
          hover:   "#B8962E",
          muted:   "#7A621B",
        },
      },

      // ── TYPOGRAPHY ──────────────────────────────────────────────────────────
      // Cormorant Garamond = editorial luxury display (headings)
      // DM Sans = clean modern corporate (body, UI)
      // Both loaded via Google Fonts in layout.tsx (see note below)
      //
      // In layout.tsx add:
      //   import { Cormorant_Garamond, DM_Sans } from "next/font/google"
      //   const cormorant = Cormorant_Garamond({ subsets:["latin"], weight:["300","400","500","600"], variable:"--font-display" })
      //   const dmSans = DM_Sans({ subsets:["latin"], weight:["300","400","500","600"], variable:"--font-sans" })
      //
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],      // Cormorant Garamond
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],  // DM Sans
        mono:    ["ui-monospace", "SFMono-Regular", "monospace"],
      },

      // ── FONT SIZE SCALE ──────────────────────────────────────────────────────
      // Corporate-balanced scale. NO text-5xl, text-6xl, text-7xl for headings.
      // text-3xl / text-4xl is the MAXIMUM for any heading on the page.
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],       // 10px — labels
        "xs":  ["0.75rem",  { lineHeight: "1.25rem" }],    // 12px — captions
        "sm":  ["0.875rem", { lineHeight: "1.5rem" }],     // 14px — secondary text
        "base":["1rem",     { lineHeight: "1.75rem" }],    // 16px — body
        "lg":  ["1.125rem", { lineHeight: "1.75rem" }],    // 18px — lead text
        "xl":  ["1.25rem",  { lineHeight: "1.75rem" }],    // 20px — card titles
        "2xl": ["1.5rem",   { lineHeight: "2rem" }],       // 24px — section subtitles
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],    // 30px — section headings ✓
        "4xl": ["2.25rem",  { lineHeight: "2.75rem" }],    // 36px — hero heading MAX ✓
        // ↑ text-4xl is the hard ceiling. Do not use 5xl/6xl/7xl for headings.
      },

      // ── SPACING ──────────────────────────────────────────────────────────────
      // Generous section spacing for luxury breathing room
      spacing: {
        "section":    "6rem",   // 96px  — between major page sections
        "section-sm": "4rem",   // 64px  — tighter sections
        "section-lg": "8rem",   // 128px — hero / featured sections
      },

      // ── BACKGROUND GRADIENTS ────────────────────────────────────────────────
      backgroundImage: {
        // Main page surface
        "page-gradient":    "linear-gradient(180deg, #08080C 0%, #0F0F14 100%)",
        // Card surfaces
        "card-gradient":    "linear-gradient(135deg, #141419 0%, #1A1A21 100%)",
        // Gold shimmer for CTAs / accents
        "gold-shimmer":     "linear-gradient(90deg, #D4AF37 0%, #F4E68A 50%, #D4AF37 100%)",
        // Subtle gold border glow
        "gold-border":      "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05))",
        // Hero overlay (darkens background image for text legibility)
        "hero-overlay":     "linear-gradient(to bottom, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.75) 100%)",
        // Section divider fade
        "fade-up":          "linear-gradient(to top, #08080C, transparent)",
        "fade-down":        "linear-gradient(to bottom, #08080C, transparent)",
      },

      // ── BORDER RADIUS ───────────────────────────────────────────────────────
      borderRadius: {
        "none": "0",
        "sm":   "3px",
        DEFAULT:"6px",
        "md":   "6px",
        "lg":   "10px",
        "xl":   "14px",
        "2xl":  "20px",
        "3xl":  "28px",
        "full": "9999px",
      },

      // ── BOX SHADOWS ─────────────────────────────────────────────────────────
      boxShadow: {
        // Subtle card lift
        "card":       "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
        // Gold glow — use sparingly on CTAs only
        "gold":       "0 0 20px rgba(212,175,55,0.15), 0 0 40px rgba(212,175,55,0.05)",
        "gold-sm":    "0 0 8px rgba(212,175,55,0.2)",
        // Inset border effect
        "inner-gold": "inset 0 0 0 1px rgba(212,175,55,0.2)",
        // None
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
          "0%, 100%": { boxShadow: "0 0 8px rgba(212,175,55,0.15)" },
          "50%":       { boxShadow: "0 0 24px rgba(212,175,55,0.35)" },
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