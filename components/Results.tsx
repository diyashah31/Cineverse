"use client";

import { motion } from "framer-motion";
import { WatchmodeTitle, QuizState } from "@/lib/types";
import ResultsCard from "./ResultsCard";

interface ResultsProps {
  results: WatchmodeTitle[];
  quizState: QuizState;
  loading: boolean;
}

export default function Results({
  results,
  quizState,
  loading,
}: ResultsProps) {
  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="text-center">
          <motion.div
            className="text-4xl mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✏️
          </motion.div>
          <p className="handwritten text-lg opacity-60">Drawing your recs...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-doodle-black text-doodle-white pt-8 pb-16 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="sketch-text text-3xl sm:text-5xl mb-3">
            Your VibeStream Results ✨
          </h1>
          <p className="text-sm opacity-60 handwritten">
            {results.length} perfect matches for your mood
          </p>
        </motion.div>

        {/* Empty state */}
        {results.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center min-h-96"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="mb-6 opacity-30"
            >
              <circle cx="60" cy="40" r="20" stroke="currentColor" strokeWidth="2" fill="none" />
              <path
                d="M 40 70 L 50 90 L 70 80 L 80 100"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M 20 50 Q 60 30 100 50"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
              />
            </svg>
            <h2 className="text-2xl handwritten font-bold mb-2">
              Hmm, that's off-script...
            </h2>
            <p className="text-sm opacity-60 text-center">
              Try changing your filters or remix your vibe 🎬
            </p>
          </motion.div>
        ) : (
          <>
            {/* Results grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.2,
                  },
                },
              }}
            >
              {results.map((title, idx) => (
                <ResultsCard
                  key={title.id}
                  title={title}
                  index={idx}
                />
              ))}
            </motion.div>

            {/* Footer action */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-xs opacity-40 handwritten">
                Loving these vibes? Save them or remix for more 🎨
              </p>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}
