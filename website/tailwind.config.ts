import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#f97316",
          dark: "#ea580c",
          light: "#fb923c",
          50: "#fff7ed", // Warm tint
        },
        gold: {
          DEFAULT: "#f59e0b",
          highlight: "#fbbf24",
          shadow: "#d97706",
        },
        "cosmic-navy": {
          DEFAULT: "#0f172a",
          800: "#1e293b", // Card bg
          900: "#0f172a", // Darker bg
        },
        starlight: {
          DEFAULT: "#ffffff",
          warm: "#fff7ed",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      keyframes: {
        "drift-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(100px, -100px)" },
        },
        "drift-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-100px, -100px)" },
        },
        "drift-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(100px, 100px)" },
        },
        "drift-4": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-100px, 100px)" },
        },
        "drift-5": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(150px, 50px)" },
        },
        "drift-6": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-50px, 150px)" },
        },
        "drift-7": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-150px, -50px)" },
        },
        "drift-8": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(50px, -150px)" },
        },
        "wave": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-circular-1": {
          "0%": { transform: "rotate(0deg) translateX(30px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(30px) rotate(-360deg)" },
        },
        "float-circular-2": {
          "0%": { transform: "rotate(0deg) translateX(40px) rotate(0deg)" },
          "100%": { transform: "rotate(-360deg) translateX(40px) rotate(360deg)" },
        },
        "float-circular-3": {
          "0%": { transform: "rotate(0deg) translateX(20px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(20px) rotate(-360deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "wander-1": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(20vw, 20vh)" },
          "50%": { transform: "translate(40vw, -10vh)" },
          "75%": { transform: "translate(10vw, 40vh)" },
        },
        "wander-2": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-30vw, 15vh)" },
          "50%": { transform: "translate(-10vw, -30vh)" },
          "75%": { transform: "translate(20vw, -10vh)" },
        },
        "wander-3": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(30vw, -20vh)" },
          "50%": { transform: "translate(-20vw, 20vh)" },
          "75%": { transform: "translate(10vw, -30vh)" },
        },
        "wander-4": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-25vw, -25vh)" },
          "50%": { transform: "translate(25vw, 15vh)" },
          "75%": { transform: "translate(-15vw, 25vh)" },
        },
        "wander-5": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(15vw, 35vh)" },
          "50%": { transform: "translate(-35vw, 10vh)" },
          "75%": { transform: "translate(20vw, -20vh)" },
        },
        "wander-6": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-20vw, 30vh)" },
          "50%": { transform: "translate(30vw, -20vh)" },
          "75%": { transform: "translate(-10vw, 10vh)" },
        },
        "wander-7": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(25vw, -15vh)" },
          "50%": { transform: "translate(-15vw, 25vh)" },
          "75%": { transform: "translate(30vw, -30vh)" },
        },
        "wander-8": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-35vw, -10vh)" },
          "50%": { transform: "translate(10vw, 35vh)" },
          "75%": { transform: "translate(-25vw, -15vh)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "float-particle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "nebula-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "gradient-slow": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        "wave-slow": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-15%)" },
        },
        shine: {
          "100%": { transform: "translateX(200%)" },
        }
      },
      animation: {
        shimmer: "shimmer 8s linear infinite",
        "float-up-flame": "float-up-flame 3s ease-in-out infinite",
        "shake-popup": "shake-popup 3s ease-in-out infinite",
        "twinkle": "twinkle 5s ease-in-out infinite",
        "nebula-move": "nebula-move 20s linear infinite",
        "nebula-pulse": "nebula-pulse 10s ease-in-out infinite",
        "orbit": "orbit 10s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-particle": "float-particle 5s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
        "zoom-in": "zoom-in 20s linear infinite",
        "gradient": "gradient-pan 3s ease infinite",
        "shake-call": "shake-call 3s ease-in-out infinite",
        "pulse-ring": "pulse-ring 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "snake-border": "snake-border 4s linear infinite",
        "spin-slow": "spin-slow 4s linear infinite",
        "drift-1": "drift-1 20s ease-in-out infinite",
        "drift-2": "drift-2 25s ease-in-out infinite",
        "drift-3": "drift-3 30s ease-in-out infinite",
        "drift-4": "drift-4 35s ease-in-out infinite",
        "drift-5": "drift-5 40s ease-in-out infinite",
        "drift-6": "drift-6 45s ease-in-out infinite",
        "drift-7": "drift-7 50s ease-in-out infinite",
        "drift-8": "drift-8 55s ease-in-out infinite",
        "wave": "wave 1.5s linear infinite",
        "float-circular-1": "float-circular-1 20s linear infinite",
        "float-circular-2": "float-circular-2 25s linear infinite",
        "float-circular-3": "float-circular-3 30s linear infinite",
        "wander-1": "wander-1 120s ease-in-out infinite",
        "wander-2": "wander-2 130s ease-in-out infinite",
        "wander-3": "wander-3 140s ease-in-out infinite",
        "wander-4": "wander-4 150s ease-in-out infinite",
        "wander-5": "wander-5 160s ease-in-out infinite",
        "wander-6": "wander-6 170s ease-in-out infinite",
        "wander-7": "wander-7 180s ease-in-out infinite",
        "wander-8": "wander-8 190s ease-in-out infinite",
        "shooting-star": "shooting-star 3s linear infinite",
        "gradient-slow": "gradient-slow 15s ease infinite",
        "wave-slow": "wave-slow 10s linear infinite",
        shine: "shine 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;