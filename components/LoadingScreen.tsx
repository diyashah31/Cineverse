"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [displayText, setDisplayText] = useState("");
  const fullText = "drawing your recs...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.substring(0, index));
        index++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const doodleVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-doodle-black flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="max-w-md mx-auto px-4 text-center">
        {/* Animated hand drawing */}
        <motion.svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="mx-auto mb-8"
          initial="hidden"
          animate="visible"
        >
          <defs>
            <linearGradient id="drawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Hand */}
          <motion.g
            initial={{ rotate: -45 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
            style={{ originX: "60px", originY: "40px" }}
          >
            <path
              d="M 60 40 L 70 60 L 75 50 L 85 65 L 80 55 L 90 70"
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="60" cy="40" r="8" fill="#ffffff" opacity="0.5" />
          </motion.g>

          {/* Doodle icons being drawn */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Movie reel */}
            <circle cx="100" cy="80" r="20" stroke="url(#drawGradient)" strokeWidth="2" fill="none" />
            <circle cx="100" cy="80" r="12" stroke="url(#drawGradient)" strokeWidth="1.5" fill="none" />
            <circle cx="100" cy="80" r="6" fill="#ffffff" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {/* Popcorn */}
            <circle cx="50" cy="120" r="4" fill="#ffffff" />
            <circle cx="60" cy="115" r="4" fill="#ffffff" />
            <circle cx="70" cy="120" r="4" fill="#ffffff" />
            <circle cx="62" cy="128" r="4" fill="#ffffff" />
            <path d="M 60 100 L 52 124 M 60 100 L 68 124" stroke="#ffffff" strokeWidth="1" opacity="0.5" />
          </motion.g>

          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {/* Clapperboard */}
            <rect x="120" y="110" width="35" height="25" stroke="#ffffff" strokeWidth="2" fill="none" />
            <path d="M 120 110 L 130 100 L 140 110" stroke="#ffffff" strokeWidth="2" fill="none" />
          </motion.g>
        </motion.svg>

        {/* Animated text */}
        <motion.h2
          className="sketch-text text-3xl handwritten mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {displayText}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>
            ✏️
          </motion.span>
        </motion.h2>

        {/* Loading dots */}
        <motion.div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-doodle-white rounded-full"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        <p className="text-xs opacity-40 mt-6 handwritten">
          This might take a moment... vibes are complex 🎨
        </p>
      </div>
    </motion.div>
  );
}
