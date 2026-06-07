"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WatchmodeTitle } from "@/lib/types";
import { useEffect } from "react";

interface DetailModalProps {
  title: WatchmodeTitle;
  isOpen: boolean;
  onClose: () => void;
}

export default function DetailModal({ title, isOpen, onClose }: DetailModalProps) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-doodle-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 sm:inset-12 top-12 sm:top-20 bottom-12 bg-doodle-black border-4 border-doodle-white text-doodle-white z-50 overflow-y-auto flex flex-col doodle-border"
            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            transition={{ duration: 0.4 }}
          >
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 text-2xl z-10 p-2"
              onClick={onClose}
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 sm:p-8 max-w-4xl mx-auto">
                {/* Header with poster */}
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  {/* Poster */}
                  <motion.div
                    className="flex-shrink-0 w-full sm:w-48 aspect-video sm:aspect-auto border-3 border-doodle-white bg-doodle-black"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    {title.poster_url ? (
                      <img
                        src={title.poster_url}
                        alt={title.title}
                        className="w-full h-full object-cover grayscale"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">
                        🎬
                      </div>
                    )}
                  </motion.div>

                  {/* Info */}
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h1 className="sketch-text text-3xl mb-2">{title.title}</h1>
                    
                    <div className="space-y-2 text-sm opacity-70 handwritten mb-4">
                      <p>Year: {title.year}</p>
                      <p>Type: {title.tmdb_type === "movie" ? "Film" : "Series"}</p>
                      {title.genre_names && title.genre_names.length > 0 && (
                        <p>Genres: {title.genre_names.join(", ")}</p>
                      )}
                    </div>

                    {/* Rating visualization */}
                    <div className="mb-4">
                      <div className="text-xs font-bold mb-2">Community Vibe</div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="w-4 h-4 border-2 border-doodle-white"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                          >
                            {i <= 4 && (
                              <div className="w-full h-full bg-doodle-white" />
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Overview */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="font-bold handwritten text-lg mb-2">The Vibe</h2>
                  <div className="border-2 border-doodle-white p-4 bg-doodle-black">
                    <p className="leading-relaxed text-sm opacity-80">
                      {title.plot_overview}
                    </p>
                  </div>
                </motion.div>

                {/* Platforms */}
                {title.watch_providers && title.watch_providers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <h2 className="font-bold handwritten text-lg mb-3">
                      Watch On 📺
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {title.watch_providers.map((provider, idx) => (
                        <motion.div
                          key={provider.source_id}
                          className="border-2 border-doodle-white p-3 text-center text-xs font-bold handwritten"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.05 }}
                        >
                          {provider.name}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                  className="flex gap-3 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href={`https://imdb.com/title/${title.imdb_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doodle-button text-xs"
                  >
                    IMDb ➜
                  </a>
                  <button
                    onClick={onClose}
                    className="doodle-button text-xs bg-doodle-black text-doodle-white border-doodle-white hover:bg-doodle-white hover:text-doodle-black"
                  >
                    Close ✕
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Doodle decorations */}
            <svg
              className="absolute top-0 left-0 pointer-events-none opacity-10"
              width="100"
              height="100"
            >
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M 50 10 L 50 20 M 50 80 L 50 90" stroke="currentColor" strokeWidth="2" />
            </svg>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
