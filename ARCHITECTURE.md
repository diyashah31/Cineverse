# VibeStream - App Architecture & Flow 🎬

## Application Flow Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                           VIBESTREAM APP                              │
│                    (Entry Point: app/page.tsx)                        │
└──────────────────────────────────────────────────────────────────────┘

                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
              STEP 1: QUIZ    STEP 2: QUIZ    STEP 3: QUIZ
              Genre Selection  Mood Selection  Platform Selection
                    │               │               │
                    └───────────────┼───────────────┘
                                    │
                                    ▼
                            STEP 4: QUIZ
                        Time Period Slider
                                    │
                                    ▼
                        ┌─────────────────────┐
                        │  Quiz Complete!     │
                        │  Loading Screen     │
                        └─────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │  Watchmode API Request        │
                    │  [Server Action - Secure]     │
                    └───────────────────────────────┘
                                    │
                 ┌──────────────────┴──────────────────┐
                 │   Build Filter Parameters:          │
                 ├─ Genre IDs from selection
                 ├─ Platform/Source IDs
                 ├─ Year range (start → end)
                 └─ Limit: 30 results, sort by popularity
                 
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │  Call Watchmode API:         │
                    │  /list-titles/ endpoint      │
                    │  [Cached 1 hour]             │
                    └──────────────────────────────┘
                                    │
                                    ▼
                    ┌──────────────────────────────┐
                    │  Parse & Normalize Results:  │
                    │  - Filter movies/series      │
                    │  - Extract poster URLs       │
                    │  - Get platform info         │
                    │  - Prepare for display       │
                    └──────────────────────────────┘
                                    │
                                    ▼
                        ┌─────────────────────┐
                        │ Results Component   │
                        │ Display 20-30 recs  │
                        └─────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
            Click Card             Click "New Vibe"
                    │                               │
                    ▼                               │
         ┌──────────────────┐                       │
         │ DetailModal      │                       │
         │ - Full info      │                       │
         │ - All platforms  │                       │
         │ - IMDb link      │                       │
         │ - Close button   │                       │
         └──────────────────┘                       │
                    │                               │
                    └───────────────┬───────────────┘
                                    │
                          ┌─────────▼─────────┐
                          │  Back to Quiz     │
                          │  (Start over)     │
                          └───────────────────┘
```

## Component Hierarchy

```
App (app/page.tsx)
│
├─ Quiz Component
│  ├─ ProgressStepper
│  │  ├─ Progress line SVG
│  │  └─ Step circles (animated)
│  │
│  └─ Step Components
│     ├─ GenreStep
│     │  └─ Genre Chips (6)
│     │     └─ DoodleIcons (Action, Romance, Horror, etc)
│     │
│     ├─ MoodStep
│     │  └─ Mood Cards (6)
│     │     └─ DoodleIcons (Happy, Chill, etc)
│     │
│     ├─ PlatformsStep
│     │  └─ Platform Cards (6)
│     │
│     └─ TimeStep
│        ├─ Start Year Slider
│        └─ End Year Slider
│
├─ LoadingScreen
│  ├─ Animated drawing SVG
│  ├─ Typing text animation
│  └─ Loading dots
│
└─ Results Component
   ├─ Results Header
   └─ Results Grid
      └─ ResultsCard (x20-30)
         ├─ Poster image
         ├─ Movie info
         ├─ Platforms badges
         └─ Click → DetailModal
            ├─ Full details
            ├─ All platforms
            ├─ IMDb link
            └─ Close button
```

## Data Flow

```
┌─────────────────────────────────────────┐
│       Quiz State (quizState)             │
│  {                                       │
│    genre: "action",        ◄─────┐      │
│    mood: "energetic",      ◄─────┤      │
│    platforms: ["203"],     ◄─────┤      │
│    yearStart: 2015,        ◄─────┤      │
│    yearEnd: 2024           ◄─────┤      │
│  }                                │      │
└─────────────────────────────────────────┘
                    │
                    │ onChange handlers
                    │ in each step
                    │
                    ▼
        ┌─────────────────────────┐
        │   Quiz.tsx              │
        │   Manages state changes  │
        │   Validates progress     │
        │   Orchestrates flow      │
        └─────────────────────────┘
                    │
                    │ onComplete(quizState)
                    │
                    ▼
        ┌─────────────────────────────┐
        │   page.tsx                   │
        │   Calls getTitlesByFilters   │
        │   with quiz parameters       │
        └─────────────────────────────┘
                    │
                    │ Server Action
                    │ (secure, on server)
                    │
                    ▼
        ┌─────────────────────────────┐
        │   lib/api.ts                │
        │   getTitlesByFilters()      │
        │   - Authenticates with API  │
        │   - Builds query params      │
        │   - Calls /list-titles/     │
        │   - Normalizes response      │
        │   - Returns WatchmodeTitle[]│
        └─────────────────────────────┘
                    │
                    │ API Response
                    │ (cached 1 hour)
                    │
                    ▼
        ┌─────────────────────────────┐
        │   Results Component          │
        │   Displays 20-30 cards       │
        │   Each card clickable        │
        └─────────────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
    Click Card          Click "New Vibe"
         │                     │
         ▼                     ▼
   DetailModal           Reset to Quiz
   DetailModal.tsx
   - Receives single
     WatchmodeTitle
   - Displays all info
   - Provides IMDb link
