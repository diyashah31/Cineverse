import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "doodle-black": "#000000",
        "doodle-white": "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        // Use normal sans stack for handwritten to show regular text
        handwritten: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
        4: "4px",
      },
      animation: {
        "draw-in": "drawIn 0.6s ease-out forwards",
        "ink-splash": "inkSplash 0.4s ease-out",
        wobble: "wobble 0.1s ease-in-out infinite",
        "sketch-rotate": "sketchRotate 20s linear infinite",
        "line-draw": "lineDraw 2s ease-in-out infinite",
        bounce2: "bounce2 2s infinite",
        scribble: "scribble 0.8s ease-in-out",
        "page-flip": "pageFlip 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        drawIn: {
          "0%": {
            strokeDasharray: "1000",
            strokeDashoffset: "1000",
            opacity: "0",
          },
          "100%": {
            strokeDasharray: "1000",
            strokeDashoffset: "0",
            opacity: "1",
          },
        },
        inkSplash: {
          "0%": {
            transform: "scale(0.8)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.2)",
            opacity: "0",
          },
        },
        wobble: {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "25%": { transform: "translateX(-1px) translateY(1px)" },
          "50%": { transform: "translateX(1px) translateY(-1px)" },
          "75%": { transform: "translateX(-1px) translateY(-1px)" },
        },
        sketchRotate: {
          "0%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
          "100%": { transform: "rotate(-2deg)" },
        },
        lineDraw: {
          "0%": {
            backgroundPosition: "0 0",
          },
          "100%": {
            backgroundPosition: "100px 100px",
          },
        },
        bounce2: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scribble: {
          "0%": {
            strokeDasharray: "100",
            strokeDashoffset: "100",
          },
          "100%": {
            strokeDasharray: "100",
            strokeDashoffset: "0",
          },
        },
        pageFlip: {
          "0%": {
            transform: "rotateY(90deg) translateX(-50%)",
            opacity: "0",
          },
          "100%": {
            transform: "rotateY(0deg) translateX(0)",
            opacity: "1",
          },
        },
      },
      backgroundImage: {
        doodle: `
          repeating-linear-gradient(
            0deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.02) 35px,
            rgba(255, 255, 255, 0.02) 70px
          ),
          repeating-linear-gradient(
            90deg,
            transparent,
            transparent 35px,
            rgba(255, 255, 255, 0.02) 35px,
            rgba(255, 255, 255, 0.02) 70px
          )
        `,
      },
      strokeWidth: {
        "2.5": "2.5",
      },
    },
  },
  plugins: [],
};

export default config;
