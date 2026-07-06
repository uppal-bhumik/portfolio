import type { Config } from "tailwindcss";

/**
 * Editorial design system.
 * Each major section owns one of these muted paper palettes:
 * paper (hero/footer), slateblue, terracotta, sage, sand, lavender.
 * `DEFAULT` is the section background; `ink` / `soft` are its text tones;
 * `line` is the hairline border tone for that section.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["var(--font-archivo)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        paper: "#F5F5F5",
        ink: {
          DEFAULT: "#1C1B1A",
          soft: "#57544F",
          faint: "#8A8782",
        },
        line: "rgba(28, 27, 26, 0.14)",

        onyx: {
          DEFAULT: "#6B6760",
          ink: "#F6F4F0",
          soft: "#CFCBC3",
          line: "rgba(246, 244, 240, 0.24)",
        },
        stone: {
          DEFAULT: "#EBE9E5",
          ink: "#1C1B1A",
          soft: "#57544F",
          line: "rgba(28, 27, 26, 0.14)",
        },
        sage: {
          DEFAULT: "#DFE3D8",
          ink: "#333D2E",
          soft: "#616B59",
          line: "rgba(51, 61, 46, 0.18)",
          card: "#E9ECE2",
          deep: "#CFD6C4",
        },
        sand: {
          DEFAULT: "#E9E1D1",
          ink: "#453A26",
          soft: "#75684F",
          line: "rgba(69, 58, 38, 0.18)",
          card: "#F0E9DB",
          deep: "#DDD2BA",
        },
        lavender: {
          DEFAULT: "#E2DFE8",
          ink: "#37324A",
          soft: "#645E78",
          line: "rgba(55, 50, 74, 0.18)",
          card: "#EAE7EF",
          deep: "#D5D1E0",
        },
        cyan: {
          DEFAULT: "#E4F0F1",
          ink: "#1C3234",
          soft: "#4E7578",
          line: "rgba(28, 50, 52, 0.16)",
        },
        charcoal: {
          DEFAULT: "#2E2D2B",
        },
      },
      letterSpacing: {
        meta: "0.14em",
      },
    },
  },
  plugins: [],
};

export default config;
