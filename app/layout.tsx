import type { Metadata } from "next";
// @ts-ignore: allow side-effect CSS import without explicit type declarations
import "./globals.css";

export const metadata: Metadata = {
  title: "VibeStream - Movie Recommendations by Mood & Genre",
  description:
    "Movie recommendations by mood, genre, platform, and era. Discover your next favorite series or film.",
  keywords:
    "movies, series, recommendations, streaming, genre, mood, platform",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Patrick+Hand&display=swap"
          rel="stylesheet"
        />
        <style>{`
          * {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M4 4 L4 28 L6 26 L10 32 L12 30 L8 24 L20 24 Q24 24 24 20 L24 4 Z" fill="%23ffffff" stroke="%23000000" stroke-width="1.5"/></svg>') 8 4, auto;
          }
          button:hover,
          a:hover {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M4 4 L4 28 L6 26 L10 32 L12 30 L8 24 L20 24 Q24 24 24 20 L24 4 Z" fill="%23ffffff" stroke="%23000000" stroke-width="2"/></svg>') 8 4, auto;
          }
        `}</style>
      </head>
      <body className="bg-doodle-black text-doodle-white antialiased overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none" style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 50px,
              rgba(255, 255, 255, 0.01) 50px,
              rgba(255, 255, 255, 0.01) 51px
            )
          `,
        }} />
        {children}
        <DoodleCorners />
      </body>
    </html>
  );
}

function DoodleCorners() {
  return (
    <div className="fixed pointer-events-none inset-0 overflow-hidden">
      {/* Top-left corner doodles */}
      <div className="absolute top-4 left-4 opacity-20">
        <svg width="48" height="48" viewBox="0 0 48 48" className="stroke-white fill-none opacity-40">
          <path d="M24 4 L28 12 L20 8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      {/* Top-right corner doodles */}
      <div className="absolute top-8 right-6 opacity-20">
        <svg width="36" height="36" viewBox="0 0 36 36" className="stroke-white fill-none">
          <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
          <circle cx="20" cy="8" r="2" strokeWidth="1.5" />
          <circle cx="16" cy="20" r="2.5" strokeWidth="1.5" />
          <path d="M12 12 L20 8 L16 20" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-left corner doodles */}
      <div className="absolute bottom-8 left-6 opacity-20">
        <svg width="40" height="40" viewBox="0 0 40 40" className="stroke-white fill-none">
          <path
            d="M10 10 Q15 5 20 10 T30 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M10 25 L30 25" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {/* Bottom-right corner doodles */}
      <div className="absolute bottom-4 right-4 opacity-20">
        <svg width="44" height="44" viewBox="0 0 44 44" className="stroke-white fill-none">
          <path d="M8 8 L36 8 L36 36 L8 36 Z" strokeWidth="1.5" />
          <path d="M14 14 L30 14 L30 30 L14 30 Z" strokeWidth="1" />
          <circle cx="22" cy="22" r="4" strokeWidth="1.5" />
        </svg>
      </div>
    </div>
  );
}
