"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { formatYearRange } from "@/lib/utils";

interface TimeStepProps {
  value: { start: number; end: number };
  onChange: (years: { start: number; end: number }) => void;
}

export default function TimeStep({ value, onChange }: TimeStepProps) {
  const currentYear = new Date().getFullYear();
  const minYear = 1900;
  const maxYear = currentYear;

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = parseInt(e.target.value);
    if (newStart <= value.end) {
      onChange({ ...value, start: newStart });
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = parseInt(e.target.value);
    if (newEnd >= value.start) {
      onChange({ ...value, end: newEnd });
    }
  };

  const startPercent = ((value.start - minYear) / (maxYear - minYear)) * 100;
  const endPercent = ((value.end - minYear) / (maxYear - minYear)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <motion.h2
        className="text-2xl font-bold handwritten"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        When's your sweet spot? 📅
      </motion.h2>

      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        {/* Start Year */}
        <motion.div
          className="space-y-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <label className="block text-sm font-semibold handwritten">
            From: {value.start}
          </label>
          <div className="relative">
            <svg
              className="absolute left-0 top-0 w-full h-8 pointer-events-none"
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
            >
              {/* Hand-drawn track */}
              <path
                d="M 0 15 Q 75 10 150 15 T 300 15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-doodle-white opacity-30"
                strokeLinecap="round"
              />
              {/* Track fill */}
              <path
                d={`M 0 15 Q 75 10 ${endPercent * 3} 15`}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-doodle-white"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={value.start}
              onChange={handleStartChange}
              className="relative w-full h-8 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-doodle-white [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-doodle-black [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-doodle-white [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-doodle-black [&::-moz-range-thumb]:cursor-pointer
                z-10"
            />
          </div>
        </motion.div>

        {/* End Year */}
        <motion.div
          className="space-y-3"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          <label className="block text-sm font-semibold handwritten">
            To: {value.end}
          </label>
          <div className="relative">
            <svg
              className="absolute left-0 top-0 w-full h-8 pointer-events-none"
              viewBox="0 0 300 30"
              preserveAspectRatio="none"
            >
              {/* Hand-drawn track */}
              <path
                d="M 0 15 Q 75 10 150 15 T 300 15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-doodle-white opacity-30"
                strokeLinecap="round"
              />
              {/* Track fill */}
              <path
                d={`M 0 15 Q 75 10 ${endPercent * 3} 15`}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-doodle-white"
                strokeLinecap="round"
              />
            </svg>
            <input
              type="range"
              min={minYear}
              max={maxYear}
              value={value.end}
              onChange={handleEndChange}
              className="relative w-full h-8 bg-transparent cursor-pointer appearance-none 
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-doodle-white [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-doodle-black [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 
                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-doodle-white [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-doodle-black [&::-moz-range-thumb]:cursor-pointer
                z-10"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Year range display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="doodle-card bg-doodle-black p-4 border-2 border-doodle-white text-center"
      >
        <p className="text-sm handwritten font-semibold">
          {formatYearRange(value.start, value.end)}
        </p>
        <p className="text-xs opacity-60 mt-1">
          {value.end - value.start + 1} years of vibes
        </p>
      </motion.div>
    </motion.div>
  );
}
