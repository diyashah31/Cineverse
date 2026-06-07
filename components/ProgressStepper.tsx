"use client";

import { motion } from "framer-motion";

interface ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressStepper({
  currentStep,
  totalSteps = 4,
}: ProgressStepperProps) {
  return (
    <div className="relative mb-12 mt-8">
      {/* Doodle path container */}
      <svg
        width="100%"
        height="100"
        viewBox="0 0 1000 100"
        className="mb-2"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Main path line - hand-drawn style */}
        <path
          d="M 50 60 Q 250 20 450 60 T 950 60"
          stroke="url(#pathGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.4"
        />

        {/* Animated progress line */}
        <motion.path
          d="M 50 60 Q 250 20 450 60 T 950 60"
          stroke="#ffffff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: currentStep / totalSteps }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </svg>

      {/* Step circles */}
      <div className="flex justify-between px-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <motion.div
              key={stepNum}
              className="relative flex flex-col items-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Circle */}
              <div
                className={`w-12 h-12 rounded-full border-2.5 flex items-center justify-center transition-all ${
                  isCompleted || isCurrent
                    ? "bg-doodle-white text-doodle-black border-doodle-white"
                    : "bg-doodle-black text-doodle-white border-doodle-white"
                }`}
              >
                {isCompleted ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="text-lg font-bold"
                  >
                    ✓
                  </motion.div>
                ) : (
                  <span className="text-sm font-bold handwritten">
                    {stepNum}
                  </span>
                )}
              </div>

              {/* Scribble fill for completed steps */}
              {isCompleted && (
                <motion.svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    opacity="0.5"
                  />
                  <path
                    d="M 12 24 Q 18 18 24 24 T 36 24"
                    stroke="#ffffff"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.4"
                  />
                </motion.svg>
              )}

              {/* Label */}
              <span className="text-xs mt-2 text-center handwritten font-bold opacity-70 w-20">
                {["Genre", "Mood", "Platforms", "Time"][stepNum - 1]}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
