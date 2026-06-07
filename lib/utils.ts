// Utility functions for animation and styling
export const getSketchBorderStyle = (wobble = false) => ({
  borderWidth: "2.5px",
  borderColor: "#ffffff",
  borderStyle: "solid",
  borderRadius: 0,
  animation: wobble ? "wobble 0.1s ease-in-out" : "none",
});

export const getDoodleBoxShadow = () =>
  "0 0 0 2.5px #ffffff inset, 0 8px 16px rgba(0, 0, 0, 0.3)";

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateRandomDoodle = () => {
  const doodles = [
    '★',// Star
    '✓', // Checkmark
    '→', // Arrow
    '◆', // Diamond
    '⬥', // Circle
  ];
  return doodles[Math.floor(Math.random() * doodles.length)];
};

// Format year range
export const formatYearRange = (from: number, to: number) => {
  if (from === 1900 && to === new Date().getFullYear()) {
    return "Any Year";
  }
  return `${from}–${to}`;
};

// Map mood to description
export const getMoodDescription = (mood: string): string => {
  const descriptions: Record<string, string> = {
    energetic:
      "You need something fast-paced, adrenaline-pumping, and thrilling",
    romantic: "You're in the mood for butterflies and heart-flutter moments",
    scary: "You want to be spooked and on the edge of your seat",
    intellectual: "You're seeking thought-provoking, deep narratives",
    relaxed: "You want something breezy, fun, and low-stress",
    mindblown: "You're ready to have your mind blown by wild worlds",
  };
  return descriptions[mood] || "";
};

// Validate watchmode API key
export const isApiKeyConfigured = () => {
  return !!process.env.WATCHMODE_API_KEY;
};
