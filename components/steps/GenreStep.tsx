"use client";

import { motion } from "framer-motion";
import {
  ActionIcon,
  RomanceIcon,
  HorrorIcon,
  SciFiIcon,
  ComedyIcon,
  DramaIcon,
} from "../DoodleIcons";

const GENRES = [
  { id: "action", label: "Action", icon: ActionIcon },
  { id: "romance", label: "Romance", icon: RomanceIcon },
  { id: "horror", label: "Horror", icon: HorrorIcon },
  { id: "sci-fi", label: "Sci-Fi", icon: SciFiIcon },
  { id: "comedy", label: "Comedy", icon: ComedyIcon },
  { id: "drama", label: "Drama", icon: DramaIcon },
];

interface GenreStepProps {
  value: string | null;
  onChange: (genre: string) => void;
}

export default function GenreStep({ value, onChange }: GenreStepProps) {
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
        What's the vibe genre? 🎬
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
        {GENRES.map((genre) => {
          const IconComponent = genre.icon;
          const isSelected = value === genre.id;

          return (
            <motion.button
              key={genre.id}
              onClick={() => onChange(genre.id)}
              className={`relative h-32 p-4 doodle-card transition-all group ${
                isSelected ? "doodle-card-active" : ""
              }`}
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
                    ? "bg-doodle-black text-doodle-white"
                    : "bg-doodle-black text-doodle-white hover:opacity-80"
                }`}
              >
                <IconComponent />
                <span className="text-xs font-bold handwritten text-center">
                  {genre.label}
                </span>
              </div>

              {/* Selected indicator */}
              {isSelected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none border-2 border-doodle-white"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-6 h-6 absolute top-2 right-2 text-doodle-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
              )}

              {/* Scribble animation on selection */}
              {isSelected && (
                <motion.svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 200 160"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.5, 0] }}
                  transition={{ duration: 0.8 }}
                >
                  <path
                    d="M 10 50 Q 50 20 90 50 T 170 50"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                </motion.svg>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      {/* Helpful subtitle */}
      {value && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm opacity-60 handwritten text-center"
        >
          Nice! {value} is a solid vibe. Let's dig deeper ➜
        </motion.p>
      )}
    </motion.div>
  );
}