```

## API Request Flow

```
┌──────────────────────────────────────────────────────────────┐
│             CLIENT SIDE (React Component)                    │
│                                                               │
│  handleQuizComplete(quizState) {                             │
│    setStep("loading");                                       │
│    getTitlesByFilters(genreIds, sourceIds, year, limit);    │
│  }                                                            │
└──────────────────────────────────────────────────────────────┘
                          │
                    Server Action
                    (across network)
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│            SERVER SIDE (Node.js Backend)                     │
│                                                               │
│  "use server"                                                │
│  getTitlesByFilters(genreIds, sourceIds, yearMin, yearMax) │
│  {                                                            │
│    // Build Watchmode URL                                    │
│    url.searchParams.append("apiKey", WATCHMODE_API_KEY);   │
│    url.searchParams.append("genre_ids", "1,28");           │
│    url.searchParams.append("source_ids", "203");           │
│    url.searchParams.append("year_min", "2015");            │
│    url.searchParams.append("year_max", "2024");            │
│    url.searchParams.append("limit", "30");                 │
│                                                               │
│    // Call Watchmode API                                     │
│    fetch(url, { next: { revalidate: 3600 } })             │
│                                                               │
│    // Return results to client                              │
│    return data.titles;                                      │
│  }                                                            │
└──────────────────────────────────────────────────────────────┘
                          │
                    Response back
                          │
                          ▼
┌──────────────────────────────────────────────────────────────┐
│             CLIENT SIDE (React Component)                    │
│                                                               │
│  const results = await getTitlesByFilters(...);             │
│  setResults(results);  // Update state with 20-30 titles    │
│  setStep("results");   // Show results component             │
├──────────────────────────────────────────────────────────────┤
│  Results Component renders:                                  │
│  - Title 1 [Card] [Card] [Card]                             │
│  - Title 2 [Card] [Card] [Card]                             │
│  - Title 3 [Card] [Card] [Card]                             │
│  - ... (20-30 total)                                        │
└──────────────────────────────────────────────────────────────┘
```

## File Dependencies

```
app/page.tsx
│
├─ lib/api.ts
│  ├─ lib/types.ts
│  └─ lib/utils.ts
│
├─ components/Quiz.tsx
│  ├─ components/ProgressStepper.tsx
│  ├─ components/steps/GenreStep.tsx
│  │  └─ components/DoodleIcons.tsx
│  ├─ components/steps/MoodStep.tsx
│  │  └─ components/DoodleIcons.tsx
│  ├─ components/steps/PlatformsStep.tsx
│  └─ components/steps/TimeStep.tsx
│
├─ components/LoadingScreen.tsx
│
├─ components/Results.tsx
│  └─ components/ResultsCard.tsx
│     └─ components/DetailModal.tsx
│
└─ app/globals.css
   └─ tailwind.config.ts
```

## State Management

```
App Level State (app/page.tsx):
  ├─ step: "quiz" | "loading" | "results"
  ├─ results: WatchmodeTitle[]
  └─ quizState: QuizState

Quiz Component State (components/Quiz.tsx):
  ├─ step: 1 | 2 | 3 | 4 (quiz steps)
  ├─ state: QuizState (genre, mood, platforms, years)
  ├─ sources: WatchmodeSource[] (for platform selection)
  └─ isLoading: boolean

DetailModal State (components/DetailModal.tsx):
  └─ isOpen: boolean (controlled by parent ResultsCard)
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────┐
│  .env.local                                          │
│  WATCHMODE_API_KEY=abc123xyz ...                    │
│  (Never exposed to client)                          │
└─────────────────────────────────────────────────────┘
                    │
                    │ Loaded on server
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│  lib/api.ts                                          │
│  "use server" ← Server Action                       │
│  const key = process.env.WATCHMODE_API_KEY          │
│  (key only available on server)                     │
└─────────────────────────────────────────────────────┘
                    │
                    │ Used in API header
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│  https://api.watchmode.com/v1/list-titles/          │
│  ?apiKey=abc123xyz&genre_ids=1,28&...              │
└─────────────────────────────────────────────────────┘
                    │
                    │ API validates key
                    │ Returns data
                    │
                    ▼
┌─────────────────────────────────────────────────────┐
│  Client receives sanitized data                      │
│  NEVER receives API key                             │
│  (Security maintained ✅)                            │
└─────────────────────────────────────────────────────┘
```

## Animation Triggers

```
Component Loads:
  page.tsx loads Quiz
  └─ Fade in animation

User Interaction:
  Click Genre Chip
  └─ "scribble" animation + selection state

Quiz Navigation:
  Click "Next"
  └─ Spring animation to next step

Results Loading:
  LoadingScreen shows
  └─ Doodle drawing animation
  └─ Typing text animation
  └─ Bouncing dots animation

Results Display:
  Results Component mounts
  └─ Staggered card animations (each card fades + slides)
  └─ Cards have hover wobble effect

Card Click:
  Click ResultsCard
  └─ Ink splash animation
  └─ Modal flip transition

Modal Closing:
  Click close or escape
  └─ Modal scale + fade out
  └─ Backdrop fade out
```

## Performance Optimizations

```
┌─────────────────────────────┐
│  Cache Layer (1 hour)        │
│  next: { revalidate: 3600 }  │
│  Reduces API calls           │
│  Faster results              │
└─────────────────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  Code Splitting             │
│  Components lazy-loaded      │
│  Only load what's needed    │
└─────────────────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  Image Optimization         │
│  Watchmode poster URLs      │
│  Compressed + lazy loaded    │
└─────────────────────────────┘
            │
            ▼
┌─────────────────────────────┐
│  CSS Optimization           │
│  Tailwind purges unused CSS  │
│  ~10KB gzipped              │
└─────────────────────────────┘
```

---

**Now you understand the complete architecture! 🎉**

See PROJECT_SUMMARY.md or SETUP.md for next steps.
