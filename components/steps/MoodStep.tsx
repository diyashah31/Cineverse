"use client";

import { motion } from "framer-motion";
import {
  HappyIcon,
  CalmIcon,
  ChillIcon,
  MindBlownIcon,
  CoolIcon,
  SadIcon,
} from "../DoodleIcons";
import { getMoodDescription } from "@/lib/utils";

const MOODS = [
  {
    id: "energetic",
    label: "Hyped & Energetic",
    icon: HappyIcon,
  },
  {
    id: "relaxed",
    label: "Chill & Relaxed",
    icon: ChillIcon,
  },
  {
    id: "romantic",
    label: "Lovey-Dovey",
    icon: CalmIcon,
  },
  {
    id: "scary",
    label: "Spooky & Creepy",
    icon: SadIcon,
  },
  {
    id: "intellectual",
    label: "Mind-Bending",
    icon: MindBlownIcon,
  },
  {
    id: "mindblown",
    label: "Sci-Fi & Fantasy",
    icon: CoolIcon,
  },
];

interface MoodStepProps {
  value: string | null;
  onChange: (mood: string) => void;
}

export default function MoodStep({ value, onChange }: MoodStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <motion.h2
        className="text-2xl font-bold handwritten"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        What's your mood rn? 🎭
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.08,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {MOODS.map((mood) => {
          const IconComponent = mood.icon;
          const isSelected = value === mood.id;

          return (
            <motion.button
              key={mood.id}
              onClick={() => onChange(mood.id)}
              className={`relative h-40 p-4 doodle-card transition-all group`}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`h-full flex flex-col items-center justify-center gap-2 transition-all ${
                  isSelected
                    ? "bg-doodle-white text-doodle-black"
                    : "bg-doodle-black text-doodle-white"
                }`}
              >
                <IconComponent />
                <span className="text-xs font-bold handwritten text-center leading-tight">
                  {mood.label}
                </span>
              </div>

              {/* Hand-drawn outline for selected */}
              {isSelected && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <rect
                    x="2"
                    y="2"
                    width="calc(100% - 4px)"
                    height="calc(100% - 4px)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                </motion.svg>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Description card */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="doodle-card bg-doodle-black p-4 border-2 border-doodle-white"
        >
          <p className="text-sm handwritten leading-relaxed text-center">
            {getMoodDescription(value)} ✨
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// Additional icon components for moods
export function CoolIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="fill-none stroke-current stroke-2">
      <circle cx="20" cy="20" r="14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="14" cy="16" r="2" fill="currentColor" />
      <circle cx="26" cy="16" r="2" fill="currentColor" />
      <path d="M 14 28 Q 20 24 26 28" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 10 18 L 6 16 M 30 18 L 34 16" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

export function SadIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="fill-none stroke-current stroke-2">
      <circle cx="20" cy="20" r="14" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="16" r="2" fill="currentColor" />
      <circle cx="25" cy="16" r="2" fill="currentColor" />
      <path d="M 14 28 Q 20 24 26 28" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <path d="M 16 32 L 24 32" strokeLinecap="round" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}
