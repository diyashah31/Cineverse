"use client";

import { motion } from "framer-motion";

interface PlatformsStepProps {
  value: string[];
  sources: any[];
  onChange: (platforms: string[]) => void;
}

export default function PlatformsStep({
  value,
  sources,
  onChange,
}: PlatformsStepProps) {
  const platformsToShow = sources.slice(0, 6);

  const togglePlatform = (sourceId: string) => {
    if (value.includes(sourceId)) {
      onChange(value.filter((p) => p !== sourceId));
    } else {
      onChange([...value, sourceId]);
    }
  };

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
        Where do you watch? 📺
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.06,
              delayChildren: 0.1,
            },
          },
        }}
      >
        {platformsToShow.map((platform) => {
          const isSelected = value.includes(String(platform.source_id));

          return (
            <motion.button
              key={platform.source_id}
              onClick={() => togglePlatform(String(platform.source_id))}
              className={`relative h-24 p-3 doodle-card transition-all`}
              variants={{
                hidden: { scale: 0.8, opacity: 0 },
                visible: { scale: 1, opacity: 1 },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`h-full flex flex-col items-center justify-center gap-1 transition-all ${
                  isSelected
                    ? "bg-doodle-white text-doodle-black"
                    : "bg-doodle-black text-doodle-white"
                }`}
              >
                <span className="text-xl">📱</span>
                <span className="text-xs font-bold handwritten text-center leading-tight line-clamp-2">
                  {platform.name}
                </span>
              </div>

              {/* Checkmark for selected */}
              {isSelected && (
                <motion.div
                  className="absolute top-1 right-1"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    className="w-5 h-5 text-doodle-black bg-doodle-white rounded-full p-0.5"
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
            </motion.button>
          );
        })}
      </motion.div>

      {/* Selected count */}
      {value.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-sm handwritten opacity-70">
            {value.length} platform{value.length !== 1 ? "s" : ""} selected ✓
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
