"use client";

import { motion } from "framer-motion";
import { WatchmodeTitle } from "@/lib/types";
import { useState } from "react";
import DetailModal from "./DetailModal";

interface ResultsCardProps {
  title: WatchmodeTitle;
  index: number;
}

export default function ResultsCard({ title, index }: ResultsCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        className="doodle-card overflow-hidden cursor-pointer hover:border-doodle-white transition-all"
        initial={{ opacity: 0, y: 20, rotate: -1 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        whileHover={{ scale: 1.02, rotate: 0.5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 300 }}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Poster and content */}
        <div className="flex flex-col h-full overflow-hidden bg-doodle-black text-doodle-white">
          {/* Poster Image */}
          <div className="relative w-full aspect-video bg-doodle-black border-b-2 border-doodle-white overflow-hidden group">
            {title.poster_url ? (
              <motion.img
                src={title.poster_url}
                alt={title.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                initial={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl opacity-20">
                🎬
              </div>
            )}

            {/* Type badge */}
            <motion.div
              className="absolute top-2 right-2 px-2 py-1 border-2 border-doodle-white text-xs font-bold handwritten bg-doodle-black"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              {title.tmdb_type === "movie" ? "🎦 Film" : "📺 Series"}
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-bold handwritten text-lg line-clamp-2 mb-1">
                {title.title}
              </h3>
              <div className="flex gap-2 text-xs opacity-60 mb-2">
                <span>{title.year}</span>
                {title.genre_names && (
                  <span className="truncate">{title.genre_names[0]}</span>
                )}
              </div>
            </div>

            {/* Overview */}
            <p className="text-xs line-clamp-3 opacity-70 leading-relaxed mb-3">
              {title.plot_overview}
            </p>

            {/* Platforms */}
            {title.watch_providers && title.watch_providers.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {title.watch_providers.slice(0, 3).map((provider) => (
                  <motion.span
                    key={provider.source_id}
                    className="text-xs px-2 py-1 border border-doodle-white rounded-full opacity-70"
                    whileHover={{ opacity: 1 }}
                  >
                    📺 {provider.name}
                  </motion.span>
                ))}
                {title.watch_providers.length > 3 && (
                  <span className="text-xs px-2 py-1 opacity-50">
                    +{title.watch_providers.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* CTA Button */}
          <motion.button
            className="w-full py-2 border-t-2 border-doodle-white text-xs font-bold handwritten uppercase bg-doodle-white text-doodle-black hover:opacity-80 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
          >
            View Details ➜
          </motion.button>
        </div>

        {/* Hand-drawn tilt effect */}
        <svg
          className="absolute -z-10 inset-0 opacity-20 pointer-events-none"
          viewBox="0 0 300 300"
        >
          <rect x="2" y="2" width="296" height="296" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Detail Modal */}
      {isModalOpen && (
        <DetailModal
          title={title}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
