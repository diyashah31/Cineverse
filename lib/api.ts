"use server";

import {
  ApiGenresResponse,
  ApiSourcesResponse,
  ApiTitlesResponse,
  WatchmodeTitle,
} from "./types";

const WATCHMODE_API_KEY = process.env.WATCHMODE_API_KEY || "";
const WATCHMODE_BASE_URL = "https://api.watchmode.com/v1";

// Cache with 1 hour revalidation
const CACHE_DURATION = 3600;

async function fetchFromWatchmode<T>(
  endpoint: string,
  params?: Record<string, string | number>
): Promise<T> {
  const url = new URL(`${WATCHMODE_BASE_URL}${endpoint}`);
  url.searchParams.append("apiKey", WATCHMODE_API_KEY);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: CACHE_DURATION },
    });

    if (!response.ok) {
      throw new Error(`Watchmode API error: ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("Watchmode API error:", error);
    throw error;
  }
}

export async function getGenres(): Promise<any[]> {
  try {
    const data = await fetchFromWatchmode<ApiGenresResponse>("/genres/");
    return data.genres || [];
  } catch (error) {
    console.error("Failed to fetch genres:", error);
    return [];
  }
}

export async function getSources(): Promise<any[]> {
  try {
    const data = await fetchFromWatchmode<ApiSourcesResponse>("/sources/");
    return data.sources && data.sources.length > 0 ? data.sources : DEFAULT_SOURCES;
  } catch (error) {
    console.error("Failed to fetch sources:", error);
    return DEFAULT_SOURCES;
  }
}

export async function getTitlesByFilters(
  genreIds?: number[],
  sourceIds?: number[],
  yearMin?: number,
  yearMax?: number,
  limit = 20
): Promise<WatchmodeTitle[]> {
  try {
    const params: Record<string, string | number> = {
      limit,
      sort_by: "popularity_desc",
    };

    if (genreIds && genreIds.length > 0) {
      params.genre_ids = genreIds.join(",");
    }

    if (sourceIds && sourceIds.length > 0) {
      params.source_ids = sourceIds.join(",");
    }

    if (yearMin) {
      params.year_min = yearMin;
    }

    if (yearMax) {
      params.year_max = yearMax;
    }

    const data = await fetchFromWatchmode<ApiTitlesResponse>(
      "/list-titles/",
      params
    );

    return data.titles || [];
  } catch (error) {
    console.error("Failed to fetch titles:", error);
    return [];
  }
}

// MOOD to GENRE mapping
export const MOOD_TO_GENRES: Record<string, string[]> = {
  energetic: ["action", "adventure", "thriller"],
  romantic: ["romance", "comedy"],
  scary: ["horror"],
  intellectual: ["drama", "documentary"],
  relaxed: ["comedy", "slice-of-life"],
  mindblown: ["sci-fi", "fantasy"],
};

export const GENRE_EMOJIS: Record<string, string> = {
  action: "🎬",
  adventure: "🏆",
  comedy: "😂",
  drama: "🎭",
  horror: "👻",
  romance: "❤️",
  thriller: "🔪",
  "sci-fi": "🚀",
  fantasy: "✨",
  documentary: "📽️",
};

export const MOOD_LABELS: Record<string, string> = {
  energetic: "Hyped & Energetic ⚡",
  romantic: "Lovey-Dovey 💕",
  scary: "Spooky & Creepy 👻",
  intellectual: "Mind-Bending 🧠",
  relaxed: "Chill & Laid Back 🛋️",
  mindblown: "Sci-Fi & Fantasy 🌌",
};

export const PLATFORM_MAP: Record<string, number> = {
  netflix: 203,
  "prime-video": 26,
  hulu: 15,
  disney: 390,
  hbo: 384,
  apple: 371,
};

// Fallback default sources used when Watchmode API is unavailable or returns no data
export const DEFAULT_SOURCES = [
  { source_id: PLATFORM_MAP.netflix, name: "Netflix" },
  { source_id: PLATFORM_MAP["prime-video"], name: "Prime Video" },
  { source_id: PLATFORM_MAP.hulu, name: "Hulu" },
  { source_id: PLATFORM_MAP.disney, name: "Disney+" },
  { source_id: PLATFORM_MAP.hbo, name: "HBO" },
  { source_id: PLATFORM_MAP.apple, name: "Apple TV+" },
];
