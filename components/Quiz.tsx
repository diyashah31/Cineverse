"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProgressStepper } from "./ProgressStepper";
import GenreStep from "./steps/GenreStep";
import MoodStep from "./steps/MoodStep";
import PlatformsStep from "./steps/PlatformsStep";
import TimeStep from "./steps/TimeStep";
import { QuizState } from "@/lib/types";
import { getSources } from "@/lib/api";

const initialState: QuizState = {
  genre: null,
  mood: null,
  platforms: [],
  yearStart: 1980,
  yearEnd: new Date().getFullYear(),
};

interface QuizProps {
  onComplete: (state: QuizState) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<QuizState>(initialState);
  const [sources, setSources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load platforms on mount
    const loadSources = async () => {
      const data = await getSources();
      setSources(data);
    };
    loadSources();
  }, []);

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Quiz completed
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate loading
    setTimeout(() => {
      onComplete(state);
    }, 600);
  };

  const canContinue = (): boolean => {
    switch (step) {
      case 1:
        return !!state.genre;
      case 2:
        return !!state.mood;
      case 3:
        return state.platforms.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { opacity: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  return (
    <motion.div
      className="min-h-screen bg-doodle-black text-doodle-white pt-8 pb-16 px-4"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <h1 className="sketch-text text-center text-3xl sm:text-5xl mb-2">
            VibeStream
          </h1>
          <p className="text-center text-sm opacity-60">
            What's your mood? Let's find your next obsession ✨
          </p>
        </motion.div>

        {/* Progress Stepper */}
        <motion.div variants={itemVariants}>
          <ProgressStepper currentStep={step} totalSteps={4} />
        </motion.div>

        {/* Content */}
        <motion.div
          className="mt-12 min-h-96"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          key={step}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {step === 1 && (
            <GenreStep
              value={state.genre}
              onChange={(genre) => setState({ ...state, genre })}
            />
          )}
          {step === 2 && (
            <MoodStep
              value={state.mood}
              onChange={(mood) => setState({ ...state, mood })}
            />
          )}
          {step === 3 && (
            <PlatformsStep
              value={state.platforms}
              sources={sources}
              onChange={(platforms) => setState({ ...state, platforms })}
            />
          )}
          {step === 4 && (
            <TimeStep
              value={{ start: state.yearStart, end: state.yearEnd }}
              onChange={(years) =>
                setState({
                  ...state,
                  yearStart: years.start,
                  yearEnd: years.end,
                })
              }
            />
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex gap-4 justify-center mt-12"
          variants={itemVariants}
        >
          <button
            onClick={handlePrev}
            disabled={step === 1}
            className={`doodle-button ${
              step === 1 ? "opacity-30 cursor-not-allowed" : ""
            }`}
          >
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!canContinue() || isLoading}
            className={`doodle-button ${
              !canContinue() || isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading && (
              <span className="inline-block animate-spin mr-2">⧖</span>
            )}
            {step === 4
              ? isLoading
                ? "Drawing..."
                : "Find My Vibe"
              : "Next >>"}
          </button>
        </motion.div>

        {/* Help text */}
        <motion.p className="text-xs text-center mt-6 opacity-40 handwritten">
          Step {step}/4 • Select something to continue 👇
        </motion.p>
      </div>
    </motion.div>
  );
}
