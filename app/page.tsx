"use client";

import { useState } from "react";
import { QuizState, WatchmodeTitle } from "@/lib/types";
import Quiz from "@/components/Quiz";
import Results from "@/components/Results";
import LoadingScreen from "@/components/LoadingScreen";
import { getTitlesByFilters } from "@/lib/api";

export default function Home() {
  const [step, setStep] = useState<"quiz" | "loading" | "results">("quiz");
  const [results, setResults] = useState<WatchmodeTitle[]>([]);
  const [quizState, setQuizState] = useState<QuizState | null>(null);

  const handleQuizComplete = async (state: QuizState) => {
    setQuizState(state);
    setStep("loading");

    try {
      // Map mood/genre to Watchmode genre IDs
      const genreIds = getGenreIds(state.genre);

      // Map platforms to source IDs
      const sourceIds = state.platforms.map((p) => parseInt(p));

      // Fetch titles
      const titles = await getTitlesByFilters(
        genreIds,
        sourceIds.length > 0 ? sourceIds : undefined,
        state.yearStart,
        state.yearEnd,
        30
      );

      setResults(titles);
      setStep("results");
    } catch (error) {
      console.error("Error fetching results:", error);
      setStep("results");
    }
  };

  const handleRetakeQuiz = () => {
    setStep("quiz");
    setResults([]);
    setQuizState(null);
  };

  // Map genre names to Watchmode IDs
  const getGenreIds = (genre: string | null): number[] => {
    const genreMap: Record<string, number[]> = {
      action: [1, 28],
      romance: [10749, 35],
      horror: [27],
      "sci-fi": [878],
      comedy: [35],
      drama: [18],
    };
    return genre ? genreMap[genre] || [] : [];
  };

  return (
    <div className="w-full min-h-screen bg-doodle-black">
      {step === "quiz" && <Quiz onComplete={handleQuizComplete} />}

      {step === "loading" && <LoadingScreen />}

      {step === "results" && quizState && (
        <Results
          results={results}
          quizState={quizState}
          loading={false}
        />
      )}

      {/* Floating retake button in results */}
      {step === "results" && (
        <button
          onClick={handleRetakeQuiz}
          className="fixed bottom-6 right-6 doodle-button text-xs z-10"
          title="Start a new vibe search"
        >
          New Vibe ✏️
        </button>
      )}
    </div>
  );
}
