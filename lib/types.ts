// Watchmode API types
export interface WatchmodeGenre {
  genre_id: number;
  name: string;
}

export interface WatchmodeSource {
  source_id: number;
  name: string;
  type: string;
}

export interface WatchmodeTitle {
  id: number;
  title: string;
  year: number;
  poster_url: string | null;
  imdb_id: string;
  tmdb_id: number;
  tmdb_type: "movie" | "tv";
  genre_names: string[];
  release_date: string;
  plot_overview: string;
  watch_providers: {
    source_id: number;
    name: string;
    type: string;
    logo_url: string;
  }[];
}

// Quiz state
export interface QuizState {
  genre: string | null;
  mood: string | null;
  platforms: string[];
  yearStart: number;
  yearEnd: number;
}

// API response types
export interface ApiGenresResponse {
  genres: WatchmodeGenre[];
}

export interface ApiSourcesResponse {
  sources: WatchmodeSource[];
}

export interface ApiTitlesResponse {
  title_count: number;
  titles: WatchmodeTitle[];
}
